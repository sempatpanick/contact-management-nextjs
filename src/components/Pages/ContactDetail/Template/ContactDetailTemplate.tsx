"use client";

import { alertConfirm, alertError, alertSuccess } from "@/src/lib/alert";
import { AddressResponse } from "@/src/domain/entities/AddressResponse";
import { ContactResponse } from "@/src/domain/entities/ContactResponse";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useEffectOnce, useLocalStorage } from "react-use";
import { ContactUseCase } from "@/src/domain/useCases/contactUseCase";
import { AddressUseCase } from "@/src/domain/useCases/addressUseCase";
import DashboardContentHeader from "@/src/components/Common/DashboardContentHeader";
import ContactDetailSectionInfoCard from "../Sections/ContactDetailSectionInfoCard";
import ContactDetailSectionAddressCard from "../Sections/ContactDetailSectionAddressCard";

export default function ContactDetailTemplate() {
	const addressUseCase = AddressUseCase;
	const contactUseCase = ContactUseCase;

	const params = useParams();
	const id = parseInt((params?.id ?? "").toString());
	const [contact, setContact] = useState<ContactResponse | null>(null);
	const [addresses, setAddresses] = useState<Array<AddressResponse>>([]);
	const [reloadAddress, setReloadAddress] = useState(false);

	const [token, _] = useLocalStorage("token", "");

	async function fetchContactDetail() {
		const response = await contactUseCase.getContactDetail(token ?? "", id);

		if (!response.success) {
			alertError(response.message ?? "Failed to get contact detail");
			return;
		}

		setContact(response.data ?? null);
	}

	async function fetchAddresses() {
		const response = await addressUseCase.getAddresses(token ?? "", id);

		if (!response.success) {
			alertError(response.message ?? "Failed to get address list");
		}

		setAddresses(response.data ?? []);
	}

	async function handleAddressDelete(addressId: number) {
		const result = await alertConfirm(
			"Are you sure want to delete this address?"
		);

		if (!result) {
			return;
		}

		const response = await addressUseCase.deleteAddress(
			token ?? "",
			id,
			addressId
		);

		if (!response.success) {
			alertError(response.message ?? "Failed to delete address");
			return;
		}

		setReloadAddress(!reloadAddress);
		await alertSuccess("address deleted successfully");
	}

	useEffect(() => {
		fetchAddresses().then(() => console.log("addresses fetched"));
	}, [reloadAddress]);

	useEffectOnce(() => {
		fetchContactDetail().then(() => console.log("contact detail fetched"));
	});

	return (
		<>
			<DashboardContentHeader
				icon="fa-id-card"
				title="Contact Details"
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
					<div className="mb-8 text-center">
						<div className="w-20 h-20 bg-gradient rounded-full mx-auto flex items-center justify-center mb-4 shadow-lg">
							<i className="fas fa-user text-3xl text-white" />
						</div>
						<h2 className="text-2xl font-bold text-white mb-2">
							{contact?.first_name ?? ""}{" "}
							{contact?.last_name ?? ""}
						</h2>
						<div className="w-24 h-1 bg-gradient mx-auto rounded-full" />
					</div>
					<div className="space-y-5 mb-8">
						<div className="grid grid-cols-1 md:grid-cols-2 gap-5">
							<ContactDetailSectionInfoCard
								icon="fa-user-tag"
								label="First Name"
								value={contact?.first_name ?? ""}
							/>
							<ContactDetailSectionInfoCard
								icon="fa-user-tag"
								label="Last Name"
								value={contact?.last_name ?? ""}
							/>
						</div>
						<ContactDetailSectionInfoCard
							icon="fa-envelope"
							label="Email"
							value={contact?.email ?? ""}
						/>
						<ContactDetailSectionInfoCard
							icon="fa-phone"
							label="Phone"
							value={contact?.phone ?? ""}
						/>
					</div>
					<div className="mb-8">
						<div className="flex items-center mb-5">
							<i className="fas fa-map-marker-alt text-blue-400 mr-3" />
							<h3 className="text-xl font-semibold text-white">
								Addresses
							</h3>
						</div>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-5">
							<div className="bg-gray-700 bg-opacity-50 p-5 rounded-lg border-2 border-dashed border-gray-600 shadow-md card-hover">
								<Link
									href={`${id}/addresses/create`}
									className="block h-full">
									<div className="flex flex-col items-center justify-center h-full text-center py-4">
										<div className="w-16 h-16 bg-gradient rounded-full flex items-center justify-center mb-4 shadow-lg transform transition-transform duration-300 hover:scale-110">
											<i className="fas fa-plus text-2xl text-white" />
										</div>
										<h4 className="text-lg font-semibold text-white">
											Add Address
										</h4>
									</div>
								</Link>
							</div>
							{addresses.map(item => (
								<ContactDetailSectionAddressCard
									key={item.id}
									address={item}
									contactId={id}
									handleDelete={addressId =>
										handleAddressDelete(addressId)
									}
								/>
							))}
						</div>
					</div>
					<div className="flex justify-end space-x-4">
						<Link
							href={"./"}
							className="px-5 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 flex items-center shadow-md">
							<i className="fas fa-arrow-left mr-2" /> Back
						</Link>
						<Link
							href={`${id}/edit`}
							className="px-5 py-3 bg-gradient text-white rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 font-medium shadow-lg transform hover:-translate-y-0.5 flex items-center">
							<i className="fas fa-user-edit mr-2" /> Edit Contact
						</Link>
					</div>
				</div>
			</div>
		</>
	);
}
