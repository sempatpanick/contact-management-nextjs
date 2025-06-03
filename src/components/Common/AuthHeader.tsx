interface AuthHeaderProps {
	description: string;
}

export default function AuthHeader(props: AuthHeaderProps) {
	return (
		<>
			<div className="text-center mb-8">
				<div className="inline-block p-3 bg-gradient rounded-full mb-4">
					<i className="fas fa-user-plus text-3xl text-white" />
				</div>
				<h1 className="text-3xl font-bold text-white">
					Contact Management
				</h1>
				<p className="text-gray-300 mt-2">{props.description}</p>
			</div>
		</>
	);
}
