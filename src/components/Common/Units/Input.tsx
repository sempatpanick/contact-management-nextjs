import { ChangeEventHandler, HTMLInputTypeAttribute } from "react";

interface InputProps {
	type?: HTMLInputTypeAttribute | undefined;
	id?: string | undefined;
	name?: string | undefined;
	placeholder?: string | undefined;
	value?: string | number | readonly string[] | undefined;
	onChange?: ChangeEventHandler<HTMLInputElement> | undefined;
	disabled?: boolean | undefined;
	required?: boolean | undefined;
}

export default function Input(props: InputProps) {
	return (
		<input
			type={props.type}
			id={props.id}
			name={props.name}
			className="w-full pl-10 pr-3 py-3 bg-gray-700 bg-opacity-50 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
			placeholder={props.placeholder}
			value={props.value}
			onChange={props.onChange}
			disabled={props.disabled}
			required={props.required}
		/>
	);
}
