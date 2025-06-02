import Swal from "sweetalert2";

export const alertSuccess = async (message: string) => {
	return Swal.fire({
		icon: "success",
		title: "Success",
		text: message,
		confirmButtonText: "OK",
		customClass: {
			popup: "bg-gray-800 text-white rounded-lg shadow-lg",
			title: "text-xl font-bold",
			htmlContainer: "text-gray-300",
			confirmButton:
				"bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded",
		},
	});
};

export const alertError = async (message: string) => {
	return Swal.fire({
		icon: "error",
		title: "Error",
		text: message,
		confirmButtonText: "OK",
		customClass: {
			popup: "bg-gray-800 text-white rounded-lg shadow-lg",
			title: "text-xl font-bold",
			htmlContainer: "text-gray-300",
			confirmButton:
				"bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded",
		},
	});
};

export const alertConfirm = async (message: string) => {
	const result = await Swal.fire({
		icon: "question",
		title: "Are you sure?",
		text: message,
		showCancelButton: true,
		cancelButtonColor: "#3085D6",
		confirmButtonColor: "#D33",
		confirmButtonText: "Yes",
	});

	return result.isConfirmed;
};
