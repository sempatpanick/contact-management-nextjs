"use client";

import { UserUseCase } from "@/src/domain/useCases/userUseCase";
import { alertError, alertSuccess } from "@/src/lib/alert";
import { FormEvent, useState } from "react";
import { useLocalStorage, useEffectOnce } from "react-use";
import ProfileSectionForm from "../Sections/ProfileSectionForm";
import ProfileSectionPasswordForm from "../Sections/ProfileSectionPasswordForm";
import DashboardContentHeader from "@/src/components/Common/DashboardContentHeader";

export default function ProfileTemplate() {
	const userCase = UserUseCase;

	const [name, setName] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [token, _] = useLocalStorage("token", "");

	async function fetchUserDetail() {
		const response = await userCase.getUserDetail(token ?? "");

		if (!response.success) {
			await alertError(response.message ?? "Failed to get user detail");
			return;
		}
		setName(response.data?.name ?? "");
	}

	async function handleSubmitProfile(e: FormEvent) {
		e.preventDefault();

		const response = await userCase.updateUserProfile(token ?? "", {
			name,
		});

		if (!response.success) {
			await alertError(response.message ?? "Failed to update user");
			return;
		}
		await alertSuccess("Profile updated successfully!");
	}

	async function handleSubmitPassword(e: FormEvent) {
		e.preventDefault();

		if (password !== confirmPassword) {
			await alertError("Passwords do not match. Please try again.");
			return;
		}

		const response = await userCase.updateUserPassword(
			token ?? "",
			password
		);

		if (!response.success) {
			await alertError(response.message ?? "Failed to change password");
			return;
		}

		setPassword("");
		setConfirmPassword("");
		await alertSuccess("Password updated successfully!");
	}

	useEffectOnce(() => {
		fetchUserDetail().then(() => {
			console.log("User details fetched successfully");
		});
	});

	return (
		<>
			<div>
				<DashboardContentHeader icon="fa-user-cog" title="My Profile" />
				<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
					<div className="bg-gray-800 bg-opacity-80 rounded-xl shadow-custom border border-gray-700 overflow-hidden card-hover animate-fade-in">
						<div className="p-6">
							<div className="flex items-center mb-4">
								<div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center mr-3 shadow-md">
									<i className="fas fa-user-edit text-white" />
								</div>
								<h2 className="text-xl font-semibold text-white">
									Edit Profile
								</h2>
							</div>
							<ProfileSectionForm
								handleSubmit={handleSubmitProfile}
								inputName={{
									value: name,
									onChange: e => setName(e.target.value),
								}}
							/>
						</div>
					</div>
					<div className="bg-gray-800 bg-opacity-80 rounded-xl shadow-custom border border-gray-700 overflow-hidden card-hover animate-fade-in">
						<div className="p-6">
							<div className="flex items-center mb-4">
								<div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center mr-3 shadow-md">
									<i className="fas fa-key text-white" />
								</div>
								<h2 className="text-xl font-semibold text-white">
									Change Password
								</h2>
							</div>
							<ProfileSectionPasswordForm
								handleSubmit={handleSubmitPassword}
								inputPassword={{
									value: password,
									onChange: e => setPassword(e.target.value),
								}}
								inputPasswordConfirm={{
									value: confirmPassword,
									onChange: e =>
										setConfirmPassword(e.target.value),
								}}
							/>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
