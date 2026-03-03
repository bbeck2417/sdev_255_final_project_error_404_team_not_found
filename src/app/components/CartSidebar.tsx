"use client";

import { useState } from "react";
import { dropCourse, confirmEnrollment } from "../courses/actions";

type CartItem = {
  id: number;
  courseId: number;
  course: {
    className: string;
  };
};

export default function CartSidebar({ cartItems }: { cartItems: CartItem[] }) {
  const [isOpen, setIsOpen] = useState(false);

  // Wrapper to satisfy the 'action' prop's expectation of a void return
  const handleDrop = async (courseId: number) => {
    await dropCourse(courseId);
  };

  return (
    <>
      {/* Floating Cart Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-28 right-6 bg-yellow-400 text-black p-4 rounded-full shadow-2xl z-50 font-bold hover:scale-105 transition"
      >
        🛒 Cart ({cartItems.length})
      </button>

      {/* Sidebar Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-60 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="absolute right-0 top-0 h-full w-full max-w-xs bg-slate-900 border-l border-yellow-400 p-6 flex flex-col shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-yellow-400 uppercase tracking-widest">
                Enrollment Cart
              </h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white text-2xl hover:text-yellow-400"
              >
                &times;
              </button>
            </div>

            {cartItems.length === 0 ? (
              <p className="text-slate-400 italic">Your cart is empty.</p>
            ) : (
              <>
                <ul className="grow space-y-4 overflow-y-auto pr-2 custom-scrollbar">
                  {cartItems.map((item) => (
                    <li
                      key={item.id}
                      className="bg-slate-800 p-3 rounded border border-slate-700"
                    >
                      <p className="text-white font-bold text-sm">
                        {item.course.className}
                      </p>
                      <form action={() => handleDrop(item.courseId)}>
                        <button className="text-xs text-red-500 mt-2 font-bold uppercase hover:underline">
                          Remove
                        </button>
                      </form>
                    </li>
                  ))}
                </ul>

                <form
                  action={confirmEnrollment}
                  className="mt-6 pt-4 border-t border-slate-700"
                >
                  <button className="w-full bg-yellow-400 text-slate-900 font-bold py-3 rounded hover:bg-yellow-300 transition uppercase text-sm tracking-wider">
                    Confirm Registration
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
