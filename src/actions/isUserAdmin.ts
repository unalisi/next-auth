"use server";

import { getUsersRoles } from "./getUsersRoles";

export async function isUserAdmin(): Promise<boolean> {
  try {
    const roles = await getUsersRoles();
    // console.log("KONTROL EDİLEN ROLLER:", roles);
    
    // Auth0'daki rol adı "Admin" olduğu için büyük/küçük harf duyarsız kontrolü
    return roles.some((role) => role.name.toLowerCase() === "admin");

  } catch (error) {
    // Hata durumunda admin değil olarak kabul et
    console.error("Admin durumu kontrol edilirken hata:", error);
    return false; 
  }
}