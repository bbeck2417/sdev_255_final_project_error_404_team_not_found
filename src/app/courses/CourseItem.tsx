// src/app/courses/CourseItem.tsx
"use client";

import type { Course } from "@prisma/client";
import { useState } from "react";
import {
  deleteCourse,
  editCourse,
  enrollInCourse,
  dropCourse,
} from "./actions";

type Instructor = {
  id: number;
  name: string | null;
};

// Enrollment type to match your Prisma schema
type Enrollment = {
  studentId: number;
  courseId: number;
};

type CourseItemProps = {
  // Update: Course now includes instructor AND enrollments
  course: Course & { instructor?: Instructor; enrollments: Enrollment[] };
  instructors: Instructor[];
  userRole: string;
  userId: number;
};

export default function CourseItem({
  course,
  instructors,
  userRole,
  userId, // Destructure the new prop
}: CourseItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // Bind the actions with the specific course ID
  const editCourseWithId = editCourse.bind(null, course.courseId);
  const deleteCourseWithId = deleteCourse.bind(null, course.courseId);
  const enrollWithId = enrollInCourse.bind(null, course.courseId);
  const dropWithId = dropCourse.bind(null, course.courseId);

  // Check if the current student is already in the enrollments list
  const isEnrolled = course.enrollments.some((e) => e.studentId === userId);

  return (
    <div className="border border-yellow-400 p-4 rounded text-yellow-400 bg-slate-800 shadow-lg">
      {isEditing ? (
        <form
          action={editCourseWithId}
          onSubmit={() => setIsEditing(false)}
          className="flex flex-col gap-4"
        >
          {/* ... (Keep your existing edit form exactly as it is) ... */}
          <label className="text-sm font-semibold text-yellow-400">
            Course Name:
          </label>
          <input
            name="nameOfClass"
            defaultValue={course.className}
            className="..."
            required
          />
          <label className="text-sm font-semibold text-yellow-400">
            Description:
          </label>
          <textarea
            name="description" // Matches formData.get("description")
            defaultValue={course.description}
            className="border border-yellow-400 p-2 rounded text-white bg-slate-900"
            required
          />

          <label className="text-sm font-semibold text-yellow-400">
            Subject:
          </label>
          <input
            name="subject" // Matches formData.get("subject")
            defaultValue={course.subject}
            className="border border-yellow-400 p-2 rounded text-white bg-slate-900"
            required
          />

          <div className="flex gap-4">
            <div className="flex flex-col flex-1">
              <label className="text-sm font-semibold text-yellow-400">
                Credits
              </label>
              <input
                name="creditHours" // Matches formData.get("creditHours")
                type="number"
                defaultValue={course.creditHours}
                className="border border-yellow-400 p-2 rounded text-white bg-slate-900"
                required
              />
            </div>
            <div className="flex flex-col flex-1">
              <label className="text-sm font-semibold text-yellow-400">
                Instructor
              </label>
              <select
                name="instructorId" // Matches formData.get("instructorId")
                defaultValue={course.instructorId}
                className="border border-yellow-400 p-2 rounded text-white bg-slate-900"
                required
              >
                {instructors.map((inst) => (
                  <option key={inst.id} value={inst.id}>
                    {inst.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-2 mt-4 border-t border-slate-600 pt-4">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="..."
            >
              Cancel
            </button>
            <button type="submit" className="...">
              Update Course
            </button>
          </div>
        </form>
      ) : (
        <>
          <div className="flex justify-between items-start">
            <h3 className="text-lg font-bold">{course.className}</h3>

            {/* TEACHER CONTROLS */}
            {userRole === "TEACHER" && (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsEditing(true)}
                  className="text-xs bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-500 transition font-sans"
                >
                  Edit
                </button>
                <form action={deleteCourseWithId}>
                  <button
                    onClick={() => setShowConfirm(true)}
                    className="text-xs bg-red-600 text-white px-2 py-1 rounded hover:bg-red-500 transition font-sans"
                  >
                    Delete
                  </button>
                </form>
              </div>
            )}

            {/* STUDENT CONTROLS */}
            {userRole === "STUDENT" && (
              <div className="flex items-center gap-2">
                {isEnrolled ? (
                  <form action={dropWithId}>
                    <button
                      type="submit"
                      className="text-xs bg-red-600 text-white px-3 py-1 rounded hover:bg-red-500 transition font-bold uppercase tracking-tighter"
                    >
                      Drop Class
                    </button>
                  </form>
                ) : (
                  <form action={enrollWithId}>
                    <button
                      type="submit"
                      className="text-xs bg-green-600 text-white px-3 py-1 rounded hover:bg-green-500 transition font-bold uppercase tracking-tighter"
                    >
                      Enroll
                    </button>
                  </form>
                )}
              </div>
            )}
          </div>

          <p className="text-sm my-3 font-sans text-slate-200">
            {course.description}
          </p>

          <div className="flex flex-col gap-1 mt-2 text-xs font-sans text-slate-300 border-t border-slate-600 pt-2">
            <div className="flex justify-between">
              <span>Subject: {course.subject}</span>
              <span>Credits: {course.creditHours}</span>
            </div>

            <div className="text-yellow-500 font-bold mt-1">
              Instructor: Prof. {course.instructor?.name || "Unknown"}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
