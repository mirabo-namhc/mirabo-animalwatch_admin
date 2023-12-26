## Build stage
FROM node:16-alpine as build

WORKDIR /app

COPY ./package.json ./yarn.lock /app/
RUN apk add --no-cache yarn && \
    yarn install --frozen-lockfile

ARG REACT_APP_BASE_URL
ARG APP_VERSION
ARG REACT_APP_IMAGE_URL

COPY . .

RUN yarn run build

## runtime stage
FROM nginx:1.22-alpine
RUN mkdir /app

COPY --from=build /app/build /app
COPY ./nginx/default.conf /etc/nginx/conf.d/

EXPOSE 80

ENTRYPOINT [ "nginx", "-g", "daemon off;" ]
