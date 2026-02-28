// src/app/courses/CourseForm.tsx
"use client";

import { createCourse } from "./actions";
import { useState } from "react";


// Define the shape of the data coming from the server
type Instructor = {
  id: number;
  name: string | null;
};

export default function CourseForm({
  instructors,
}: {
  instructors: Instructor[];
}) {
  const [status, setStatus] = useState("");

  return (
    <div className="w-full max-w-md">
      <form action={createCourse} className="flex flex-col gap-4">
        <label className="text-sm font-semibold text-yellow-400">
          Course Name:
        </label>
        <input
          name="nameOfClass"
          placeholder="e.g., Mind Reading"
          className="border border-yellow-400 p-2 rounded text-xl text-yellow-400 bg-slate-800"
          required
        />

        <label className="text-sm font-semibold text-yellow-400">
          Course Description:
        </label>
        <textarea
          name="description"
          placeholder="e.g., Honing the powers of mind reading"
          className="border border-yellow-400 p-2 rounded text-xl text-yellow-400 bg-slate-800"
          required
        ></textarea>

        <label className="text-sm font-semibold text-yellow-400">
          Subject Area:
        </label>
        <input
          name="subject"
          placeholder="e.g., Telepathy"
          className="border border-yellow-400 p-2 rounded text-xl text-yellow-400 bg-slate-800"
          required
        />

        <div className="flex gap-4">
          <div className="flex flex-col flex-1 gap-1">
            <label className="text-sm font-semibold text-yellow-400">
              Credits
            </label>
            <input
              name="creditHours"
              type="number"
              placeholder="3"
              className="border border-yellow-400 p-2 rounded text-xl text-yellow-400 bg-slate-800"
              required
            />
          </div>

          <div className="flex flex-col flex-1 gap-1">
            <label className="text-sm font-semibold text-yellow-400">
              Instructor
            </label>
            <select
              name="instructorId"
              defaultValue=""
              className="border border-yellow-400 p-2 rounded text-xl text-yellow-400 bg-slate-800"
              required
            >
              <option value="" disabled>
                Select a mutant...
              </option>
              {instructors.map((instructor) => (
                <option key={instructor.id} value={instructor.id}>
                  {instructor.name || `Unknown (ID: ${instructor.id})`}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          type="submit"
          className="bg-yellow-400 text-black font-bold py-2 rounded-md hover:bg-yellow-300 transition ease-in delay-100 hover:translate-y-1 mt-2"
        >
          Add Course
        </button>
        {status && <p className="text-center mt-2 text-sm">{status}</p>}
      </form>
    </div>
  );
}
