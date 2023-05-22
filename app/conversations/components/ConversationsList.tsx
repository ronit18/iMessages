'use client';

import useConversation from '@/app/hooks/useConversations';
import { FullConversationType } from '@/app/types';
import { Conversation } from '@prisma/client';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { MdOutlineGroupAdd } from 'react-icons/md';
import ConversationBox from './ConversationBox';

interface ConversationsListProps {
	initialItems: FullConversationType[];
	users: any;
	title: string;
}

const ConversationsList: React.FC<ConversationsListProps> = ({
	initialItems,
	users,
	title,
}) => {
	const [items, SetItems] = useState(initialItems);
	const router = useRouter();

	const { conversationId, isOpen } = useConversation();

	return (
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
					<div className="rounded-full p-2 bg-gray-100 text-gray-600 cursor-pointer hover:opacity-75 transition ">
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
	);
};
export default ConversationsList;
