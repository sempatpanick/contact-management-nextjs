import DashboardLayout from "@/src/components/Layouts/DashboardLayout";

export default function Layout({ children }: { children: React.ReactNode }) {
	return <>{DashboardLayout({ children })}</>;
}
