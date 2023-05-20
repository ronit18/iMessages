import DesktopSiderbar from './DesktopSiderbar';

async function Sidebar({ children }: { children: React.ReactNode }) {
	return (
		<div className="h-full">
			<DesktopSiderbar />
			<main className="lg:pl-20 h-full">{children}</main>
		</div>
	);
}

export default Sidebar;
