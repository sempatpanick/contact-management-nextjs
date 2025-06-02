import { AppRepositoryImpl } from "@/src/infrastructure/respositories/AppRepositoryImpl";
import { RegisterPayload } from "../entities/RegisterPayload";
import { LoginPayload } from "../entities/LoginPayload";

const repository = AppRepositoryImpl;

export const AuthUseCase = {
	register: async (payload: RegisterPayload) => repository.register(payload),
	login: async (payload: LoginPayload) => repository.login(payload),
	logout: async (token: string) => repository.logout(token),
};
