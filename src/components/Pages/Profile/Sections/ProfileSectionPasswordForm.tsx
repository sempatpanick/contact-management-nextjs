import Input from "@/src/components/Common/Units/Input";
import { ChangeEventHandler, FormEventHandler } from "react";

interface ProfileSectionPasswordFormProps {
	handleSubmit?: FormEventHandler;
	inputPassword?: {
		value: string | number | readonly string[] | undefined;
		onChange: ChangeEventHandler<HTMLInputElement> | undefined;
	};
	inputPasswordConfirm?: {
		value: string | number | readonly string[] | undefined;
		onChange: ChangeEventHandler<HTMLInputElement> | undefined;
	};
}

export default function ProfileSectionPasswordForm(
	props: ProfileSectionPasswordFormProps
) {
	return (
		<>
			<form onSubmit={props.handleSubmit}>
				<div className="mb-5">
					<label
						htmlFor="new_password"
						className="block text-gray-300 text-sm font-medium mb-2">
						New Password
					</label>
					<div className="relative">
						<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
							<i className="fas fa-lock text-gray-500" />
						</div>
						<Input
							type="password"
							id="new_password"
							name="new_password"
							placeholder="Enter your new password"
							value={props.inputPassword?.value}
							onChange={props.inputPassword?.onChange}
							required
						/>
					</div>
				</div>
				<div className="mb-5">
					<label
						htmlFor="confirm_password"
						className="block text-gray-300 text-sm font-medium mb-2">
						Confirm New Password
					</label>
					<div className="relative">
						<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
							<i className="fas fa-check-double text-gray-500" />
						</div>
						<Input
							type="password"
							id="confirm_password"
							name="confirm_password"
							placeholder="Confirm your new password"
							value={props.inputPasswordConfirm?.value}
							onChange={props.inputPasswordConfirm?.onChange}
							required
						/>
					</div>
				</div>
				<div className="mt-6">
					<button
						type="submit"
						className="w-full bg-gradient text-white py-3 px-4 rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 font-medium shadow-lg transform hover:-translate-y-0.5 flex items-center justify-center">
						<i className="fas fa-key mr-2" /> Update Password
					</button>
				</div>
			</form>
		</>
	);
}
