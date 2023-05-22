import getConversations from '../actions/getConversations';
import getUsers from '../actions/getUser';
import Sidebar from '../components/sidebar/Sidebar';
import ConversationsList from './components/ConversationsList';

export default async function ConversationsLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const conversations = await getConversations();
	const users = await getUsers();

	return (
		// @ts-expect-error Server Component
		<Sidebar>
			<div className="h-full">
				<ConversationsList
					users={users}
					title="Messages"
					initialItems={conversations}
				/>
				{children}
			</div>
		</Sidebar>
	);
}
