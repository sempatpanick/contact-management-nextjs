import { Response } from "@/types/Response";
import { UserPayload } from "@/types/UserPayload";
import { UserResponse } from "@/types/UserResponse";
import { BASE_URL } from "../config";

export async function userUpdateProfile(
	token: string,
	payload: UserPayload
): Promise<Response<UserResponse>> {
	try {
		const url = new URL(`${BASE_URL}/users/current`);
		const res = await fetch(url, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
				Authorization: token,
			},
			body: JSON.stringify(payload),
		});

		if (!res.ok) {
			const errorData = await res.json();
			return {
				success: false,
				message: errorData.errors,
			};
		}

		const data = await res.json();
		return {
			success: true,
			message: "User successfully updated.",
			data: data.data,
		};
	} catch (error) {
		console.error("error:", error);
		return {
			success: false,
			message: "Something went wrong. Please try again.",
		};
	}
}

export async function userUpdatePassword(
	token: string,
	password: string
): Promise<Response<UserResponse>> {
	try {
		const url = new URL(`${BASE_URL}/users/current`);
		const res = await fetch(url, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
				Authorization: token,
			},
			body: JSON.stringify({ password }),
		});

		if (!res.ok) {
			const errorData = await res.json();
			return {
				success: false,
				message: errorData.errors,
			};
		}

		const data = await res.json();
		return {
			success: true,
			message: "Password successfully updated.",
			data: data.data,
		};
	} catch (error) {
		console.error("error:", error);
		return {
			success: false,
			message: "Something went wrong. Please try again.",
		};
	}
}

export async function userDetail(
	token: string
): Promise<Response<UserResponse>> {
	try {
		const url = new URL(`${BASE_URL}/users/current`);

		const res = await fetch(url, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
				Authorization: token,
			},
		});

		if (!res.ok) {
			const errorData = await res.json();
			return {
				success: false,
				message: errorData.errors,
			};
		}

		const data = await res.json();
		return {
			success: true,
			message: "User successfully fetched.",
			data: data.data,
		};
	} catch (error) {
		console.error("error:", error);
		return {
			success: false,
			message: "Something went wrong. Please try again.",
		};
	}
}
