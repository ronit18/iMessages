'use client';

import useConversation from '@/app/hooks/useConversations';
import { FullConversationType } from '@/app/types';
import { Conversation } from '@prisma/client';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { MdOutlineGroupAdd } from 'react-icons/md';
import ConversationBox from './ConversationBox';
import GroupChatModal from './GroupChatModal';
import { User } from '@prisma/client';
import { Session } from 'inspector';
import { useSession } from 'next-auth/react';
import { pusherClient } from '@/app/libs/pusher';
import { find } from 'lodash';

interface ConversationsListProps {
	initialItems: FullConversationType[];
	users: User[];
	title: string;
}

const ConversationsList: React.FC<ConversationsListProps> = ({
	initialItems,
	users,
	title,
}) => {
	const [items, setItems] = useState(initialItems);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const router = useRouter();
	const session = useSession();

	const { conversationId, isOpen } = useConversation();

	const pusherKey = useMemo(() => {
		return session.data?.user?.email;
	}, [session.data?.user?.email]);

	useEffect(() => {
		if (!pusherKey) {
			return;
		}

		pusherClient.subscribe(pusherKey);

		const updateHandler = (conversation: FullConversationType) => {
			setItems((current) =>
				current.map((currentConversation) => {
					if (currentConversation.id === conversation.id) {
						return {
							...currentConversation,
							messages: conversation.messages,
						};
					}

					return currentConversation;
				})
			);
		};

		const newHandler = (conversation: FullConversationType) => {
			setItems((current) => {
				if (find(current, { id: conversation.id })) {
					return current;
				}

				return [conversation, ...current];
			});
		};

		const removeHandler = (conversation: FullConversationType) => {
			setItems((current) => {
				return [
					...current.filter((convo) => convo.id !== conversation.id),
				];
			});

			if (conversation.id === conversationId)
				router.push('/conversations');
		};

		pusherClient.bind('conversation:update', updateHandler);
		pusherClient.bind('conversation:new', newHandler);
		pusherClient.bind('conversation:remove', removeHandler);

		return () => {
			pusherClient.unsubscribe(pusherKey);

			pusherClient.unbind('conversation:update', updateHandler);
			pusherClient.unbind('conversation:new', newHandler);
			pusherClient.unbind('conversation:remove', removeHandler);
		};
	}, [conversationId, pusherKey, router]);

	return (
		<>
			<GroupChatModal
				users={users}
				onClose={() => setIsModalOpen(false)}
				isOpen={isModalOpen}
			/>
			<aside
				className={clsx(
					`fixed inset-y-0 pb-20 lg:pb-0 lg:left-20 lg:w-80 lg:block overflow-y-auto border-r border-gray-200 `,
					isOpen ? 'hidden' : 'block w-full left-0'
				)}
			>
				<div className="px-5">
					<div className="flex justify-between mb-4 pt-4">
						<div className="text-2xl font-bold text-neutral-800">
							Messages
						</div>
						<div
							onClick={() => setIsModalOpen(true)}
							className="rounded-full p-2 bg-gray-100 text-gray-600 cursor-pointer hover:opacity-75 transition "
						>
							<MdOutlineGroupAdd size={20} />
						</div>
					</div>

					{items.map((item) => (
						<ConversationBox
							key={item.id}
							data={item}
							selected={conversationId === item.id}
						/>
					))}
				</div>
			</aside>
		</>
	);
};
export default ConversationsList;
