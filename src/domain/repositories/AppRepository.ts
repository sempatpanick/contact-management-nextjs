import { ContactParams } from "@/src/domain/entities/ContactParams";
import { ContactResponse } from "@/src/domain/entities/ContactResponse";
import { Response } from "@/src/domain/entities/Response";
import { ContactPayload } from "../entities/ContactPayload";
import { AddressPayload } from "../entities/AddressPayload";
import { AddressResponse } from "../entities/AddressResponse";
import { UserPayload } from "../entities/UserPayload";
import { UserResponse } from "../entities/UserResponse";
import { RegisterPayload } from "../entities/RegisterPayload";
import { LoginPayload } from "../entities/LoginPayload";
import { LoginResponse } from "../entities/LoginResponse";

export interface AppRepository {
	register: (payload: RegisterPayload) => Promise<Response<UserResponse>>;
	login: (payload: LoginPayload) => Promise<Response<LoginResponse>>;
	logout: (token: string) => Promise<Response<string>>;
	updateUserProfile: (
		token: string,
		payload: UserPayload
	) => Promise<Response<UserResponse>>;
	updateUserPassword: (
		token: string,
		password: string
	) => Promise<Response<UserResponse>>;
	getUserDetail: (token: string) => Promise<Response<UserResponse>>;
	createContact: (
		token: string,
		payload: ContactPayload
	) => Promise<Response<ContactResponse>>;
	updateContact: (
		token: string,
		id: number,
		payload: ContactPayload
	) => Promise<Response<ContactResponse>>;
	deleteContact: (token: string, id: number) => Promise<Response<string>>;
	getContacts: (
		token: string,
		params: ContactParams
	) => Promise<Response<ContactResponse[]>>;
	getContactDetail: (
		token: string,
		id: number
	) => Promise<Response<ContactResponse>>;
	createAddress: (
		token: string,
		contactId: number,
		payload: AddressPayload
	) => Promise<Response<AddressResponse>>;
	updateAddress: (
		token: string,
		contactId: number,
		id: number,
		payload: AddressPayload
	) => Promise<Response<AddressResponse>>;
	deleteAddress: (
		token: string,
		contactId: number,
		id: number
	) => Promise<Response<string>>;
	getAddresses: (
		token: string,
		contactId: number
	) => Promise<Response<AddressResponse[]>>;
	getAddressDetail: (
		token: string,
		contactId: number,
		id: number
	) => Promise<Response<AddressResponse>>;
}
