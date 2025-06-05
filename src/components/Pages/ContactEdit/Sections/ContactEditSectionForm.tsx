import InputWithLabel from "@/src/components/Common/InputWithLabel";
import Link from "next/link";
import { ChangeEventHandler, FormEventHandler } from "react";

interface ContactEditSectionFormProps {
	handleSubmit: FormEventHandler;
	inputFirstName: {
		value?: string | number | readonly string[] | undefined;
		onChange?: ChangeEventHandler<HTMLInputElement> | undefined;
	};
	inputLastName: {
		value?: string | number | readonly string[] | undefined;
		onChange?: ChangeEventHandler<HTMLInputElement> | undefined;
	};
	inputEmail: {
		value?: string | number | readonly string[] | undefined;
		onChange?: ChangeEventHandler<HTMLInputElement> | undefined;
	};
	inputPhone: {
		value?: string | number | readonly string[] | undefined;
		onChange?: ChangeEventHandler<HTMLInputElement> | undefined;
	};
}

export default function ContactEditSectionForm(
	props: ContactEditSectionFormProps
) {
	return (
		<>
			<form onSubmit={props.handleSubmit}>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
					<InputWithLabel
						icon="fa-user-tag"
						label="First Name"
						input={{
							type: "text",
							id: "first_name",
							name: "first_name",
							placeholder: "Enter first name",
							value: props.inputFirstName.value,
							onChange: props.inputFirstName.onChange,
							required: true,
						}}
					/>
					<InputWithLabel
						icon="fa-user-tag"
						label="Last Name"
						input={{
							type: "text",
							id: "last_name",
							name: "last_name",
							placeholder: "Enter last name",
							value: props.inputLastName.value,
							onChange: props.inputLastName.onChange,
							required: true,
						}}
					/>
				</div>
				<div className="mb-5">
					<InputWithLabel
						icon="fa-envelope"
						label="Email"
						input={{
							type: "email",
							id: "email",
							name: "email",
							placeholder: "Enter email address",
							value: props.inputEmail.value,
							onChange: props.inputEmail.onChange,
							required: true,
						}}
					/>
				</div>
				<div className="mb-6">
					<InputWithLabel
						icon="fa-phone"
						label="Phone"
						input={{
							type: "tel",
							id: "phone",
							name: "phone",
							placeholder: "Enter phone number",
							value: props.inputPhone.value,
							onChange: props.inputPhone.onChange,
							required: true,
						}}
					/>
				</div>
				<div className="flex justify-end space-x-4">
					<Link
						href={"/dashboard/contacts"}
						className="px-5 py-3 bg-gray-700 text-white rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 flex items-center shadow-md">
						<i className="fas fa-times mr-2" /> Cancel
					</Link>
					<button
						type="submit"
						className="px-5 py-3 bg-gradient text-white rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 font-medium shadow-lg transform hover:-translate-y-0.5 flex items-center">
						<i className="fas fa-save mr-2" /> Save Changes
					</button>
				</div>
			</form>
		</>
	);
}
