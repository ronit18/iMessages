'use client';

import useConversation from '@/app/hooks/useConversations';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import { toast } from 'react-hot-toast';
import Modal from './Modal';
import { FiAlertTriangle } from 'react-icons/fi';
import { Dialog } from '@headlessui/react';

interface ConfirmModalProps {
	isOpen?: boolean;
	onClose: () => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({ isOpen, onClose }) => {
	const router = useRouter();

	const { conversationId } = useConversation();

	const [isLoading, setIsLoading] = useState(false);

	const onDelete = useCallback(() => {
		setIsLoading(true);
		axios
			.delete(`/api/conversations/${conversationId}`)
			.then(() => {
				onClose();
				router.push('/conversations');
				router.refresh();
			})
			.catch(() => toast.error('Something went wrong!'))
			.finally(() => setIsLoading(true));
	}, [conversationId, onClose, router]);

	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<div className="sm:flex sm:items-start">
				<div
					className="mx-auto 
						flex 
						h-12 
						w-12 
						flex-shrink-0 
						items-center 
						justify-center 
						rounded-full 
						bg-red-100 
						sm:mx-0 
						sm:h-10 
						sm:w-10
					"
				>
					<FiAlertTriangle className="h-6 w-6 " />
				</div>
				<div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
					<Dialog.Title as="h3"></Dialog.Title>
				</div>
			</div>
		</Modal>
	);
};
export default ConfirmModal;
