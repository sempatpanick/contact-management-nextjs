"use client";

import AuthHeader from "@/src/components/Common/AuthHeader";
import { AuthUseCase } from "@/src/domain/useCases/authUseCase";
import { alertError } from "@/src/lib/alert";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useState, FormEvent } from "react";
import { useLocalStorage } from "react-use";
import LoginUnitForm from "../Units/LoginUnitForm";

export default function LoginTemplate() {
	const authUseCase = AuthUseCase;

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const [_, setToken] = useLocalStorage("token", "");

	async function handleSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();

		const response = await authUseCase.login({
			username,
			password,
		});

		if (!response.success) {
			alertError(response.message ?? "Failed to login");
			return;
		}

		document.cookie = `token=${response.data?.token}; path=/; max-age=86400; SameSite=Strict`;
		setToken(response.data?.token ?? "");
		redirect("/dashboard/contacts");
	}

	return (
		<>
			<div className="animate-fade-in bg-gray-800 bg-opacity-80 p-8 rounded-xl shadow-custom border border-gray-700 backdrop-blur-sm w-full max-w-md">
				<AuthHeader description="Sign in to your account" />
				<LoginUnitForm
					handleSubmit={handleSubmit}
					inputUsername={{
						value: username,
						onChange: e => setUsername(e.target.value),
					}}
					inputPassword={{
						value: password,
						onChange: e => setPassword(e.target.value),
					}}
				/>
			</div>
		</>
	);
}
