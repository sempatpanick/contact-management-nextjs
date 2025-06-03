"use client";

import { AuthUseCase } from "@/src/domain/useCases/authUseCase";
import { alertError, alertSuccess } from "@/src/lib/alert";
import { redirect } from "next/navigation";
import { FormEvent, useState } from "react";
import RegisterSectionForm from "../Sections/RegisterSectionForms";
import AuthHeader from "@/src/components/Common/AuthHeader";

export default function RegisterTemplate() {
	const authUseCase = AuthUseCase;

	const [username, setUsername] = useState("");
	const [name, setName] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	async function handleSubmit(e: FormEvent) {
		e.preventDefault();

		if (password !== confirmPassword) {
			await alertError("Passwords do not match. Please try again.");
			return;
		}

		const response = await authUseCase.register({
			username,
			password,
			name,
		});

		if (!response.success) {
			alertError(response.message ?? "Failed to register");
			return;
		}

		await alertSuccess(response.message ?? "Register success");
		redirect("/login");
	}

	return (
		<>
			<div className="animate-fade-in bg-gray-800 bg-opacity-80 p-8 rounded-xl shadow-custom border border-gray-700 backdrop-blur-sm w-full max-w-md">
				<AuthHeader description="Create a new account" />
				<RegisterSectionForm
					handleSubmit={handleSubmit}
					inputUsername={{
						value: username,
						onChange: e => setUsername(e.target.value),
					}}
					inputName={{
						value: name,
						onChange: e => setName(e.target.value),
					}}
					inputPassword={{
						value: password,
						onChange: e => setPassword(e.target.value),
					}}
					inputPasswordConfirm={{
						value: confirmPassword,
						onChange: e => setConfirmPassword(e.target.value),
					}}
				/>
			</div>
		</>
	);
}
