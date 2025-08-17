import express from 'express';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
import { nanoid } from 'nanoid';

const PORT = process.env.SIMPLE_AUTH_PORT || 4010;
const JWT_SECRET = process.env.SIMPLE_AUTH_JWT || 'neurolearn-dev-secret';
const ORIGINS = (process.env.ALLOWED_ORIGINS || 'http://localhost:3000').split(',');

// DB setup (file-backed JSON)
const adapter = new JSONFile('./db.json');
const db = new Low(adapter, { users: [] });
await db.read();
db.data = db.data || { users: [] };
await db.write();

const app = express();
app.use(cors({ origin: ORIGINS, credentials: true }));
app.use(express.json());

// Helpers
const publicUser = (u) => ({ id: u.id, email: u.email, firstName: u.firstName, lastName: u.lastName, role: u.role, createdAt: u.createdAt });

app.get('/health', (_, res) => res.json({ status: 'ok', service: 'simple-auth' }));

app.post('/api/auth/register', async (req, res) => {
  try {
    const { email, password, firstName, lastName, role } = req.body || {};
    if (!email || !password || !firstName || !lastName || !role) {
      return res.status(400).json({ error: 'Missing fields' });
    }
    const exists = db.data.users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (exists) return res.status(409).json({ error: 'User already exists' });

    const hash = await bcrypt.hash(password, 10);
    const user = {
      id: nanoid(),
      email: email.toLowerCase(),
      passwordHash: hash,
      firstName,
      lastName,
      role,
      createdAt: new Date().toISOString()
    };
    db.data.users.push(user);
    await db.write();

    res.status(201).json({ message: 'Registered', user: publicUser(user) });
  } catch (e) {
    res.status(500).json({ error: 'Registration failed' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body || {};
    const user = db.data.users.find(u => u.email === String(email).toLowerCase());
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });
    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ message: 'Login successful', accessToken: token, user: publicUser(user) });
  } catch (e) {
    res.status(500).json({ error: 'Login failed' });
  }
});

app.post('/api/auth/logout', (_req, res) => res.json({ message: 'Logout successful' }));

app.listen(PORT, () => {
  console.log(`✅ Simple Auth running on http://localhost:${PORT}`);
});


