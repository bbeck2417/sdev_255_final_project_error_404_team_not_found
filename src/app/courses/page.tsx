// src/app/courses/page.tsx
export const dynamic = "force-dynamic";
export const runtime = "nodejs";

import CourseList from "./CourseList";
import CourseForm from "./CourseForm";
import { getPrisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { decrypt } from "@/lib/session";
import { redirect } from "next/navigation";

export default async function Courses() {
  // 1. Authenticate the user securely on the server
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("session")?.value;
  const session = await decrypt(sessionCookie);

  // If there's no valid session, kick them back to the login screen
  if (!session || !session.userId) {
    redirect("/login");
  }

  // Extract the role so we can pass it down to our components
  const userId = Number(session.userId);
  const userRole = session.role as string;
  const prisma = getPrisma();

  // 2. Fetch ONLY the teachers from the database for the dropdown
  const instructors = await prisma.user.findMany({
    where: { role: "TEACHER" },
    select: { id: true, name: true },
  });

  return (
    <main className="flex flex-col items-center justify-start min-h-screen p-4 pt-24 text-white font-wolverine">
      <h1 className="text-2xl font-bold mb-6 text-yellow-400 font-wolverine text-center">
        Course Management - Xavier&apos;s School for the Gifted
      </h1>

      {/* 3. Conditionally render the creation form ONLY for teachers */}
      {userRole === "TEACHER" && (
        <>
          <h2 className="text-xl mb-4 text-yellow-400 pt-10">Add a Course</h2>
          <CourseForm instructors={instructors} />
        </>
      )}

      <h2 className="text-xl mt-12 mb-4 text-yellow-400">All Courses</h2>

      {/* 4. Pass the role down so the list knows whether to show edit/delete buttons */}
      <CourseList
        instructors={instructors}
        userRole={userRole}
        userId={userId}
      />
    </main>
  );
}
