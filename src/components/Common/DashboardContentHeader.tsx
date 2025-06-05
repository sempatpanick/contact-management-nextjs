import { ReactNode } from "react";

interface DashboardContentHeaderProps {
	icon: string;
	title: string;
	leading?: ReactNode;
}

export default function DashboardContentHeader(
	props: DashboardContentHeaderProps
) {
	return (
		<>
			<div className="flex items-center mb-6">
				{props.leading}
				<i
					className={`fas ${props.icon} text-blue-400 text-2xl mr-3`}
				/>
				<h1 className="text-2xl font-bold text-white">{props.title}</h1>
			</div>
		</>
	);
}
