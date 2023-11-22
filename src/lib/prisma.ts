import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const Session = prisma.session;
export const User = prisma.user;
export const Project = prisma.project;
export const SDG = prisma.sDG;