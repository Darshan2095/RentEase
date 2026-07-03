import { NextRequest } from "next/server";
import { verifyToken } from "@/lib/jwt";

export function getCurrentUser(
  req: NextRequest
) {
  const token =
    req.cookies.get("token")?.value;

  if (!token) {
    throw new Error("Unauthorized");
  }

  const user = verifyToken(token);

  return user as {
    userId: string;
    email: string;
    role: "USER" | "ADMIN";
  };
}