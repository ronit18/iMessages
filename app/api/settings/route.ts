import getCurrentUser from '@/app/actions/getCurrentUser';
import prisma from '@/app/libs/prismadb';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
	try {
		const currentUser = await getCurrentUser();
		const body = await request.json();
		const { name, image } = body;
		if (!currentUser)
			return new NextResponse('Unauthorized', { status: 401 });

		const updatedUser = await prisma.user.update({
			where: {
				id: currentUser.id,
			},
			data: {
				name: name,
				image: image,
			},
		});
		return NextResponse.json(updatedUser);
	} catch (error: any) {
		console.log('Error in settings/route.ts: ', error);
		return new NextResponse('Internal Error', { status: 500 });
	}
}
