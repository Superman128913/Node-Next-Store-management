import Toast from '@/components/Toast';
import Router from 'next/router';

export async function addStore(data) {
  const token = JSON.parse(localStorage.getItem('Token'));
  const Response = await fetch(`/api/store/add-store`, {
    method: 'post',
    body: JSON.stringify({ data, token }),
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

export async function getStores(user_id, page = 1, limit = 5) {
  const Response = await fetch(`/api/store/get-store-list?user_id=${user_id}&page=${page}&limit=${limit}`, {
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

export async function getSingleStore(store_id) {
  const Response = await fetch(`/api/store/get-single-store?store_id=${store_id}`, {
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

export async function checkIfSecretcode(store_id, email) {
  const Response = await fetch(`/api/store/check-if-secretcode?store_id=${store_id}`, {
    method: 'post',
    body: JSON.stringify({ email }),
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

export async function verifySecretcode(store_id, code) {
  const Response = await fetch(`/api/store/verify-secretcode?store_id=${store_id}`, {
    method: 'post',
    body: JSON.stringify({ code }),
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

export async function updateStore(store_id, data) {
  const token = JSON.parse(localStorage.getItem('Token'));
  const Response = await fetch(`/api/store/update-store?store_id=${store_id}`, {
    method: 'put',
    body: JSON.stringify({ data, token }),
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

export async function deleteStore(store_id) {
  const token = JSON.parse(localStorage.getItem('Token'));
  const Response = await fetch(`/api/store/delete-store?store_id=${store_id}`, {
    method: 'delete',
    body: JSON.stringify({ token }),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  if (Response.status == 204)
  {
    return 'Deleted Store Successfully.';
  }
  else if (Response.status == 401) {
    Toast('Error', Response.statusText);
    Router.push('/login');
  }
  else {
    Toast('Error', Response.statusText);
  }
}

export async function getStoreList(user_id) {
  const Response = await fetch(`/api/store/get-store-select-list?user_id=${user_id}`, {
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
