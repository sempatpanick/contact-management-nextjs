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
			<div>
				<div className="flex items-center mb-6">
					<Link
						href={"/dashboard/contacts"}
						className="text-blue-400 hover:text-blue-300 mr-4 flex items-center transition-colors duration-200">
						<i className="fas fa-arrow-left mr-2" /> Back to
						Contacts
					</Link>
					<h1 className="text-2xl font-bold text-white flex items-center">
						<i className="fas fa-id-card text-blue-400 mr-3" />{" "}
						Contact Details
					</h1>
				</div>
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
						{/* Contact Information */}
						<div className="space-y-5 mb-8">
							<div className="grid grid-cols-1 md:grid-cols-2 gap-5">
								<div className="bg-gray-700 bg-opacity-50 p-5 rounded-lg shadow-md border border-gray-600 transition-all duration-200 hover:bg-opacity-70">
									<div className="flex items-center mb-2">
										<i className="fas fa-user-tag text-blue-400 mr-2" />
										<h3 className="text-gray-300 text-sm font-medium">
											First Name
										</h3>
									</div>
									<p className="text-white text-lg ml-6">
										{contact?.first_name ?? ""}
									</p>
								</div>
								<div className="bg-gray-700 bg-opacity-50 p-5 rounded-lg shadow-md border border-gray-600 transition-all duration-200 hover:bg-opacity-70">
									<div className="flex items-center mb-2">
										<i className="fas fa-user-tag text-blue-400 mr-2" />
										<h3 className="text-gray-300 text-sm font-medium">
											Last Name
										</h3>
									</div>
									<p className="text-white text-lg ml-6">
										{contact?.last_name ?? ""}
									</p>
								</div>
							</div>
							<div className="bg-gray-700 bg-opacity-50 p-5 rounded-lg shadow-md border border-gray-600 transition-all duration-200 hover:bg-opacity-70">
								<div className="flex items-center mb-2">
									<i className="fas fa-envelope text-blue-400 mr-2" />
									<h3 className="text-gray-300 text-sm font-medium">
										Email
									</h3>
								</div>
								<p className="text-white text-lg ml-6">
									{contact?.email ?? ""}
								</p>
							</div>
							<div className="bg-gray-700 bg-opacity-50 p-5 rounded-lg shadow-md border border-gray-600 transition-all duration-200 hover:bg-opacity-70">
								<div className="flex items-center mb-2">
									<i className="fas fa-phone text-blue-400 mr-2" />
									<h3 className="text-gray-300 text-sm font-medium">
										Phone
									</h3>
								</div>
								<p className="text-white text-lg ml-6">
									{contact?.phone ?? ""}
								</p>
							</div>
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
									<div
										key={item.id}
										className="bg-gray-700 bg-opacity-50 p-5 rounded-lg shadow-md border border-gray-600 card-hover">
										<div className="flex items-center mb-3">
											<div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center mr-3 shadow-md">
												<i className="fas fa-home text-white" />
											</div>
											<h4 className="text-lg font-semibold text-white">
												Home Address
											</h4>
										</div>
										<div className="space-y-3 text-gray-300 ml-2 mb-4">
											<p className="flex items-center">
												<i className="fas fa-road text-gray-500 w-6" />
												<span className="font-medium w-24">
													Street:
												</span>
												<span>{item.street}</span>
											</p>
											<p className="flex items-center">
												<i className="fas fa-city text-gray-500 w-6" />
												<span className="font-medium w-24">
													City:
												</span>
												<span>{item.city}</span>
											</p>
											<p className="flex items-center">
												<i className="fas fa-map text-gray-500 w-6" />
												<span className="font-medium w-24">
													Province:
												</span>
												<span>{item.province}</span>
											</p>
											<p className="flex items-center">
												<i className="fas fa-flag text-gray-500 w-6" />
												<span className="font-medium w-24">
													Country:
												</span>
												<span>{item.country}</span>
											</p>
											<p className="flex items-center">
												<i className="fas fa-mailbox text-gray-500 w-6" />
												<span className="font-medium w-24">
													Postal Code:
												</span>
												<span>{item.postal_code}</span>
											</p>
										</div>
										<div className="flex justify-end space-x-3">
											<Link
												href={`${id}/addresses/${item.id}/edit`}
												className="px-4 py-2 bg-gradient text-white rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 font-medium shadow-md flex items-center">
												<i className="fas fa-edit mr-2" />{" "}
												Edit
											</Link>
											<button
												onClick={() =>
													handleAddressDelete(item.id)
												}
												className="px-4 py-2 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 font-medium shadow-md flex items-center">
												<i className="fas fa-trash-alt mr-2" />{" "}
												Delete
											</button>
										</div>
									</div>
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
								<i className="fas fa-user-edit mr-2" /> Edit
								Contact
							</Link>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
