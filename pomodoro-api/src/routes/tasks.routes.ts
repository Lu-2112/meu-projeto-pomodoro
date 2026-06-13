import { Router } from 'express';
import { prisma } from '../lib/prisma';
import { authMiddleware } from '../middlewares/auth.middleware';

export const tasksRouter = Router();

(BigInt.prototype as any).toJSON = function () {
  return this.toString();
};

tasksRouter.use(authMiddleware);

// GET /tasks
tasksRouter.get('/', async (req, res) => {
  const userId = (req as any).userId;

  const tasks = await prisma.task.findMany({
    where: { userId },
    orderBy: { startDate: 'desc' },
  });
  return res.json(tasks);
});

// POST /tasks
tasksRouter.post('/', async (req, res) => {
  const userId = (req as any).userId;

  const { id, name, duration, type, startDate } = req.body as {
    id: string;
    name: string;
    duration: number;
    type: string;
    startDate: number;
  };

  const task = await prisma.task.create({
    data: { id, name, duration, type, startDate: BigInt(startDate), userId },
  });

  return res.status(201).json(task);
});

// PATCH /tasks/:id/complete
tasksRouter.patch('/:id/complete', async (req, res) => {
  const userId = (req as any).userId;
  const { id } = req.params;
  const { completeDate } = req.body as { completeDate: number };

  const task = await prisma.task.update({
    where: { id, userId },
    data: { completeDate: BigInt(completeDate) },
  });

  return res.json(task);
});

// PATCH /tasks/:id/interrupt
tasksRouter.patch('/:id/interrupt', async (req, res) => {
  const userId = (req as any).userId;
  const { id } = req.params;
  const { interruptDate } = req.body as { interruptDate: number };

  const task = await prisma.task.update({
    where: { id, userId },
    data: { interruptDate: BigInt(interruptDate) },
  });

  return res.json(task);
});

// DELETE /tasks
tasksRouter.delete('/', async (req, res) => {
  const userId = (req as any).userId;

  await prisma.task.deleteMany({ where: { userId } });
  return res.status(204).send();
});