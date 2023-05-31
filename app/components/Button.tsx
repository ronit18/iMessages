'use client';
import clsx from 'clsx';
import React from 'react';

interface ButtonProps {
	type?: 'button' | 'submit' | 'reset' | undefined;
	fullwidth?: boolean;
	children?: React.ReactNode;
	onClick?: () => void;
	secondry?: boolean;
	danger?: boolean;
	disabled?: boolean;
	className?: string;
}

const Button: React.FC<ButtonProps> = ({
	type,
	fullwidth,
	children,
	onClick,
	secondry,
	danger,
	disabled,
	className,
}) => {
	return (
		<button
			onClick={onClick}
			type={type}
			disabled={disabled}
			className={clsx(
				className,
				`flex justify-center rounded-md px-3 py-2 text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2`,
				disabled && 'opacity-50 cursor-default',
				fullwidth && 'w-full',
				secondry ? 'text-gray-900' : 'text-white',
				danger &&
					'bg-rose-500 hover:bg-rose-600 focus-visible:outline-rose-600',
				!secondry &&
					!danger &&
					'bg-sky-500 hover:bg-sky-600 focus-visible:outline-sky-600 '
			)}
		>
			{children}
		</button>
	);
};
export default Button;
