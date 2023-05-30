'use client';

import useConversation from '@/app/hooks/useConversations';
import { FullMessageType } from '@/app/types';
import { useEffect, useRef, useState } from 'react';
import MessageBox from './MessageBox';
import axios from 'axios';

interface BodyProps {
	initialMessages: FullMessageType[];
}
const Body: React.FC<BodyProps> = ({ initialMessages }) => {
	const [messages, setMessages] = useState(initialMessages);

	const buttomRef = useRef<HTMLDivElement>(null);

	const { conversationId } = useConversation();

	useEffect(() => {
		axios.post(`/api/conversations/${conversationId}/seen`);
	}, [conversationId]);

	return (
		<div className="flex-1 h-full overflow-y-auto">
			{messages.map((message, i) => (
				<MessageBox
					isLast={i === messages.length - 1}
					key={message.id}
					data={message}
				/>
			))}
			<div ref={buttomRef} className="pt-24" />
		</div>
	);
};
export default Body;
