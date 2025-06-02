import { ContactParams } from "@/src/domain/entities/ContactParams";
import { ContactResponse } from "@/src/domain/entities/ContactResponse";
import { ContactPayload } from "@/src/domain/entities/ContactPayload";
import { Response } from "@/src/domain/entities/Response";
import { BASE_URL } from "@/src/lib/config";

export const ContactApi = {
	contactCreate: async (
		token: string,
		payload: ContactPayload
	): Promise<Response<ContactResponse>> => {
		try {
			const url = new URL(`${BASE_URL}/contacts`);
			const res = await fetch(url, {
				method: "POST",
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
				message: "Contact successfully created.",
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
	contactUpdate: async (
		token: string,
		id: number,
		payload: ContactPayload
	): Promise<Response<ContactResponse>> => {
		try {
			const url = new URL(`${BASE_URL}/contacts/${id}`);
			const res = await fetch(url, {
				method: "PUT",
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
				message: "Contact successfully updated.",
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
	contactDelete: async (
		token: string,
		id: number
	): Promise<Response<string>> => {
		try {
			const url = new URL(`${BASE_URL}/contacts/${id}`);

			const res = await fetch(url, {
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
				message: "Contact successfully deleted.",
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
	contactList: async (
		token: string,
		params: ContactParams
	): Promise<Response<ContactResponse[]>> => {
		try {
			const url = new URL(`${BASE_URL}/contacts`);

			if (params.name) url.searchParams.append("name", params.name);
			if (params.email) url.searchParams.append("email", params.email);
			if (params.phone) url.searchParams.append("phone", params.phone);
			if (params.page)
				url.searchParams.append("page", params.page.toString());
			if (params.size)
				url.searchParams.append("size", params.size.toString());

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
				message: "Contacts successfully fetched.",
				data: data.data,
				paging: data.paging,
			};
		} catch (error) {
			console.error("error:", error);
			return {
				success: false,
				message: "Something went wrong. Please try again.",
			};
		}
	},
	contactDetail: async (
		token: string,
		id: number
	): Promise<Response<ContactResponse>> => {
		try {
			const url = new URL(`${BASE_URL}/contacts/${id}`);

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
				message: "Contact successfully fetched.",
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
