import prisma from '@/app/libs/prismadb';
import getCurrentUser from './getCurrentUser';

const getConversationById = async (conversationId: string) => {
	try {
		const currentUser = await getCurrentUser();

		if (!currentUser?.email) return null;

		const conversations = await prisma.conversation.findUnique({
			where: {
				id: conversationId,
			},

			include: {
				users: true,
			},
		});
		return conversations;
	} catch (error: any) {
		console.log(error);
		return null;
	}
};
export default getConversationById;
