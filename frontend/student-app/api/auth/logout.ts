import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(_req: VercelRequest, res: VercelResponse) {
  return res.json({ message: 'Logout successful' });
}


