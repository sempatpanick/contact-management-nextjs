import { AddressResponse } from "@/types/AddressResponse";
import { Response } from "@/types/Response";
import { BASE_URL } from "../config";
import { AddressPayload } from "@/types/AddressPayload";

export async function addressCreate(
	token: string,
	contactId: number,
	payload: AddressPayload
): Promise<Response<AddressResponse>> {
	try {
		const url = new URL(`${BASE_URL}/contacts/${contactId}/addresses`);
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
			message: "Address successfully created.",
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

export async function addressUpdate(
	token: string,
	contactId: number,
	id: number,
	payload: AddressPayload
): Promise<Response<AddressResponse>> {
	try {
		const url = new URL(
			`${BASE_URL}/contacts/${contactId}/addresses/${id}`
		);
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
			message: "Address successfully updated.",
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

export async function addressList(
	token: string,
	contactId: number
): Promise<Response<Array<AddressResponse>>> {
	try {
		const url = new URL(`${BASE_URL}/contacts/${contactId}/addresses`);

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

export async function addressDelete(
	token: string,
	contactId: number,
	id: number
): Promise<Response<string>> {
	try {
		const url = new URL(
			`${BASE_URL}/contacts/${contactId}/addresses/${id}`
		);

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
			message: "Address successfully deleted",
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
