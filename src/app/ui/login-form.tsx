// src/app/ui/login-form.tsx
"use client";

import { useActionState } from "react";
import { login } from "@/app/actions/auth";
import Link from "next/link";

export function LoginForm() {
  const [state, action, pending] = useActionState(login, undefined);

  return (
    <form
      action={action}
      className="space-y-6 p-8 bg-slate-800 border border-yellow-400 rounded-lg shadow-2xl text-yellow-400"
    >
      <h2 className="text-3xl font-bold mb-6 text-center tracking-wider">
        Cerebro Access
      </h2>

      <div>
        <label htmlFor="username" className="block text-sm font-bold">
          Username
        </label>
        <input
          id="username"
          name="username"
          type="text"
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
          className="mt-1 block w-full border border-slate-600 bg-slate-900 text-white rounded-md p-3 focus:outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400 font-sans"
        />
        {state?.errors?.password && (
          <p className="text-sm text-red-400 mt-1">{state.errors.password}</p>
        )}
      </div>

      {state?.message && (
        <p className="text-sm text-red-400 font-medium text-center">
          {state.message}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="w-full bg-yellow-500 text-slate-900 font-bold py-3 px-4 rounded-md hover:bg-yellow-400 disabled:opacity-50 transition-colors uppercase tracking-widest mt-4"
      >
        {pending ? "Authenticating..." : "Sign In"}
      </button>
      <div className="mt-6 border-t border-slate-600 pt-6 text-center text-sm font-sans text-slate-300">
        <p>Don&apos;t have clearance?</p>
        <Link
          href="/signup"
          className="text-yellow-400 font-bold hover:underline mt-2 inline-block uppercase tracking-wider text-xs"
        >
          Register for the Academy
        </Link>
      </div>
    </form>
  );
}
