"use client";

import UserDashboard from "./UserDashboard";

// NextAuth session.user nesnesi
interface DashboardProps {
  user: {
    id?: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    role?: string;
  }; 
}

export default function AdminDashboard({ user }: DashboardProps) {
  return (
    <div className="space-y-12">
      <UserDashboard user={user} />
      

      <div className="mt-8 text-center border-t-4 border-red-500 pt-8">
        <h2 className="text-3xl font-bold text-red-600">Admin Paneli Aktif</h2>
        <p className="text-gray-600 mt-2">
          Bu ek bölüm, &quot;admin&quot; rolüne sahip olduğunuz için gösterilmektedir.
        </p>
        <b>Veritabanı bağlantıları yapılan senaryoda Admin ürün ekleme-çıkartma işlemlerini bu panelden kontrol edebilir. </b>

      </div>
    </div>
  );
}