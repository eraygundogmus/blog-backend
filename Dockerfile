FROM node:alpine
WORKDIR /app
COPY . /app
RUN yarn install
RUN yarn start
EXPOSE 8080