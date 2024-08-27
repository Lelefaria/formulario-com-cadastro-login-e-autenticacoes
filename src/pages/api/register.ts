import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email, name, password } = req.body;

  try {
    // Verificar se o e-mail já está registrado
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({ message: 'E-mail já cadastrado.' });
    }

    // Criar o novo usuário se o e-mail não estiver registrado
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password, 
      },
    });

    return res.status(201).json(newUser);
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao registrar usuário.', error });
  } finally {
    await prisma.$disconnect();
  }
}
