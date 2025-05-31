"use client";

import { alertError } from "@/lib/alert";
import { authLogout } from "@/lib/api/authApi";
import { redirect } from "next/navigation";
import { useLocalStorage, useEffectOnce } from "react-use";

export default function UserLogout() {
	const [token, setToken] = useLocalStorage("token", "");

	async function handleLogout() {
		const response = await authLogout(token ?? "");

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
