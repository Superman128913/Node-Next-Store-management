# syntax=docker/dockerfile:1
FROM node:17.9.1-alpine AS builder

# Create app directory
WORKDIR /usr/app

# Install dependencies
COPY package.json ./
RUN yarn install --production

# Install app
COPY . .


CMD [ "yarn", "start" ]

EXPOSE 4500
