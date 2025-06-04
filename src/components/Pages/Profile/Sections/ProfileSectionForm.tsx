import Input from "@/src/components/Common/Units/Input";
import { FormEventHandler, ChangeEventHandler } from "react";

interface ProfileSectionFormProps {
	handleSubmit?: FormEventHandler;
	inputName?: {
		value: string | number | readonly string[] | undefined;
		onChange: ChangeEventHandler<HTMLInputElement> | undefined;
	};
}

export default function ProfileSectionForm(props: ProfileSectionFormProps) {
	return (
		<>
			<form onSubmit={props.handleSubmit}>
				<div className="mb-5">
					<label
						htmlFor="name"
						className="block text-gray-300 text-sm font-medium mb-2">
						Full Name
					</label>
					<div className="relative">
						<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
							<i className="fas fa-user text-gray-500" />
						</div>
						<Input
							type="text"
							id="name"
							name="name"
							placeholder="Enter your full name"
							value={props.inputName?.value}
							onChange={props.inputName?.onChange}
							required
						/>
					</div>
				</div>
				<div className="mt-6">
					<button
						type="submit"
						className="w-full bg-gradient text-white py-3 px-4 rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 font-medium shadow-lg transform hover:-translate-y-0.5 flex items-center justify-center">
						<i className="fas fa-save mr-2" /> Update Profile
					</button>
				</div>
			</form>
		</>
	);
}
