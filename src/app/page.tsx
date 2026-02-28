import { getPrisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { decrypt } from "@/lib/session";
import { redirect } from "next/navigation";

export default async function Home() {
  // 1. Get the session securely on the server
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("session")?.value;
  const session = await decrypt(sessionCookie);

  // Fallback protection in case middleware misses something
  if (!session || !session.userId) {
    redirect("/login");
  }

  const prisma = getPrisma();
  const userId = Number(session.userId);
  const role = session.role;

  // ==========================================
  // TEACHER VIEW
  // ==========================================
  if (role === "TEACHER") {
    // Fetch courses taught by this teacher, and include the enrolled students
    const courses = await prisma.course.findMany({
      where: { instructorId: userId },
      include: {
        enrollments: {
          include: {
            student: true,
          },
        },
      },
    });

    return (
      <div className="flex flex-col items-center p-8 font-science-gothic text-xl min-h-[calc(100vh-100px)]">
        <h1 className="text-4xl text-yellow-400 mb-8 tracking-widest uppercase">
          Instructor Terminal
        </h1>
        <div className="w-full max-w-4xl space-y-6">
          {courses.length === 0 ? (
            <p className="italic text-slate-400 text-center">
              You are not currently assigned to any classes.
            </p>
          ) : (
            courses.map((course) => (
              <div
                key={course.courseId}
                className="border border-yellow-400 p-6 rounded-lg bg-slate-800 text-yellow-400 shadow-xl"
              >
                <div className="flex justify-between items-start border-b border-slate-600 pb-4 mb-4">
                  <div>
                    <h3 className="text-2xl font-bold">{course.className}</h3>
                    <p className="text-sm font-sans text-slate-300 mt-1">
                      {course.description}
                    </p>
                  </div>
                  <div className="text-right text-sm">
                    <span className="block text-slate-300">
                      Subject: {course.subject}
                    </span>
                    <span className="block text-slate-300">
                      Credits: {course.creditHours}
                    </span>
                  </div>
                </div>

                <h4 className="text-lg font-bold mb-3 text-white">
                  Enrolled Mutants:
                </h4>
                {course.enrollments.length === 0 ? (
                  <p className="text-sm text-slate-400 italic">
                    No students enrolled yet.
                  </p>
                ) : (
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {course.enrollments.map((enrollment) => (
                      <li
                        key={enrollment.id}
                        className="bg-slate-900 p-3 rounded border border-slate-700 font-sans text-sm text-white flex justify-between"
                      >
                        <span>{enrollment.student.name}</span>
                        <span className="text-slate-400">
                          @{enrollment.student.username}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    );
  }

  // ==========================================
  // STUDENT VIEW
  // ==========================================
  // Fetch enrollments for this student, including the course and instructor details
  const enrollments = await prisma.enrollment.findMany({
    where: { studentId: userId },
    include: {
      course: {
        include: {
          instructor: true,
        },
      },
    },
  });

  return (
    <div className="flex flex-col items-center p-8 font-science-gothic text-xl min-h-[calc(100vh-100px)]">
      <h1 className="text-4xl text-yellow-400 mb-8 tracking-widest uppercase">
        My Course Schedule
      </h1>
      <div className="w-full max-w-2xl space-y-4">
        {enrollments.length === 0 ? (
          <p className="italic text-slate-400 text-center">
            You have not enrolled in any classes yet.
          </p>
        ) : (
          enrollments.map((enrollment) => (
            <div
              key={enrollment.id}
              className="border border-yellow-400 p-5 rounded-lg bg-slate-800 text-yellow-400 shadow-xl"
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-2xl font-bold">
                  {enrollment.course.className}
                </h3>
                <span className="text-sm bg-yellow-500 text-slate-900 px-2 py-1 rounded font-bold">
                  {enrollment.course.creditHours} Credits
                </span>
              </div>
              <p className="text-sm font-sans text-slate-300 mb-4">
                {enrollment.course.description}
              </p>
              <div className="flex justify-between items-center text-sm border-t border-slate-600 pt-3">
                <span className="text-slate-300">
                  Subject: {enrollment.course.subject}
                </span>
                <span className="text-white font-bold">
                  Instructor: Prof. {enrollment.course.instructor.name}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
