FROM node:16-alpine as base
FROM base as builder

WORKDIR /app
COPY package.json .
RUN yarn
#RUN npm install
RUN yarn install
COPY . .
# ARG REACT_APP_ENV
# ARG REACT_APP_BASE_URL
# ENV REACT_APP_ENV=$REACT_APP_ENV
# ENV REACT_APP_BASE_URL=$REACT_APP_BASE_URL
#RUN npm run build
RUN yarn run build

FROM nginx 
COPY --from=builder /app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d

#Testing the build