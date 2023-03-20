// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { BACKEND_URL } from '@/configs/env';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const Response = await axios.post(
      `${BACKEND_URL}/send-code-by-email`,
      req.body
    );
    if (Response.status == 200)
    {
      res.status(200).json(Response.data);
    }
    else {
      res.status(Response.status).end(Response.statusText);
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
