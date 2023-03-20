import Toast from '@/components/Toast';

export async function signUp(data) {
  const Response = await fetch(`/api/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (Response.status == 200)
  {
    return Response.json();
  }
  else {
    Toast('Error', Response.statusText);
  }
}

export async function logIn(data) {
  const Response = await fetch(`/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (Response.status == 200)
  {
    return Response.json();
  }
  else {
    Toast('Error', Response.statusText);
  }
}

export async function resetPassword(data) {
  const Response = await fetch(`/api/auth/reset-password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (Response.status == 200)
  {
    return Response.json();
  }
  else {
    Toast('Error', Response.statusText);
  }
}

export async function verifyByEmail(data) {
  const Response = await fetch(`/api/auth/send-code-by-email`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (Response.status == 200)
  {
    return Response.json();
  }
  else {
    Toast('Error', Response.statusText);
  }
}

export async function verifyByPhone(data) {
  const Response = await fetch(`/api/auth/send-code-by-phone`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (Response.status == 200)
  {
    return Response.json();
  }
  else {
    Toast('Error', Response.statusText);
  }
}

export async function verifyAccount(data) {
  const Response = await fetch(`/api/auth/verify-account`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (Response.status == 200)
  {
    return Response.json();
  }
  else {
    Toast('Error', Response.statusText);
  }
}
