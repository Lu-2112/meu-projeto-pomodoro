import { Router } from 'express';
import { prisma } from '../lib/prisma';
import { authMiddleware } from '../middlewares/auth.middleware';

export const settingsRouter = Router();

settingsRouter.use(authMiddleware);

settingsRouter.get('/', async (req, res) => {
  const userId = (req as any).userId;

  let settings = await prisma.settings.findUnique({ where: { userId } });

  if (!settings) {
    settings = await prisma.settings.create({
      data: { userId, workTime: 25, shortBreakTime: 5, longBreakTime: 15 },
    });
  }

  return res.json(settings);
});

settingsRouter.put('/', async (req, res) => {
  const userId = (req as any).userId;

  const { workTime, shortBreakTime, longBreakTime } = req.body as {
    workTime: number;
    shortBreakTime: number;
    longBreakTime: number;
  };

  if (
    !Number.isInteger(workTime) ||
    !Number.isInteger(shortBreakTime) ||
    !Number.isInteger(longBreakTime)
  ) {
    return res.status(400).json({ message: 'Valores inválidos' });
  }

  const settings = await prisma.settings.upsert({
    where: { userId },
    update: { workTime, shortBreakTime, longBreakTime },
    create: { userId, workTime, shortBreakTime, longBreakTime },
  });

  return res.json(settings);
});