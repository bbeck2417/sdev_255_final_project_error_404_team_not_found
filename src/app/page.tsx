"use client"; // Required for interactivity like forms and state

import { useState, useEffect, FormEvent } from "react";

interface Instructor {
  id: number
  name: string
  role: "TEACHER" | "STUDENT"
}

interface Course {
  courseId: number
  className: string
  description: string
  subject: string
  creditHours: number
  instructorId: number
  instructor: Instructor
}


export default function Home() {
  // You can use state to manage the courses once you fetch them
  const [status, setStatus] = useState("");
  const [courses, setCourses] = useState<Course[]>([])

  //fetch courses
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch("/api/courses")
        if (!res.ok) throw new Error("Failed to fetch courses")
        const data: Course[] = await res.json()
        setCourses(data)
      } catch (err) {
        console.error(err)
        setStatus("Error loading courses")
      }
    }
    fetchCourses()
  }, [])

  //submit handler
  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus("Saving course...")

    const form = e.currentTarget as HTMLFormElement
    const formData = new FormData(form)

    //gathering info from page
    const courseData = {
      className: formData.get("nameOfClass"),
      description: formData.get("description"),
      subject: formData.get("subject"),
      creditHours: Number(formData.get("creditHours")),
    }

    const response = await fetch("/api/courses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(courseData),
    })

    //checks for good send and resets form
    if (response.ok) {
      setStatus("Course added successfully!")
      form.reset()
    } else {
      const errorData = await response.json()
      setStatus(errorData.error || "Something went wrong")
    }
  }

  return (
    <main className="flex flex-col items-center justify-start min-h-screen p-4 pt-24 text-white font-wolverine">
      <h1 className="text-2xl font-bold mb-6 text-yellow-400 font-wolverine">
        Course Management - Xavier&apos;s School for the Gifted
      </h1>

      <h2 className="text-xl mb-4 text-yellow-400 pt-24">Add a Course</h2>
      <div className="w-full max-w-md">
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
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
        {courses.length === 0 ? (
          <p className="italic text-slate-400">No courses loaded yet.</p>
        ) : (
          courses.map((course) => (
            <div key={course.courseId} className="border p-4 rounded bg-slate-700">
              <h3 className="font-bold text-yellow-400">{course.className}</h3>
              <p>

              </p>
              <p>{course.description}</p>
              <p>
                <span className="font-semibold">Subject:</span> {course.subject} |{" "}
                <span className="font-semibold">Credits:</span> {course.creditHours}
              </p>
            </div>
          ))
        )}
      </div>
    </main>
  );
}
