import Toast from '@/components/Toast';
import Router from 'next/router';

export async function addReview(origin_url, data) {
  const Response = await fetch(`/api/review/add-review`, {
    method: 'post',
    body: JSON.stringify({ origin_url, data }),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  if (Response.status == 200)
  {
    return Response.json();
  }
  else {
    Toast('Error', Response.statusText);
  }
}

export async function getReviews(store_id) {
  const Response = await fetch(`/api/review/get-review-list?store_id=${store_id}`, {
    method: 'get',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  if (Response.status == 200)
  {
    return Response.json();
  }
  else if (Response.status == 401) {
    Toast('Error', Response.statusText);
    Router.push('/login');
  }
  else {
    Toast('Error', Response.statusText);
  }
}

export async function getAllReviews(store_id, page = 1, limit = 5, order = 1) {
  const Response = await fetch(`/api/review/get-all-reviews?store_id=${store_id}&page=${page}&limit=${limit}&order=${order}`, {
    method: 'get',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  if (Response.status == 200)
  {
    return Response.json();
  }
  else if (Response.status == 401) {
    Toast('Error', Response.statusText);
    Router.push('/login');
  }
  else {
    Toast('Error', Response.statusText);
  }
}

export async function getSingleReview(review_id) {
  const Response = await fetch(`/api/review/get-single-review?review_id=${review_id}`, {
    method: 'get',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  if (Response.status == 200)
  {
    return Response.json();
  }
  else if (Response.status == 401) {
    Toast('Error', Response.statusText);
    Router.push('/login');
  }
  else {
    Toast('Error', Response.statusText);
  }
}

export async function verifyEmail(token) {
  const Response = await fetch(`/api/review/verify-email?token=${token}`, {
    method: 'put',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  if (Response.status == 200)
  {
    return Response.json();
  }
  else {
    Toast('Error', Response.statusText);
  }
}
