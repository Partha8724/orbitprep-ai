export function AuthButtons() {
  return (
    <div className="fixed top-5 right-5 z-50 flex gap-3">
      <a href="/login" className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-white">
        Login
      </a>

      <a href="/signup" className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-white">
        Sign Up
      </a>

      <a href="/dashboard" className="rounded-xl bg-white px-4 py-2 text-black">
        Dashboard
      </a>
    </div>
  );
}