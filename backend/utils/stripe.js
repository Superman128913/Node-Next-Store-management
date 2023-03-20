const stripe = require('stripe')

const Stripe = stripe(process.env.STRIPE_SECRET_KEY, null)

const createCheckoutSession = async (redirect_url, customer_id) => {
  // Create new Checkout Session for the order
  // Other optional params include:
  // [billing_address_collection] - to display billing address details on the page
  // [customer] - if you have an existing Stripe Customer ID
  // [customer_email] - lets you prefill the email input in the Checkout page
  // [automatic_tax] - to automatically calculate sales tax, VAT and GST in the checkout page
  // For full details see https://stripe.com/docs/api/checkout/sessions/create

  const session = await Stripe.checkout.sessions.create({
    mode: 'subscription',
    payment_method_types: ['card'],
    customer: customer_id,
    line_items: [
      {
        price: process.env.STRIPE_PRICE_ID,
        quantity: 1
      }
    ],
    // ?session_id={CHECKOUT_SESSION_ID} means the redirect will have the session ID set as a query param
    success_url: `${redirect_url}/payment?success=true&session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${redirect_url}/payment?canceled=true`
  })

  return session
}

const createBillingSession = async (customer) => {
  const session = await Stripe.billingPortal.sessions.create({
    customer,
    return_url: 'https://localhost:4500'
  })
  return session
}

const getCustomerByID = async (id) => {
  const customer = await Stripe.customers.retrieve(id)
  return customer
}

const addNewCustomer = async (customer_name) => {
  const customer = await Stripe.customers.create({
    name: customer_name,
    description: `This is customer for ${customer_name}`
  })

  return customer
}

const removeCustomerByID = async (id) => {
  const customer = await Stripe.customers.del(id)
  return customer
}

const createWebhook = (rawBody, sig) => {
  const event = Stripe.webhooks.constructEvent(
    rawBody,
    sig,
    process.env.STRIPE_WEBHOOK_SECRET
  )
  return event
}

module.exports = {
  getCustomerByID,
  addNewCustomer,
  removeCustomerByID,
  createCheckoutSession,
  createBillingSession,
  createWebhook
}
