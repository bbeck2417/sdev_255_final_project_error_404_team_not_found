// src/app/courses/actions.ts
"use server";

import { getPrisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { decrypt } from "@/lib/session";

const prisma = getPrisma();

// Helper function to lock down the backend
async function verifyTeacherClearance() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("session")?.value;
  const session = await decrypt(sessionCookie);

  // If there's no session, or the role isn't exactly "TEACHER", reject the request
  if (!session || session.role !== "TEACHER") {
    throw new Error(
      "Unauthorized access. Only instructors can modify Cerebro records.",
    );
  }
}

export async function createCourse(formData: FormData) {
  // 1. Check clearance before doing ANYTHING else
  await verifyTeacherClearance();

  const className = formData.get("nameOfClass") as string;
  const description = formData.get("description") as string;
  const subject = formData.get("subject") as string;
  const creditHours = parseInt(formData.get("creditHours") as string);
  const instructorId = parseInt(formData.get("instructorId") as string);

  await prisma.course.create({
    data: { className, description, subject, creditHours, instructorId },
  });

  revalidatePath("/courses");
}

export async function deleteCourse(id: number) {
  // 1. Check clearance
  await verifyTeacherClearance();

  try {
    await prisma.course.delete({
      where: {
        courseId: id,
      },
    });
    revalidatePath("/courses");
  } catch (error) {
    return { error: "Failed to delete the course." };
  }
}

export async function editCourse(id: number, formData: FormData) {
  await verifyTeacherClearance();

  // These MUST match the 'name' attributes in your CourseItem.tsx inputs
  const className = formData.get("nameOfClass") as string;
  const description = formData.get("description") as string;
  const subject = formData.get("subject") as string;

  // Use Number() to safely handle numeric conversion
  const creditHours = Number(formData.get("creditHours"));
  const instructorId = Number(formData.get("instructorId"));

  // Safety check for numeric values
  if (isNaN(creditHours) || isNaN(instructorId)) {
    console.error("Value Error: creditHours or instructorId is NaN");
    return { error: "Invalid numeric input for credits or instructor." };
  }

  try {
    await prisma.course.update({
      where: { courseId: id },
      data: {
        className,
        description,
        subject,
        creditHours,
        instructorId,
      },
    });
    revalidatePath("/courses");
  } catch (error) {
    console.error("Prisma Update Error:", error);
    return { error: "Failed to update course records." };
  }
}
async function verifyStudentClearance() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("session")?.value;
  const session = await decrypt(sessionCookie);

  if (!session || session.role !== "STUDENT") {
    throw new Error("Unauthorized: Only students can manage enrollments.");
  }
  return Number(session.userId);
}

export async function enrollInCourse(courseId: number) {
  const studentId = await verifyStudentClearance();

  try {
    await prisma.enrollment.create({
      data: {
        studentId,
        courseId,
      },
    });
    revalidatePath("/");
    revalidatePath("/courses");
  } catch (error) {
    return { error: "You are already enrolled in this class." };
  }
}

export async function dropCourse(courseId: number) {
  const studentId = await verifyStudentClearance();

  try {
    await prisma.enrollment.delete({
      where: {
        studentId_courseId: {
          studentId,
          courseId,
        },
      },
    });
    revalidatePath("/");
    revalidatePath("/courses");
  } catch (error) {
    return { error: "Failed to drop the course." };
  }
}