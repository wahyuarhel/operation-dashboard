import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  ApolloLink,
  FetchResult
} from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { setContext } from '@apollo/client/link/context';
import { Observable } from '@apollo/client/utilities';
import { refreshAccessToken } from 'redux/api/dashboardApi';

const httpLink = createHttpLink({
  uri: process.env.REACT_APP_BASE_URL + 'graph/'
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('access');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  };
});

const errorLink = onError(
  ({ graphQLErrors, networkError, operation, forward }) => {
    if (networkError) {
      if (networkError.message.includes('401')) {
        const observable = new Observable<FetchResult<Record<string, any>>>(
          observer => {
            (async () => {
              try {
                const accessToken = await refreshAccessToken();

                if (!accessToken) {
                  localStorage.clear();
                  window.location.reload();
                }

                const subscriber = {
                  next: observer.next.bind(observer),
                  error: observer.error.bind(observer),
                  complete: observer.complete.bind(observer)
                };

                forward(operation).subscribe(subscriber);
              } catch (err) {
                observer.error(err);
              }
            })();
          }
        );
        return observable;
      }
      if (networkError.message.includes('500')) {
        localStorage.clear();
        window.location.reload();
      }
    }
  }
);

const link = authLink.concat(httpLink);

const cache = new InMemoryCache();

export const apolloClient = new ApolloClient({
  link: ApolloLink.from([errorLink, link]),
  cache
});
