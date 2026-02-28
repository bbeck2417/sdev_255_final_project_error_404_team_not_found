// src/app/courses/CourseList.tsx
import { getPrisma } from "@/lib/prisma";
import CourseItem from "./CourseItem";

type Instructor = {
  id: number;
  name: string | null;
};

export default async function CourseList({
  instructors,
  userRole,
  userId, // Destructure userId here
}: {
  instructors: Instructor[];
  userRole: string;
  userId: number; // Add this line
}) {
  const prisma = getPrisma();

  const courses = await prisma.course.findMany({
    include: {
      instructor: true,
      enrollments: true,
    },
  });

  return (
    <div id="courses" className="mt-4 grid grid-cols-1 gap-4 w-full max-w-md">
      {courses.length === 0 ? (
        <p className="italic text-slate-400">No courses loaded yet.</p>
      ) : (
        courses.map((course) => (
          <CourseItem
            key={course.courseId}
            course={course}
            instructors={instructors}
            userRole={userRole}
            userId={userId} // Pass it down
          />
        ))
      )}
    </div>
  );
}
