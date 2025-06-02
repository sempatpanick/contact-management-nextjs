import { AppRepositoryImpl } from "@/src/infrastructure/respositories/AppRepositoryImpl";
import { AddressPayload } from "../entities/AddressPayload";

const repository = AppRepositoryImpl;

export const AddressUseCase = {
	createAddress: async (
		token: string,
		contactId: number,
		payload: AddressPayload
	) => {
		return await repository.createAddress(token, contactId, payload);
	},
	updateAddress: async (
		token: string,
		contactId: number,
		id: number,
		payload: AddressPayload
	) => {
		return await repository.updateAddress(token, contactId, id, payload);
	},
	deleteAddress: async (token: string, contactId: number, id: number) => {
		return await repository.deleteAddress(token, contactId, id);
	},
	getAddresses: async (token: string, contactId: number) => {
		return await repository.getAddresses(token, contactId);
	},
	getAddressDetail: async (token: string, contactId: number, id: number) => {
		return await repository.getAddressDetail(token, contactId, id);
	},
};
