// src/app/(auth)/layout.tsx
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-[calc(100vh-100px)] items-center justify-center p-4 font-wolverine">
      <div className="w-full max-w-md">{children}</div>
    </div>
  );
}
