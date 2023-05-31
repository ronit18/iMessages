import bcrypt from 'bcrypt';

import prisma from '@/app/libs/prismadb';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
	try {
		const body = await request.json();
		const { email, name, password } = body;
		if (!email || !name || !password) {
			return new NextResponse('Missing info', { status: 400 });
		}

		const hashedPassword = await bcrypt.hash(password, 12);
		const user = await prisma.user.create({
			data: {
				email,
				hashedPassword,
				name,
			},
		});

		return NextResponse.json(user);
	} catch (error: any) {
		console.log('error in register/route.ts', error);
		return new NextResponse('Internal Error', { status: 500 });
	}
}
