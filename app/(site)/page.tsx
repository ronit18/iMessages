import Image from 'next/image';
import AuthForm from './components/AuthForm';

export default function Home() {
	return (
		<div className="flex min-h-full flex-col justify-center items-center h-screen py-12 sm:px-6 lg:px-8 bg-gray-100">
			<div className="sm:mx-auto sm:w-full sm:max-w-md">
				<Image
					alt="logo"
					src="/images/logo.png"
					width="68"
					height="68"
					className="mx-auto w-auto"
				/>
			</div>
			<AuthForm />
		</div>
	);
}
