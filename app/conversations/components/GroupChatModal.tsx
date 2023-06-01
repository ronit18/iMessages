import Button from '@/app/components/Button';
import Modal from '@/app/components/Modals/Modal';
import Input from '@/app/components/inputs/Input';
import Select from '@/app/components/inputs/Select';
import { User } from '@prisma/client';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';

interface GroupChatModalProps {
	onClose: () => void;
	isOpen: boolean;
	users: User[];
}

const GroupChatModal: React.FC<GroupChatModalProps> = ({
	onClose,
	isOpen,
	users,
}) => {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);

	const {
		register,
		handleSubmit,
		setValue,
		watch,
		formState: { errors },
	} = useForm<FieldValues>({
		defaultValues: {
			name: '',
			members: [],
		},
	});

	const members = watch('members');

	const onSubmit: SubmitHandler<FieldValues> = (data) => {
		setIsLoading(true);
		axios
			.post('/api/conversations', { ...data, isGroup: true })
			.then(() => {
				router.refresh();
				onClose();
			})
			.catch(() => toast.error('Something went wrong!'))
			.finally(() => setIsLoading(false));
	};

	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="space-y-12">
					<div className="border-b border-gray-900/10 pb-12">
						<h2 className="text-base font-semibold leading-7 text-gray-900">
							Create a group chat
						</h2>

						<p className="mt-1 text-sm leading-5 text-gray-600">
							Create a chat with more than 2 people.
						</p>
						<div className="mt-10 flex flex-col gap-y-8">
							<Input
								register={register}
								label="Name"
								id="name"
								required
								disabled={isLoading}
								errors={errors}
							/>
							<Select
								value={members}
								disabled={isLoading}
								label="Members"
								options={users.map((user) => ({
									value: user.id,
									label: user.name,
								}))}
								onChange={(value: any) =>
									setValue('members', value, {
										shouldValidate: true,
									})
								}
							/>
						</div>
					</div>
				</div>
				<div className="mt-6 flex items-center justify-end gap-x-6">
					<Button
						className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
						type="button"
						secondry
						onClick={onClose}
						disabled={isLoading}
					>
						Cancel
					</Button>
					<Button type="submit" disabled={isLoading}>
						Submit
					</Button>
				</div>
			</form>
		</Modal>
	);
};

export default GroupChatModal;
