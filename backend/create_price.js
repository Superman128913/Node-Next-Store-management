require("dotenv").config();
let Stripe = require('stripe')

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, null);

stripe.products.create({
  name: 'Payment for each stores',
  description: '$50/Month subscription',
}).then(product => {
  stripe.prices.create({
    unit_amount: 5000,
    currency: 'usd',
    recurring: {
      interval: 'month',
    },
    product: product.id,
  }).then(price => {
    console.log('Success! Here is your starter subscription product id: ' + product.id);
    console.log('Success! Here is your premium subscription price id: ' + price.id);
  });
});