import AuthLayout from "@/src/components/AuthLayout";

export default function Layout({ children }: { children: React.ReactNode }) {
	return <>{AuthLayout({ children })}</>;
}
