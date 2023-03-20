// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { BACKEND_URL } from '@/configs/env';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'DELETE') {
    const { store_id } = req.query;
    const { token } = req.body;
    const Response = await axios.delete(
      `${BACKEND_URL}/delete-store/${store_id}`,
      {
        headers: { 'authorization': `${token}` }
      }
    );
    if (Response.status == 204)
    {
      res.status(204).end();
    }
    else {
      res.status(Response.status).end(Response.statusText);
    }
  } else {
    res.setHeader('Allow', ['DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
