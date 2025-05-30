import { ContactParams } from "@/types/ContactParams";
import { BASE_URL } from "../config";
import { ContactResponse } from "@/types/ContactResponse";
import { ContactPayload } from "@/types/ContactPayload";
import { Response } from "@/types/Response";

export async function contactCreate(
	token: string,
	payload: ContactPayload
): Promise<Response<ContactResponse>> {
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
}

export async function contactUpdate(
	token: string,
	id: number,
	payload: ContactPayload
): Promise<Response<ContactResponse>> {
	try {
		const url = new URL(`${BASE_URL}/contacts/${id}`);
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
}

export async function contactList(
	token: string,
	params: ContactParams
): Promise<Response<Array<ContactResponse>>> {
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
}

export async function contactDetail(
	token: string,
	id: number
): Promise<Response<Array<ContactResponse>>> {
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
}

export async function contactDelete(
	token: string,
	id: number
): Promise<Response<string>> {
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
}
