import Input from "@/src/components/Common/Units/Input";
import Link from "next/link";
import { FormEventHandler, ChangeEventHandler } from "react";

interface LoginSectionFormProps {
	handleSubmit?: FormEventHandler;
	inputUsername?: {
		value: string | number | readonly string[] | undefined;
		onChange: ChangeEventHandler<HTMLInputElement> | undefined;
	};
	inputPassword?: {
		value: string | number | readonly string[] | undefined;
		onChange: ChangeEventHandler<HTMLInputElement> | undefined;
	};
}

export default function LoginSectionForm(props: LoginSectionFormProps) {
	return (
		<>
			<form onSubmit={props.handleSubmit}>
				<div className="mb-5">
					<label
						htmlFor="username"
						className="block text-gray-300 text-sm font-medium mb-2">
						Username
					</label>
					<div className="relative">
						<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
							<i className="fas fa-user text-gray-500" />
						</div>
						<Input
							type="text"
							id="username"
							name="username"
							placeholder="Enter your username"
							value={props.inputUsername?.value}
							onChange={props.inputUsername?.onChange}
							required
						/>
					</div>
				</div>
				<div className="mb-6">
					<label
						htmlFor="password"
						className="block text-gray-300 text-sm font-medium mb-2">
						Password
					</label>
					<div className="relative">
						<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
							<i className="fas fa-lock text-gray-500" />
						</div>
						<Input
							type="password"
							id="password"
							name="password"
							placeholder="Enter your password"
							value={props.inputPassword?.value}
							onChange={props.inputPassword?.onChange}
							required
						/>
					</div>
				</div>
				<div className="mb-6">
					<button
						type="submit"
						className="w-full bg-gradient text-white py-3 px-4 rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 font-medium shadow-lg transform hover:-translate-y-0.5">
						<i className="fas fa-sign-in-alt mr-2" /> Sign In
					</button>
				</div>
				<div className="text-center text-sm text-gray-400">
					Don&apos;t have an account?
					<Link
						href={"/register"}
						className="text-blue-400 hover:text-blue-300 font-medium transition-colors duration-200">
						Sign up
					</Link>
				</div>
			</form>
		</>
	);
}
