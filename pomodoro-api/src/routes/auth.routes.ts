import { Router } from 'express';
import { prisma } from '../lib/prisma';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const authRouter = Router();

const JWT_SECRET = process.env.JWT_SECRET || 'chronos_secret_key_2026';

// POST /auth/register
authRouter.post('/register', async (req, res) => {
  const { name, email, password } = req.body as {
    name: string;
    email: string;
    password: string;
  };

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Preencha todos os campos' });
  }

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    return res.status(400).json({ message: 'Email já cadastrado' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: { name, email, password: hashedPassword },
  });

  const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' });

  return res.status(201).json({ token, user: { id: user.id, name: user.name, email: user.email } });
});

// POST /auth/login
authRouter.post('/login', async (req, res) => {
  const { email, password } = req.body as {
    email: string;
    password: string;
  };

  if (!email || !password) {
    return res.status(400).json({ message: 'Preencha todos os campos' });
  }

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return res.status(401).json({ message: 'Email ou senha inválidos' });
  }

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return res.status(401).json({ message: 'Email ou senha inválidos' });
  }

  const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' });

  return res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
});

// POST /auth/forgot-password
authRouter.post('/forgot-password', async (req, res) => {
  const { email } = req.body as { email: string };

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return res.json({ message: 'Se o email existir, você receberá as instruções' });
  }

  const resetToken = Math.random().toString(36).substring(2, 15);
  const resetTokenExp = new Date(Date.now() + 1000 * 60 * 60); // 1 hora

  await prisma.user.update({
    where: { email },
    data: { resetToken, resetTokenExp },
  });

  // Em produção enviaria email, aqui retornamos o token para teste
  console.log(`Token de reset para ${email}: ${resetToken}`);

  return res.json({ message: 'Instruções enviadas', resetToken });
});

// POST /auth/reset-password
authRouter.post('/reset-password', async (req, res) => {
  const { token, password } = req.body as {
    token: string;
    password: string;
  };

  if (!token || !password) {
    return res.status(400).json({ message: 'Token e senha são obrigatórios' });
  }

  const user = await prisma.user.findFirst({
    where: {
      resetToken: token,
      resetTokenExp: { gte: new Date() },
    },
  });

  if (!user) {
    return res.status(400).json({ message: 'Token inválido ou expirado' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.update({
    where: { id: user.id },
    data: { password: hashedPassword, resetToken: null, resetTokenExp: null },
  });

  return res.json({ message: 'Senha redefinida com sucesso' });
});