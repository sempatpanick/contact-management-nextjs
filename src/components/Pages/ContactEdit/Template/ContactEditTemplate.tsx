"use client";

import InputWithLabel from "@/src/components/Common/InputWithLabel";
import Input from "@/src/components/Common/Units/Input";
import { ContactUseCase } from "@/src/domain/useCases/contactUseCase";
import { alertError, alertSuccess } from "@/src/lib/alert";
import Link from "next/link";
import { useParams } from "next/navigation";
import { FormEvent, useState } from "react";
import { useEffectOnce, useLocalStorage } from "react-use";
import ContactEditSectionForm from "../Sections/ContactEditSectionForm";
import DashboardContentHeader from "@/src/components/Common/DashboardContentHeader";

export default function ContactEditTemplate() {
	const contactUseCase = ContactUseCase;

	const params = useParams();
	const id = parseInt((params?.id ?? "").toString());
	const [first_name, setFirstName] = useState("");
	const [last_name, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");

	const [token, _] = useLocalStorage("token", "");

	async function fetchContactDetail() {
		const response = await contactUseCase.getContactDetail(token ?? "", id);

		if (!response.success) {
			alertError(response.message ?? "Failed to get contact detail");
			return;
		}
		setFirstName(response.data?.first_name ?? "");
		setLastName(response.data?.last_name ?? "");
		setEmail(response.data?.email ?? "");
		setPhone(response.data?.phone ?? "");
	}

	async function handleSubmit(e: FormEvent) {
		e.preventDefault();

		const response = await contactUseCase.updateContact(token ?? "", id, {
			first_name,
			last_name,
			email,
			phone,
		});

		if (!response.success) {
			alertError(response.message ?? "Failed to update contact");
			return;
		}
		alertSuccess(response.message ?? "Contact updated successfully");
	}

	useEffectOnce(() => {
		fetchContactDetail().then(() => console.log("contact detail fetched"));
	});

	return (
		<>
			<div>
				<DashboardContentHeader
					icon="fa-user-edit"
					title="Edit Contact"
					leading={
						<Link
							href={"/dashboard/contacts"}
							className="text-blue-400 hover:text-blue-300 mr-4 flex items-center transition-colors duration-200">
							<i className="fas fa-arrow-left mr-2" /> Back to
							Contacts
						</Link>
					}
				/>
				<div className="bg-gray-800 bg-opacity-80 rounded-xl shadow-custom border border-gray-700 overflow-hidden max-w-2xl mx-auto animate-fade-in">
					<div className="p-8">
						<ContactEditSectionForm
							handleSubmit={handleSubmit}
							inputFirstName={{
								value: first_name,
								onChange: e => setFirstName(e.target.value),
							}}
							inputLastName={{
								value: last_name,
								onChange: e => setLastName(e.target.value),
							}}
							inputEmail={{
								value: email,
								onChange: e => setEmail(e.target.value),
							}}
							inputPhone={{
								value: phone,
								onChange: e => setPhone(e.target.value),
							}}
						/>
					</div>
				</div>
			</div>
		</>
	);
}
