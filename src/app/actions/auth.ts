// src/app/actions/auth.ts
"use server";

import {
  SignupFormSchema,
  LoginFormSchema,
  FormState,
} from "@/lib/definitions";
import { redirect } from "next/navigation";
import { getPrisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import { createSession, deleteSession } from "@/lib/session";

export async function signup(
  state: FormState,
  formData: FormData,
): Promise<FormState> {
  const validatedFields = SignupFormSchema.safeParse({
    name: formData.get("name"),
    username: formData.get("username"),
    password: formData.get("password"),
    role: formData.get("role"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing or invalid fields. Failed to register mutant.",
    };
  }

  const { name, username, password, role } = validatedFields.data;
  const prisma = getPrisma();

  try {
    const existingUser = await prisma.user.findUnique({
      where: { username },
    });

    if (existingUser) {
      return {
        message:
          "This username is already taken by another student or teacher.",
      };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        name,
        username,
        password: hashedPassword,
        role,
      },
    });
  } catch (error) {
    console.error("Database Error:", error);
    return {
      message:
        "Database Error: Failed to create user. The Cerebro connection failed.",
    };
  }

  redirect("/login");
}

export async function login(
  state: FormState,
  formData: FormData,
): Promise<FormState> {
  const validatedFields = LoginFormSchema.safeParse({
    username: formData.get("username"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Invalid username or password.",
    };
  }

  const { username, password } = validatedFields.data;
  const prisma = getPrisma();

  try {
    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user) {
      return { message: "Invalid username or password. Access denied." };
    }

    const passwordsMatch = await bcrypt.compare(password, user.password);

    if (!passwordsMatch) {
      return { message: "Invalid username or password. Access denied." };
    }

    // CREATE THE SESSION HERE
    await createSession(user.id, user.role);
  } catch (error) {
    console.error("Login Error:", error);
    return {
      message: "Something went wrong connecting to the database.",
    };
  }

  redirect("/");
}
export async function logout() {
  await deleteSession();
  redirect("/login");
}