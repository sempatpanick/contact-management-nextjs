import { AppRepository } from "@/src/domain/repositories/AppRepository";
import { ContactParams } from "@/src/domain/entities/ContactParams";
import { ContactPayload } from "@/src/domain/entities/ContactPayload";
import { AddressPayload } from "@/src/domain/entities/AddressPayload";
import { AddressResponse } from "@/src/domain/entities/AddressResponse";
import { Response } from "@/src/domain/entities/Response";
import { UserPayload } from "@/src/domain/entities/UserPayload";
import { UserResponse } from "@/src/domain/entities/UserResponse";
import { LoginPayload } from "@/src/domain/entities/LoginPayload";
import { LoginResponse } from "@/src/domain/entities/LoginResponse";
import { RegisterPayload } from "@/src/domain/entities/RegisterPayload";
import { UserApi } from "../dataSources/api/userApi";
import { AddressApi } from "../dataSources/api/addressApi";
import { AuthApi } from "../dataSources/api/authApi";
import { ContactApi } from "../dataSources/api/contactApi";

const addressApi = AddressApi;
const authApi = AuthApi;
const contactApi = ContactApi;
const userApi = UserApi;

export const AppRepositoryImpl: AppRepository = {
	register: async (
		payload: RegisterPayload
	): Promise<Response<UserResponse>> => authApi.authRegister(payload),
	login: async (payload: LoginPayload): Promise<Response<LoginResponse>> =>
		authApi.authLogin(payload),
	logout: async (token: string): Promise<Response<string>> =>
		authApi.authLogout(token),
	updateUserProfile: async (
		token: string,
		payload: UserPayload
	): Promise<Response<UserResponse>> =>
		userApi.userUpdateProfile(token, payload),
	updateUserPassword: async (
		token: string,
		password: string
	): Promise<Response<UserResponse>> =>
		userApi.userUpdatePassword(token, password),
	getUserDetail: async (token: string): Promise<Response<UserResponse>> =>
		userApi.userDetail(token),
	createContact: async (token: string, payload: ContactPayload) =>
		contactApi.contactCreate(token, payload),
	updateContact: async (token: string, id: number, payload: ContactPayload) =>
		contactApi.contactUpdate(token, id, payload),
	deleteContact: async (token: string, id: number) =>
		contactApi.contactDelete(token, id),
	getContacts: async (token: string, params: ContactParams) =>
		contactApi.contactList(token, params),
	getContactDetail: async (token: string, id: number) =>
		contactApi.contactDetail(token, id),
	createAddress: async (
		token: string,
		contactId: number,
		payload: AddressPayload
	): Promise<Response<AddressResponse>> =>
		addressApi.addressCreate(token, contactId, payload),
	updateAddress: async (
		token: string,
		contactId: number,
		id: number,
		payload: AddressPayload
	): Promise<Response<AddressResponse>> =>
		addressApi.addressUpdate(token, contactId, id, payload),
	deleteAddress: async (
		token: string,
		contactId: number,
		id: number
	): Promise<Response<string>> =>
		addressApi.addressDelete(token, contactId, id),
	getAddresses: async (
		token: string,
		contactId: number
	): Promise<Response<AddressResponse[]>> =>
		addressApi.addressList(token, contactId),
	getAddressDetail: async (
		token: string,
		contactId: number,
		id: number
	): Promise<Response<AddressResponse>> =>
		addressApi.addressDetail(token, contactId, id),
};
