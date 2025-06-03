import Input from "@/src/components/Common/Units/Input";
import Link from "next/link";
import { ChangeEventHandler, FormEventHandler } from "react";

interface RegisterUnitFormProps {
	handleSubmit?: FormEventHandler;
	inputUsername?: {
		value: string | number | readonly string[] | undefined;
		onChange: ChangeEventHandler<HTMLInputElement> | undefined;
	};
	inputName?: {
		value: string | number | readonly string[] | undefined;
		onChange: ChangeEventHandler<HTMLInputElement> | undefined;
	};
	inputPassword?: {
		value: string | number | readonly string[] | undefined;
		onChange: ChangeEventHandler<HTMLInputElement> | undefined;
	};
	inputPasswordConfirm?: {
		value: string | number | readonly string[] | undefined;
		onChange: ChangeEventHandler<HTMLInputElement> | undefined;
	};
}

export default function RegisterUnitForm(props: RegisterUnitFormProps) {
	return (
		<>
			<form onSubmit={props.handleSubmit}>
				<div className="mb-4">
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
							placeholder="Choose a username"
							value={props.inputUsername?.value}
							onChange={props.inputUsername?.onChange}
							required
						/>
					</div>
				</div>
				<div className="mb-4">
					<label
						htmlFor="name"
						className="block text-gray-300 text-sm font-medium mb-2">
						Full Name
					</label>
					<div className="relative">
						<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
							<i className="fas fa-id-card text-gray-500" />
						</div>
						<Input
							type="text"
							id="name"
							name="name"
							placeholder="Enter your full name"
							value={props.inputUsername?.value}
							onChange={props.inputUsername?.onChange}
							required
						/>
					</div>
				</div>
				<div className="mb-4">
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
							placeholder="Create a password"
							value={props.inputPassword?.value}
							onChange={props.inputPassword?.onChange}
							required
						/>
					</div>
				</div>
				<div className="mb-6">
					<label
						htmlFor="confirm_password"
						className="block text-gray-300 text-sm font-medium mb-2">
						Confirm Password
					</label>
					<div className="relative">
						<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
							<i className="fas fa-check-double text-gray-500" />
						</div>
						<Input
							type="password"
							id="confirm_password"
							name="confirm_password"
							placeholder="Confirm your password"
							value={props.inputPasswordConfirm?.value}
							onChange={props.inputPasswordConfirm?.onChange}
							required
						/>
					</div>
				</div>
				<div className="mb-6">
					<button
						type="submit"
						className="w-full bg-gradient text-white py-3 px-4 rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 font-medium shadow-lg transform hover:-translate-y-0.5">
						<i className="fas fa-user-plus mr-2" /> Register
					</button>
				</div>
				<div className="text-center text-sm text-gray-400">
					Already have an account?
					<Link
						href={"/login"}
						className="text-blue-400 hover:text-blue-300 font-medium transition-colors duration-200">
						Sign in
					</Link>
				</div>
			</form>
		</>
	);
}
