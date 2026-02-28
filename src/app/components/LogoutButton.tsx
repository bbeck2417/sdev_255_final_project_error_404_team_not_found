import { logout } from "@/app/actions/auth";

export default function LogoutButton() {
  return (
    <form action={logout}>
      <button
        type="submit"
        className="bg-slate-800 border border-yellow-400 text-yellow-400 font-bold py-2 px-4 rounded hover:bg-yellow-500 hover:text-slate-900 transition-colors uppercase tracking-wider text-sm"
      >
        Disconnect Cerebro
      </button>
    </form>
  );
}
