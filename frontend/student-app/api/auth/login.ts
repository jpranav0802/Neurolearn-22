import type { VercelRequest, VercelResponse } from '@vercel/node';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// In-memory store for demo; for production use a database
const users: Array<{ id: string; email: string; passwordHash: string; firstName: string; lastName: string; role: string }> = [];
const JWT_SECRET = process.env.SIMPLE_AUTH_JWT || 'neurolearn-dev-secret';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const { email, password } = req.body || {};
  const user = users.find(u => u.email === String(email).toLowerCase());
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });
  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return res.status(401).json({ error: 'Invalid credentials' });
  const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
  return res.json({ message: 'Login successful', accessToken: token, user: { id: user.id, email: user.email, firstName: user.firstName, lastName: user.lastName, role: user.role, isEmailVerified: true } });
}


