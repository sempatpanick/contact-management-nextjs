import { PaginationInterface } from "./PaginationResponse";

export interface Response<T> {
	success: boolean;
	message?: string;
	data?: T;
	paging?: PaginationInterface;
}
