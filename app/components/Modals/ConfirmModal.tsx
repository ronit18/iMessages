'use client';

import useConversation from '@/app/hooks/useConversations';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import { toast } from 'react-hot-toast';
import Modal from './Modal';
import { FiAlertTriangle } from 'react-icons/fi';
import { Dialog } from '@headlessui/react';
import Button from '../Button';
import LoadingModal from '../LoadingModals';

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
		<>
			{isLoading && <LoadingModal />}

			<Modal isOpen={isOpen} onClose={onClose}>
				<div className="sm:flex sm:items-start ">
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
						<FiAlertTriangle className="h-6 w-6  text-red-500" />
					</div>
					<div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
						<Dialog.Title
							as="h3"
							className="text-base font-semibold leading-6 text-gray-600"
						>
							Delete conversation?
						</Dialog.Title>
						<div className="mt-2">
							<p>
								{' '}
								Are you sure you want to delte this
								conversation? This action cannot be undone.
							</p>
						</div>
					</div>
				</div>

				<div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
					<Button danger onClick={onDelete} disabled={isLoading}>
						Delete
					</Button>
					<Button secondry onClick={onClose} disabled={isLoading}>
						Cancel
					</Button>
				</div>
			</Modal>
		</>
	);
};
export default ConfirmModal;
