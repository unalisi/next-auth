"use server";

import { createAccessToken } from "./createAccessToken";
import { auth0 } from "@/lib/auth0"; 

type Role = {
  id: string;
  name: string;
  description: string;
};

// Get the roles for the current user in Auth0 Management API
export async function getUsersRoles(): Promise<Role[]> {
  // Oturumu, kendi auth0 istemcimiz üzerinden alıyoruz
  const session = await auth0.getSession();
  const user = session?.user;

  if (!user?.sub) {
    throw new Error("User not authenticated or user ID is missing.");
  }

  const token = await createAccessToken();

  const response = await fetch(
    `${process.env.AUTH0_ISSUER_BASE_URL}/api/v2/users/${user.sub}/roles`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: 'no-store'
    }
  );

  if (!response.ok) {
    const errorBody = await response.text();
    console.error("Roller getirilemedi. Status:", response.status, "Body:", errorBody);
    throw new Error("Failed to fetch user roles");
  }

  const data: Role[] = await response.json();
  return data;
}