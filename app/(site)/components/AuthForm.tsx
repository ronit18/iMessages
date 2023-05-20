'use client';

import Button from '@/app/components/Button';
import Input from '@/app/components/inputs/Input';
import { useCallback, useEffect, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import AuthSocialButton from './AuthSocialButton';
import { BsGithub, BsGoogle } from 'react-icons/bs';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

type variant = 'LOGIN' | 'REGISTER';

const AuthForm = () => {
	const session = useSession();
	const router = useRouter();

	useEffect(() => {
		if (session?.status === 'authenticated') {
			router.push('/users');
		}
	}, [session?.status, router]);

	const [variant, setVariant] = useState<variant>('LOGIN');
	const [isLoading, setIsLoading] = useState(false);

	const toggleVariant = useCallback(() => {
		if (variant === 'LOGIN') {
			setVariant('REGISTER');
		} else {
			setVariant('LOGIN');
		}
	}, [variant]);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FieldValues>({
		defaultValues: {
			name: '',
			email: '',
			password: '',
		},
	});

	const onSubmit: SubmitHandler<FieldValues> = (data) => {
		setIsLoading(true);
		if (variant === 'REGISTER') {
			axios
				.post('/api/register', data)
				.then(() => {
					signIn('credentials', data);
				})
				.catch(() => toast.error('Something went wrong!'))
				.finally(() => setIsLoading(false));
		}
		if (variant === 'LOGIN') {
			signIn('credentials', {
				...data,
				redirect: false,
			})
				.then((callback) => {
					if (callback?.error) {
						toast.error('Invalid Credentials!');
					} else if (callback?.ok) {
						toast.success('Logged In!');
						router.push('/users');
					}
				})
				.finally(() => setIsLoading(false));
		}
	};

	const socialAction = (action: string) => {
		setIsLoading(true);

		signIn(action, { redirect: false })
			.then((callback) => {
				if (callback?.error) {
					toast.error('Invalid Credentials!');
				} else if (callback?.ok) {
					toast.success('Logged In!');
				}
			})
			.finally(() => setIsLoading(false));
	};

	return (
		<div className=" mt-8 sm:mx-auto sm:w-full sm:max-w-md">
			<div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
				<h2 className="my-5 text-center text-3xl font-bold tracking-tight text-gray-900">
					{' '}
					{variant === 'LOGIN'
						? 'Sign in to your account'
						: 'Create a new account'}
				</h2>
				<form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
					{variant === 'REGISTER' && (
						<Input
							type="name"
							id="name"
							label="Name"
							register={register}
							errors={errors}
							disabled={isLoading}
						/>
					)}
					<Input
						type="email"
						id="email"
						label="Email address"
						register={register}
						disabled={isLoading}
						errors={errors}
					/>
					<Input
						id="password"
						type="password"
						label="Password"
						register={register}
						disabled={isLoading}
						errors={errors}
					/>

					<div>
						<Button disabled={isLoading} fullwidth type="submit">
							{variant === 'LOGIN' ? 'Sign In' : 'Register'}
						</Button>
					</div>
				</form>

				<div className="mt-6">
					<div className="relative">
						<div className="absolute inset-0 flex items-center">
							<div className="w-full border-t border-gray-300" />
						</div>

						<div className="relative flex justify-center text-sm">
							<span className="bg-white px-2 text-gray-500">
								or continue with
							</span>
						</div>
					</div>

					<div className="mt-6 flex gap-2">
						<AuthSocialButton
							icons={BsGoogle}
							onClick={() => socialAction('google')}
						/>
						<AuthSocialButton
							icons={BsGithub}
							onClick={() => socialAction('github')}
						/>
					</div>
				</div>

				<div className="flex gap-2 justify-center text-sm mt-6 px-2 text-gray-500">
					<div>
						{variant === 'LOGIN'
							? 'New to iMessages?'
							: 'Already have an account?'}
					</div>
					<div
						onClick={toggleVariant}
						className="underline cursor-pointer"
					>
						{variant === 'LOGIN' ? 'Create an account' : 'Login'}
					</div>
				</div>
			</div>
		</div>
	);
};

export default AuthForm;
