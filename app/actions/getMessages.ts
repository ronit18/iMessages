import prisma from '@/app/libs/prismadb';

const getMessages = async (conversationId: string) => {
	try {
		const messages = await prisma.message.findMany({
			where: {
				conversationId: conversationId,
			},
			include: {
				sender: true,
				seen: true,
			},
			orderBy: {
				createdAt: 'asc',
			},
		});
		return messages;
	} catch (error: any) {
		console.log('Error in actions/getMessages: ', error);
		return [];
	}
};
export default getMessages;
