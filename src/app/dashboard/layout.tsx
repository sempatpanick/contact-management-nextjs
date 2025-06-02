import DashboardLayout from "@/src/components/DashboardLayout";

export default function Layout({ children }: { children: React.ReactNode }) {
	return <>{DashboardLayout({ children })}</>;
}
