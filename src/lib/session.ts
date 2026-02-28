import "server-only";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const secretKey = process.env.SESSION_SECRET;
const encodedKey = new TextEncoder().encode(secretKey);

// 1. Encrypt the payload into a JWT
export async function encrypt(payload: any) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d") // Session lasts for 7 days
    .sign(encodedKey);
}

// 2. Decrypt the JWT to read the user data
export async function decrypt(session: string | undefined = "") {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    return null;
  }
}

// 3. Create the cookie and set it in the browser
export async function createSession(userId: number, role: string) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const session = await encrypt({ userId, role, expiresAt });

  const cookieStore = await cookies();

  cookieStore.set("session", session, {
    httpOnly: true, // Prevents JavaScript from reading the cookie (XSS protection)
    secure: process.env.NODE_ENV === "production", // Only sends over HTTPS in production
    expires: expiresAt,
    sameSite: "lax", // CSRF protection
    path: "/",
  });
}

// 4. Delete the cookie (for logging out)
export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete("session");
}
