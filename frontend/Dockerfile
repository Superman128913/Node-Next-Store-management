# syntax=docker/dockerfile:1
FROM node:17.9.1-alpine AS builder

# Create app directory
WORKDIR /usr/app

# Install dependencies
COPY package.json ./
RUN yarn install --production

# Install app
COPY . .

# Set up variable
ARG NODE_ENV


# Run entrypoint
CMD $(if [ "$NODE_ENV" = "local" ]; then echo "yarn dev"; else "yarn build & yarn start"; fi)

EXPOSE 3000
