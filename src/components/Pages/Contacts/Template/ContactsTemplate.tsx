"use client";

import { alertConfirm, alertError, alertSuccess } from "@/src/lib/alert";
import { ContactResponse } from "@/src/domain/entities/ContactResponse";
import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { useEffectOnce, useLocalStorage } from "react-use";
import { ContactUseCase } from "@/src/domain/useCases/contactUseCase";
import ContactSectionSearchForm from "../Sections/ContactSectionSearchForm";
import ContactSectionContactCard from "../Sections/ContactSectionContactCard";
import ContactSectionPagination from "../Sections/ContactSectionPagination";
import DashboardContentHeader from "@/src/components/Common/DashboardContentHeader";

export default function ContactsTemplate() {
	const contactUseCase = ContactUseCase;

	const [token, _] = useLocalStorage("token", "");
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	const [page, setPage] = useState(1);
	const [totalPage, setTotalPage] = useState(1);
	const [contacts, setContacts] = useState<ContactResponse[]>([]);
	const [reload, setReload] = useState(false);

	function getPages() {
		const pages = [];
		for (let i = 1; i <= totalPage; i++) {
			pages.push(i);
		}
		return pages;
	}

	async function fetchContacts() {
		const response = await contactUseCase.getContacts(token ?? "", {
			name,
			phone,
			email,
			page,
		});

		if (!response.success) {
			await alertError(response.message ?? "Failed to get contacts");
			return;
		}

		setContacts(response.data ?? []);
		setTotalPage(response.paging?.total_page ?? 1);
	}

	async function handleContactDelete(id: number) {
		const result = await alertConfirm(
			"Are you sure want to delete this contact?"
		);
		if (!result) {
			return;
		}

		const response = await contactUseCase.deleteContact(token ?? "", id);

		if (!response.success) {
			await alertError(response.message ?? "Failed to delete contact");
			return;
		}

		alertSuccess("Contact has been deleted successfully");
		setReload(!reload);
	}

	async function handlePageChange(value: number) {
		setPage(value);
		setReload(!reload);
	}

	async function handleSearchContacts(e: FormEvent) {
		e.preventDefault();
		setPage(1);
		setReload(!reload);
	}

	useEffect(() => {
		fetchContacts().then(() => console.log("contacts fetched"));
	}, [reload]);

	useEffectOnce(() => {
		const toggleButton = document.getElementById("toggleSearchForm");
		const searchFormContent = document.getElementById("searchFormContent");
		const toggleIcon = document.getElementById("toggleSearchIcon");

		// Add transition for smooth animation
		if (!searchFormContent) return;
		searchFormContent.style.transition =
			"max-height 0.3s ease-in-out, opacity 0.3s ease-in-out, margin 0.3s ease-in-out";
		searchFormContent.style.overflow = "hidden";
		searchFormContent.style.maxHeight = "0px";
		searchFormContent.style.opacity = "0";
		searchFormContent.style.marginTop = "0";

		function toggleSearchForm() {
			if (!searchFormContent) return;
			if (searchFormContent.style.maxHeight !== "0px") {
				// Hide the form
				searchFormContent.style.maxHeight = "0px";
				searchFormContent.style.opacity = "0";
				searchFormContent.style.marginTop = "0";
				toggleIcon?.classList.remove("fa-chevron-up");
				toggleIcon?.classList.add("fa-chevron-down");
			} else {
				// Show the form
				searchFormContent.style.maxHeight =
					searchFormContent.scrollHeight + "px";
				searchFormContent.style.opacity = "1";
				searchFormContent.style.marginTop = "1rem";
				toggleIcon?.classList.remove("fa-chevron-down");
				toggleIcon?.classList.add("fa-chevron-up");
			}
		}

		toggleButton?.addEventListener("click", toggleSearchForm);

		return () => {
			toggleButton?.removeEventListener("click", toggleSearchForm);
		};
	});

	return (
		<>
			<div>
				<DashboardContentHeader icon="fa-users" title="My Contacts" />
				<div className="bg-gray-800 bg-opacity-80 rounded-xl shadow-custom border border-gray-700 p-6 mb-8 animate-fade-in">
					<div className="flex items-center justify-between mb-4">
						<div className="flex items-center">
							<i className="fas fa-search text-blue-400 mr-3" />
							<h2 className="text-xl font-semibold text-white">
								Search Contacts
							</h2>
						</div>
						<button
							type="button"
							id="toggleSearchForm"
							className="text-gray-300 hover:text-white hover:bg-gray-700 p-2 rounded-full focus:outline-none transition-all duration-200">
							<i
								className="fas fa-chevron-down text-lg"
								id="toggleSearchIcon"
							/>
						</button>
					</div>
					<div id="searchFormContent" className="mt-4">
						<ContactSectionSearchForm
							handleSubmit={handleSearchContacts}
							inputName={{
								value: name,
								onChange: e => setName(e.target.value),
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
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					<div className="bg-gray-800 bg-opacity-80 rounded-xl shadow-custom overflow-hidden border-2 border-dashed border-gray-700 card-hover animate-fade-in">
						<Link
							href={"/dashboard/contacts/create"}
							className="block p-6 h-full">
							<div className="flex flex-col items-center justify-center h-full text-center">
								<div className="w-20 h-20 bg-gradient rounded-full flex items-center justify-center mb-5 shadow-lg transform transition-transform duration-300 hover:scale-110">
									<i className="fas fa-user-plus text-3xl text-white" />
								</div>
								<h2 className="text-xl font-semibold text-white mb-3">
									Create New Contact
								</h2>
								<p className="text-gray-300">
									Add a new contact to your list
								</p>
							</div>
						</Link>
					</div>
					{contacts.map(contact => (
						<ContactSectionContactCard
							key={contact.id}
							contact={contact}
							handleClickDelete={() =>
								handleContactDelete(contact.id)
							}
						/>
					))}
				</div>
				<ContactSectionPagination
					page={page}
					totalPage={totalPage}
					pages={getPages()}
					onPrevious={() => handlePageChange(page - 1)}
					onPageChange={value => handlePageChange(value)}
					onNext={() => handlePageChange(page + 1)}
				/>
			</div>
		</>
	);
}
