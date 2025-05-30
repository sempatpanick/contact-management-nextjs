import { LoginPayload } from "@/types/LoginPayload";
import { RegisterPayload } from "@/types/RegisterPayload";
import { Response } from "@/types/Response";
import { BASE_URL } from "../config";
import { LoginResponse } from "@/types/LoginResponse";
import { RegisterResponse } from "@/types/RegisterResponse";

export async function register(
	payload: RegisterPayload
): Promise<Response<RegisterResponse>> {
	try {
		const res = await fetch(`${BASE_URL}/users`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
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
			message: "Registration successful.",
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

export async function login(
	payload: LoginPayload
): Promise<Response<LoginResponse>> {
	try {
		const res = await fetch(`${BASE_URL}/users/login`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
			body: JSON.stringify(payload),
		});

		const resBody = await res.json();

		if (!res.ok) {
			return {
				success: false,
				message: resBody.errors,
			};
		}

		return {
			success: true,
			message: "Login successful.",
			data: resBody.data,
		};
	} catch (error) {
		console.error("error:", error);
		return {
			success: false,
			message: "Something went wrong. Please try again.",
		};
	}
}
