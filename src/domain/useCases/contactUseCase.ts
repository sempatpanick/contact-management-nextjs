import { AppRepository } from "@/src/domain/repositories/AppRepository";
import { ContactParams } from "@/src/domain/entities/ContactParams";
import { ContactPayload } from "../entities/ContactPayload";
import { AppRepositoryImpl } from "@/src/infrastructure/respositories/AppRepositoryImpl";

const repository = AppRepositoryImpl;

export const ContactUseCase = {
	createContact: async (token: string, payload: ContactPayload) => {
		return await repository.createContact(token, payload);
	},
	updateContact: async (
		token: string,
		id: number,
		payload: ContactPayload
	) => {
		return await repository.updateContact(token, id, payload);
	},
	deleteContact: async (token: string, id: number) => {
		return await repository.deleteContact(token, id);
	},
	getContacts: async (token: string, params: ContactParams) => {
		return await repository.getContacts(token, params);
	},
	getContactDetail: async (token: string, id: number) => {
		return await repository.getContactDetail(token, id);
	},
};
