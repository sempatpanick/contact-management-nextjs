"use client";

import { AuthUseCase } from "@/src/domain/useCases/authUseCase";
import { alertError } from "@/src/lib/alert";
import { redirect } from "next/navigation";
import { useLocalStorage, useEffectOnce } from "react-use";

export default function UserLogout() {
	const authUseCase = AuthUseCase;

	const [token, setToken] = useLocalStorage("token", "");

	async function handleLogout() {
		const response = await authUseCase.logout(token ?? "");

		if (!response.success) {
			await alertError(response.message ?? "Failed to logout");
			return;
		}
		document.cookie = "token=; path=/; max-age=0; SameSite=Strict";
		setToken("");
		redirect("/login");
	}

	useEffectOnce(() => {
		handleLogout().then(() => console.log("User logged out successfully"));
	});

	return <></>;
}
