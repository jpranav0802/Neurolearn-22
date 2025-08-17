import type { VercelRequest, VercelResponse } from '@vercel/node';
import bcrypt from 'bcryptjs';
import { nanoid } from 'nanoid';

// Share the same array instance across function invocations when warm
const globalAny = global as any;
globalAny.__NEUROLEARN_USERS__ = globalAny.__NEUROLEARN_USERS__ || [];
const users: Array<{ id: string; email: string; passwordHash: string; firstName: string; lastName: string; role: string }> = globalAny.__NEUROLEARN_USERS__;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const { email, password, firstName, lastName, role } = req.body || {};
  if (!email || !password || !firstName || !lastName || !role) {
    return res.status(400).json({ error: 'Missing fields' });
  }
  const exists = users.find(u => u.email === String(email).toLowerCase());
  if (exists) return res.status(409).json({ error: 'User already exists' });
  const passwordHash = await bcrypt.hash(password, 10);
  const user = { id: nanoid(), email: String(email).toLowerCase(), passwordHash, firstName, lastName, role };
  users.push(user);
  return res.status(201).json({ message: 'Registered', user: { id: user.id, email: user.email, firstName, lastName, role, isEmailVerified: true } });
}


