// src/app/ui/signup-form.tsx
"use client";

import { useActionState, useState } from "react";
import { signup } from "@/app/actions/auth";

export function SignupForm() {
  const [state, action, pending] = useActionState(signup, undefined);

  // Track password state for real-time validation
  const [password, setPassword] = useState("");

  // Real-time boolean checks
  const hasLength = password.length >= 8;
  const hasLetter = /[a-zA-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);

  return (
    <form
      action={action}
      className="space-y-6 p-8 mt-22 bg-slate-800 border border-yellow-400 rounded-lg shadow-2xl text-yellow-400"
    >
      <h2 className="text-3xl font-bold mb-6 text-center tracking-wider">
        Mutant Registration
      </h2>

      <div>
        <label htmlFor="name" className="block text-sm font-bold">
          Full Name
        </label>
        <input
          id="name"
          name="name"
          placeholder="Scott Summers"
          required
          className="mt-1 block w-full border border-slate-600 bg-slate-900 text-white rounded-md p-3 focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 placeholder:text-slate-500 font-sans"
        />
        {state?.errors?.name && (
          <p className="text-sm text-red-400 mt-1">{state.errors.name}</p>
        )}
      </div>

      <div>
        <label htmlFor="username" className="block text-sm font-bold">
          Username
        </label>
        <input
          id="username"
          name="username"
          type="text"
          required
          placeholder="Enter your username"
          className="mt-1 block w-full border border-slate-600 bg-slate-900 text-white rounded-md p-3 focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 placeholder:text-slate-500 font-sans"
        />
        {state?.errors?.username && (
          <p className="text-sm text-red-400 mt-1">{state.errors.username}</p>
        )}
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-bold">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-1 block w-full border border-slate-600 bg-slate-900 text-white rounded-md p-3 focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 font-sans"
        />

        {/* Real-time Validation Checklist */}
        <div className="mt-3 text-sm bg-slate-900 p-3 rounded-md border border-slate-700">
          <p className="font-semibold mb-1 text-slate-300">
            Password requirements:
          </p>
          <ul className="space-y-1 font-sans">
            <li
              className={`flex items-center gap-2 ${hasLength ? "text-green-400" : "text-slate-400"}`}
            >
              <span>{hasLength ? "✓" : "○"}</span> At least 8 characters
            </li>
            <li
              className={`flex items-center gap-2 ${hasLetter ? "text-green-400" : "text-slate-400"}`}
            >
              <span>{hasLetter ? "✓" : "○"}</span> Contains a letter
            </li>
            <li
              className={`flex items-center gap-2 ${hasNumber ? "text-green-400" : "text-slate-400"}`}
            >
              <span>{hasNumber ? "✓" : "○"}</span> Contains a number
            </li>
          </ul>
        </div>

        {/* Server-side fallback errors */}
        {state?.errors?.password && !password && (
          <p className="text-sm text-red-400 mt-2">
            Please meet all password requirements.
          </p>
        )}
      </div>

      <div>
        <label htmlFor="role" className="block text-sm font-bold">
          Role
        </label>
        <select
          id="role"
          name="role"
          className="mt-1 block w-full border border-slate-600 bg-slate-900 text-white rounded-md p-3 focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 font-sans"
        >
          <option value="STUDENT">Student</option>
          <option value="TEACHER">Teacher</option>
        </select>
        {state?.errors?.role && (
          <p className="text-sm text-red-400 mt-1">{state.errors.role}</p>
        )}
      </div>

      {state?.message && (
        <p className="text-sm text-red-400 font-medium text-center">
          {state.message}
        </p>
      )}

      <button
        type="submit"
        disabled={pending || !hasLength || !hasLetter || !hasNumber}
        className="w-full bg-yellow-500 text-slate-900 font-bold py-3 px-4 rounded-md hover:bg-yellow-400 disabled:opacity-50 transition-colors uppercase tracking-widest mt-4"
      >
        {pending ? "Registering..." : "Enroll"}
      </button>
    </form>
  );
}
