import { PrismaClient } from '@prisma/client'

declare global {
	var prismaCache: PrismaClient
}

let prisma: PrismaClient
if (process.env.NODE_ENV === 'production') {
	prisma = new PrismaClient()
} else {
	if (!global.prismaCache) {
		global.prismaCache = new PrismaClient()
	}
	prisma = global.prismaCache
}

export const db = prisma
