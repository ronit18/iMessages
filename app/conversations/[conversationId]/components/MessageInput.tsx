import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';

interface MessageInputProps {
	id: string;
	register: UseFormRegister<FieldValues>;
	required?: boolean;
	type?: string;
	errors: FieldErrors;
	placeholder?: string;
}
const MessageInput: React.FC<MessageInputProps> = ({
	id,
	placeholder,
	required,
	register,
	errors,
	type,
}) => {
	return (
		<div className="relative w-full">
			<input
				className="text-black font-light py-2 px-4 bg-neutral-200 w-full rounded-full focus:outline-none"
				type={type}
				id={id}
				autoComplete={id}
				placeholder={placeholder}
				{...register(id, { required })}
			/>
		</div>
	);
};
export default MessageInput;
