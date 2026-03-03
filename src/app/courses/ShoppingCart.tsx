// src/app/courses/ShoppingCart.tsx
"use client"; // Required for handling actions with bound arguments in some setups

import { dropCourse, confirmEnrollment } from "./actions";

export default function ShoppingCart({ cartItems }: { cartItems: any[] }) {
  if (cartItems.length === 0) return null;

  return (
    <div className="w-full max-w-md bg-slate-900 border-2 border-dashed border-yellow-500 p-4 rounded-lg my-6">
      <h2 className="text-xl font-bold text-yellow-400 mb-4 font-science-gothic uppercase tracking-widest">
        Mutant Shopping Cart
      </h2>
      <ul className="space-y-3">
        {cartItems.map((item) => {
          // Fix: Bind the courseId to the action so it returns void/Promise<void>
          const dropAction = dropCourse.bind(null, item.courseId);

          return (
            <li
              key={item.id}
              className="flex justify-between items-center bg-slate-800 p-3 rounded border border-slate-700 shadow-inner"
            >
              <span className="text-white font-sans">
                {item.course.className}
              </span>
              <form action={dropAction}>
                <button
                  type="submit"
                  className="text-xs text-red-500 hover:text-red-400 uppercase font-bold tracking-tighter transition"
                >
                  Remove
                </button>
              </form>
            </li>
          );
        })}
      </ul>

      <form action={confirmEnrollment} className="mt-6">
        <button
          type="submit"
          className="w-full bg-yellow-400 text-slate-900 font-bold py-3 rounded hover:bg-yellow-300 transition uppercase tracking-widest shadow-lg"
        >
          Confirm Registration
        </button>
      </form>
    </div>
  );
}
