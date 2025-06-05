import { ChangeEventHandler, HTMLInputTypeAttribute } from "react";
import Input from "./Units/Input";

interface InputWithLabelProps {
	icon: string;
	label: string;
	input: {
		type?: HTMLInputTypeAttribute | undefined;
		id?: string | undefined;
		name?: string | undefined;
		placeholder?: string | undefined;
		value?: string | number | readonly string[] | undefined;
		onChange?: ChangeEventHandler<HTMLInputElement> | undefined;
		disabled?: boolean | undefined;
		required?: boolean | undefined;
	};
}

export default function InputWithLabel(props: InputWithLabelProps) {
	return (
		<div>
			<label
				htmlFor={props.input.name}
				className="block text-gray-300 text-sm font-medium mb-2">
				{props.label}
			</label>
			<div className="relative">
				<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
					<i className={`fas ${props.icon} text-gray-500`} />
				</div>
				<Input
					type={props.input.type}
					id={props.input.id}
					name={props.input.name}
					placeholder={props.input.placeholder}
					value={props.input.value}
					onChange={props.input.onChange}
					disabled={props.input.disabled}
					required={props.input.required}
				/>
			</div>
		</div>
	);
}
