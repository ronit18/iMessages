'use client';

interface BodyProps {
	initialMessages: any;
}
const Body: React.FC<BodyProps> = ({ initialMessages }) => {
	return <div className="flex-1 h-full overflow-y-auto">Body!!</div>;
};
export default Body;
