import clsx from 'clsx';
import Link from 'next/link';

interface MobileItemProps {
	label: string;
	icon: any;
	href: string;
	onClick?: () => void;
	active?: boolean;
}

const MobileItem: React.FC<MobileItemProps> = ({
	label,
	href,
	icon: Icon,
	active,
	onClick,
}) => {
	const handleClick = () => {
		if (onClick) {
			return onClick();
		}
	};

	return (
		<Link
			className={clsx(
				`group flex gap-x-3 text-sm leading-6 font-semibold w-full justify-center p-4 to-gray-500 hover:text-black hover:bg-gray-100`,
				active && 'bg-gray-100 text-blac'
			)}
			onClick={onClick}
			href={href}
		>
			<Icon className="h-6 w-6" />
		</Link>
	);
};

export default MobileItem;
