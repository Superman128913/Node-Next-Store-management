import Router from 'next/router';
import Toast from '@/components/Toast';

export async function checkoutRequest(store_id, source_url) {
  const Response = await fetch(`/api/payment/checkout?store_id=${store_id}`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ source_url })
  });
  if (Response.status == 200)
  {
    const { session_url } = await Response.json();
    Router.push(session_url);
  }
  else {
    Toast('Error', Response.statusText);
  }
}