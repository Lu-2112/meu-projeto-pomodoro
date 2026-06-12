import 'dotenv/config';

// eslint-disable-next-line @typescript-eslint/no-require-imports
const { PrismaClient } = require('@prisma/client');

export const prisma = new PrismaClient();