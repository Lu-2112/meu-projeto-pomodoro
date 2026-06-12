import { Router } from 'express';
import { prisma } from '../lib/prisma';

export const tasksRouter = Router();
(BigInt.prototype as any).toJSON = function () {
  return this.toString();
};

// GET /tasks — listar histórico
tasksRouter.get('/', async (_req, res) => {
  const tasks = await prisma.task.findMany({
    orderBy: { startDate: 'desc' },
  });
  return res.json(tasks);
});

// POST /tasks — criar task
tasksRouter.post('/', async (req, res) => {
  const { id, name, duration, type, startDate } = req.body as {
    id: string;
    name: string;
    duration: number;
    type: string;
    startDate: number;
  };

  const task = await prisma.task.create({
    data: { id, name, duration, type, startDate: BigInt(startDate) },
  });

  return res.status(201).json(task);
});

// PATCH /tasks/:id/complete
tasksRouter.patch('/:id/complete', async (req, res) => {
  const { id } = req.params;
  const { completeDate } = req.body as { completeDate: number };

  const task = await prisma.task.update({
    where: { id },
    data: { completeDate: BigInt(completeDate) },
  });

  return res.json(task);
});

// PATCH /tasks/:id/interrupt
tasksRouter.patch('/:id/interrupt', async (req, res) => {
  const { id } = req.params;
  const { interruptDate } = req.body as { interruptDate: number };

  const task = await prisma.task.update({
    where: { id },
    data: { interruptDate: BigInt(interruptDate) },
  });

  return res.json(task);
});

// DELETE /tasks — limpar histórico
tasksRouter.delete('/', async (_req, res) => {
  await prisma.task.deleteMany();
  return res.status(204).send();
});