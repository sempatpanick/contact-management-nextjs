import { MouseEventHandler } from "react";

interface ContactSectionPaginationProps {
	page: number;
	totalPage: number;
	pages: number[];
	onPrevious: () => void;
	onPageChange: (page: number) => void;
	onNext: () => void;
}

export default function ContactSectionPagination(
	props: ContactSectionPaginationProps
) {
	return (
		<>
			<div className="mt-10 flex justify-center">
				<nav className="flex items-center space-x-3 bg-gray-800 bg-opacity-80 rounded-xl shadow-custom border border-gray-700 p-3 animate-fade-in">
					{props.page > 1 && (
						<button
							onClick={props.onPrevious}
							className="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 flex items-center">
							<i className="fas fa-chevron-left mr-2" /> Previous
						</button>
					)}
					{props.pages.map(item => {
						if (item == props.page) {
							return (
								<button
									key={item}
									onClick={() => props.onPageChange(item)}
									className="px-4 py-2 bg-gradient text-white rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 font-medium shadow-md">
									{item}
								</button>
							);
						} else {
							return (
								<button
									key={item}
									onClick={() => props.onPageChange(item)}
									className="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200">
									{item}
								</button>
							);
						}
					})}
					{props.page < props.totalPage && (
						<button
							onClick={props.onNext}
							className="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 flex items-center">
							Next <i className="fas fa-chevron-right ml-2" />
						</button>
					)}
				</nav>
			</div>
		</>
	);
}
