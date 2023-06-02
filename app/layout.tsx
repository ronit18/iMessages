import { Inter } from 'next/font/google';
import './globals.css';
import AuthContext from './context/AuthContext';
import ToasterContext from './context/ToasterContext';
import ActiveStatus from './components/ActiveStatus';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
	title: 'iMessages',
	description: 'iMessages app.',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<AuthContext>
					<ActiveStatus />
					<ToasterContext />
					{children}
				</AuthContext>
			</body>
		</html>
	);
}
