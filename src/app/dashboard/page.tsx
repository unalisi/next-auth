import { auth0 } from "@/lib/auth0"; 
import { isUserAdmin } from "@/src/actions/isUserAdmin"; 

import { redirect } from "next/navigation";
import UserDashboard from "../../components/dashboards/UserDashboard";
import AdminDashboard from "../../components/dashboards/AdminDashboard";

export default async function DashboardPage() {
  
  // Oturumu, kendi auth0 istemcimiz üzerinden alıyoruz.
  const session = await auth0.getSession();

  if (!session?.user) {
    redirect("/auth/login");
  }

  const user = session.user;
  
  // Rol kontrolü
  const isAdmin = await isUserAdmin();

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          Hoş Geldin, {user.name || user.nickname}!
        </h1>
        <p className="text-lg text-gray-600">
          Bu panelden hesap bilgilerine ve sepetine erişebilirsin!
        </p>
      </div>

      {isAdmin ? (
        <AdminDashboard user={user} />
      ) : (
        <UserDashboard user={user} />
      )}
    </div>
  );
}