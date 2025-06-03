import AuthLayout from "@/src/components/Layouts/AuthLayout";

export default function Layout({ children }: { children: React.ReactNode }) {
	return <>{AuthLayout({ children })}</>;
}
