import { NextRequest } from "next/server";
import { getCurrentUser } from "./auth";

export function requireAdmin(req: NextRequest) {
  const user = getCurrentUser(req);

  if (!user) {
    throw new Error("Unauthorized");
  }

  if (user.role !== "ADMIN") {
    throw new Error("Admin access required");
  }

  return user;
}