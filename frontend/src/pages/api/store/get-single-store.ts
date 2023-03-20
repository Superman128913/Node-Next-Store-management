// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { BACKEND_URL } from '@/configs/env';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const { store_id } = req.query;
    const Response = await axios.get(
      `${BACKEND_URL}/get-single-store/${store_id}`
    );
    if (Response.status == 200)
    {
      res.status(200).json(Response.data);
    }
    else {
      res.status(Response.status).end(Response.statusText);
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
