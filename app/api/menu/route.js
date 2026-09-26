import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const globalForPrisma = global;
const prisma = globalForPrisma.prisma || new PrismaClient();
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export async function GET() {
  try {
    const items = await prisma.menuItem.findMany({
      orderBy: { createdAt: 'asc' },
    });
    return NextResponse.json({ success: true, data: items });
  } catch (error) {
    console.error('Error fetching menu:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}