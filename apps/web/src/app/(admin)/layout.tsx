import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import AdminSidebar from "@/components/admin/sidebar";
import { ToastProviderWrapper } from "@/components/providers/ToastProviderWrapper";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  // Only allow admins
  if (session.user.role !== "ADMIN") {
    redirect("/dashboard");
  }

  return (
    <ToastProviderWrapper>
      <div className="flex min-h-screen">
        <AdminSidebar user={session.user} />
        <main className="flex-1 lg:ml-64">
          <div className="p-4 lg:p-8">{children}</div>
        </main>
      </div>
    </ToastProviderWrapper>
  );
}
