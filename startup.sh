#!/bin/bash

if [ -f .env ]; then
  export $(echo $(cat .env | sed 's/#.*//g'| xargs) | envsubst)
fi

docker-compose up -d
docker run --network="host" --rm -it stripe/stripe-cli --api-key $STRIPE_SECRET_KEY listen --forward-to http://localhost:4500/webhook --skip-verify
