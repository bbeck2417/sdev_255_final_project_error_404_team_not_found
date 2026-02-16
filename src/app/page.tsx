"use client"; // Required for interactivity like forms and state

import { useState } from "react";

export default function Home() {
  // You can use state to manage the courses once you fetch them
  const [status, setStatus] = useState("");

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setStatus("Saving course...");

  //   // Logic to call your API route would go here
  //   // Example: const response = await fetch('/api/courses', { ... });
  // };

  return (
    <main className="flex flex-col items-center justify-start min-h-screen p-4 pt-24 text-white font-wolverine">
      <h1 className="text-2xl font-bold mb-6 text-yellow-400 font-wolverine">
        Course Management - Xavier&apos;s School for the Gifted
      </h1>

      <h2 className="text-xl mb-4 text-yellow-400 pt-24">Add a Course</h2>
      <div className="w-full max-w-md">
        <form className="flex flex-col gap-4">
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

          <button
            type="submit"
            className="bg-yellow-400 text-black font-bold py-2 rounded-md hover:bg-yellow-300 transition ease-in delay-100 hover:translate-y-1"
          >
            Add Course
          </button>
          {status && <p className="text-center mt-2 text-sm">{status}</p>}
        </form>
      </div>

      <h2 className="text-xl mt-8 text-yellow-400">All Courses</h2>
      {/* You'll eventually map through your database results here */}
      <div id="courses" className="mt-4">
        <p className="italic text-slate-400">No courses loaded yet.</p>
      </div>
    </main>
  );
}
