import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { ApolloProvider } from '@apollo/client';
import * as Sentry from '@sentry/react';
import { BrowserTracing } from '@sentry/tracing';

import './index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './redux/store/store';
import { apolloClient } from './graphql';

Sentry.init({
  dsn: 'https://bd02c1925efa49728c228e6c52c886b4@sentry.api.asklora.ai/4',
  integrations: [new BrowserTracing()],
  tracesSampleRate: 1.0
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ApolloProvider client={apolloClient}>
        <App />
      </ApolloProvider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
