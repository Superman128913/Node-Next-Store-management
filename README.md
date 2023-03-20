
# Store Management System

A brief description of how to install this project
### Before Start
install yarn:
```bash
npm install --global yarn
```
## 1. Frontend Setup

Change repo: `cd frontend/`

- First, install npm bundle

```bash
yarn install
```

- Second, set up environment variables

Run `cat .env.example >.env`

Change .env file like below:
```bash
# Frontend Environment
NODE_ENV=local
BACKEND_URL=http://127.0.0.1:4500
SITE_NAME=Store Management System - SaaS
```
If you deploy for production, set `NODE_ENV=production`

- Third, run the server:

```bash
yarn dev
```
If you run for production, run below commands:
```bash
yarn build
yarn start
```

## 2. Backend Setup

Change repo: `cd backend/`

- First, install npm bundle

```bash
yarn install
```

- Second, set up environment variables

Run `cat .env.example >.env`

Change .env file like below:
```bash
# Server Environment# Server Environment
DB_URL=mongodb://mongodb:mongodb@127.0.0.1:27017/amine-db?retryWrites=true&w=majority
JWT_KEY=j{,qsH?(f7e6YZUS

# Mailsender Settings
MAIL_HOST=sandbox.smtp.mailtrap.io
MAIL_PORT=2525
MAIL_AUTH_EMAIL=test@test.com
MAIL_AUTH_USER=0a78a6ffc10bd2
MAIL_AUTH_PASSWORD=4d42237703518e
```

- Third, run the server:

```bash
yarn start
```

## 3. Stripe Setup


- First, create a new Stripe account [here](https://dashboard.stripe.com/register).

- Second, get [API keys](https://dashboard.stripe.com/test/apikeys).

- Third, create price and get price id.

Change repo: `cd backend/`
```bash
$ node create_price.js
Success! Here is your starter subscription product id: prod_NQrSTWZGFzublG
Success! Here is your premium subscription price id: price_1MfzjmGzCdt4vAD81oGW2
ISm
```
You can create price manually on the [stripe dashboard](https://dashboard.stripe.com/test/products).

- Fourth, set up webhook

Download Stripe CLI.
```bash
stripe listen --forward-to localhost:4500/webhook
```

- Fifth, set environment variables.

```bash
# Stripe Environtment
STRIPE_PUBLIC_KEY=pk_test_51MFFf4GzCdt4vAD8rQlPB9EwmrzvzFIfpz7wDhktncR6hFljXqztWYDu3Un9Jw2Ols9yODsybsqFcyE9y2meOahE00THsnoJUd
STRIPE_SECRET_KEY=sk_test_51MFFf4GzCdt4vAD8vygwALmEHwDxurcgpycjLhyBLQOHa7xpEgnfq7VX64J1dLxGo4DKQfmbANR37hzpwuAP7R3E00tPRYlB6q
STRIPE_PRICE_ID=price_1MfzjmGzCdt4vAD81oGW2ISm
STRIPE_WEBHOOK_SECRET=whsec_75cd17fa7129280b750c76b08dde6670e2d381fd95815aacc3ee1dceff3ccf97
```

## Run with Docker

- First, set up environment file like below:
```bash
# Docker Environment
NODE_ENV=local
MONGO_DB_DATABASE=amine-db
MONGO_DB_USERNAME=mongodb
MONGO_DB_PASSWORD=mongodb

# Server Environment
DB_URL=mongodb://mongodb:mongodb@db:27017/amine-db?retryWrites=true&w=majority
JWT_KEY=j{,qsH?(f7e6YZUS

# Mailsender Settings
MAIL_HOST=sandbox.smtp.mailtrap.io
MAIL_PORT=2525
MAIL_AUTH_EMAIL=test@test.com
MAIL_AUTH_USER=0a78a6ffc10bd2
MAIL_AUTH_PASSWORD=4d42237703518e

# Frontend Environment
BACKEND_URL=http://backend:4500
SITE_NAME=Store Management System - SaaS

# Stripe Environtment
STRIPE_PUBLIC_KEY=pk_test_51MFFf4GzCdt4vAD8rQlPB9EwmrzvzFIfpz7wDhktncR6hFljXqztWYDu3Un9Jw2Ols9yODsybsqFcyE9y2meOahE00THsnoJUd
STRIPE_SECRET_KEY=sk_test_51MFFf4GzCdt4vAD8vygwALmEHwDxurcgpycjLhyBLQOHa7xpEgnfq7VX64J1dLxGo4DKQfmbANR37hzpwuAP7R3E00tPRYlB6q
STRIPE_PRICE_ID=price_1MfzjmGzCdt4vAD81oGW2ISm
STRIPE_WEBHOOK_SECRET=whsec_75cd17fa7129280b750c76b08dde6670e2d381fd95815aacc3ee1dceff3ccf97
```

- Second, set up variables of `entrypoint.js` for database with same value of environment
```bash
var MONGO_DB_DATABASE="amine-db";
var MONGO_DB_USERNAME="mongodb";
var MONGO_DB_PASSWORD="mongodb";
```

- Third, run docker-compose command

```bash
chmod +x startup.sh
./startup
```
You can manage database with [localhost:8081](http://localhost:8081)
