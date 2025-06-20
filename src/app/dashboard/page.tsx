import { auth0 } from "@/lib/auth0";
import { redirect } from "next/navigation";
import UserDashboard from "../../components/dashboards/UserDashboard";
// import AdminDashboard from "../../components/dashboards/AdminDashboard";

const ROLES_NAMESPACE = "https://localhost:3000/roles";

export default async function DashboardPage() {
  const session = await auth0.getSession();

  // Eğer oturum yoksa, kullanıcıyı login sayfasına yönlendir
  if (!session?.user) {
    redirect("/auth/login");
  }

  // Kullanıcı ve rol bilgilerini çek
  const user = session.user;
  const roles = (user[ROLES_NAMESPACE] as string[]) || [];
  const isAdmin = roles.includes("admin");

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">
        Hoş Geldin, {user.name || user.nickname}!
      </h1>
      <p className="text-gray-600 mb-8">
        Bu panelden hesap bilgilerine ve sepetine erişebilirsin!
      </p>

      {/* Geçici olarak kalacak */}
      <UserDashboard user={user} />

      {/* Rol Kontrolü */}
      {/* {isAdmin ? (
        <AdminDashboard user={user} />
      ) : (
        <UserDashboard user={user} />
      )} */}
    </div>
  );
}
