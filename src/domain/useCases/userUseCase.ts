import { AppRepositoryImpl } from "@/src/infrastructure/respositories/AppRepositoryImpl";
import { UserPayload } from "../entities/UserPayload";

const repository = AppRepositoryImpl;

export const UserUseCase = {
	updateUserProfile: async (token: string, payload: UserPayload) =>
		repository.updateUserProfile(token, payload),
	updateUserPassword: async (token: string, password: string) =>
		repository.updateUserPassword(token, password),
	getUserDetail: async (token: string) => repository.getUserDetail(token),
};
