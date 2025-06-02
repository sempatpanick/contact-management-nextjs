import { LoginPayload } from "@/src/domain/entities/LoginPayload";
import { RegisterPayload } from "@/src/domain/entities/RegisterPayload";
import { Response } from "@/src/domain/entities/Response";
import { LoginResponse } from "@/src/domain/entities/LoginResponse";
import { UserResponse } from "@/src/domain/entities/UserResponse";
import { BASE_URL } from "@/src/lib/config";

export const AuthApi = {
	authRegister: async (
		payload: RegisterPayload
	): Promise<Response<UserResponse>> => {
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
	},
	authLogin: async (
		payload: LoginPayload
	): Promise<Response<LoginResponse>> => {
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
	},
	authLogout: async (token: string): Promise<Response<string>> => {
		try {
			const res = await fetch(`${BASE_URL}/users/logout`, {
				method: "DELETE",
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
				message: "Logout successfully.",
				data: data.data,
			};
		} catch (error) {
			console.error("error:", error);
			return {
				success: false,
				message: "Something went wrong. Please try again.",
			};
		}
	},
};
