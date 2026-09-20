
"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (password.length < 8) {
      setError("Password must contain at least 8 characters.");
      return;
    }

    setLoading(true);

    try {
      await register(name, email, password);
      router.push("/");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to create your account"
      );
    } finally {
      setLoading(false);
    }
  }

  function handleGoogleRegister() {
    alert("Google Sign-Up will be available soon.");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f5f5f7] px-5 py-10">
      <div className="w-full max-w-sm">
        {/* Logo and heading */}
        <div className="mb-8 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-[14px] bg-black text-base font-semibold text-white shadow-sm">
            L
          </div>

          <h1 className="mt-6 text-2xl font-semibold tracking-[-0.04em]">
            Create your LifeOS
          </h1>

          <p className="mt-2 text-sm text-black/40">
            Start organizing your life in one place
          </p>
        </div>

        {/* Register card */}
        <div className="rounded-3xl border border-black/[0.06] bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)] sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-xs font-medium text-black/60"
              >
                Name
              </label>

              <input
                id="name"
                type="text"
                autoComplete="name"
                required
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Your name"
                className="h-11 w-full rounded-xl border border-black/[0.08] bg-[#f9f9fa] px-3.5 text-sm outline-none transition placeholder:text-black/25 focus:border-black/25 focus:bg-white"
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-xs font-medium text-black/60"
              >
                Email
              </label>

              <input
                id="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                className="h-11 w-full rounded-xl border border-black/[0.08] bg-[#f9f9fa] px-3.5 text-sm outline-none transition placeholder:text-black/25 focus:border-black/25 focus:bg-white"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-xs font-medium text-black/60"
              >
                Password
              </label>

              <input
                id="password"
                type="password"
                autoComplete="new-password"
                required
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="At least 8 characters"
                className="h-11 w-full rounded-xl border border-black/[0.08] bg-[#f9f9fa] px-3.5 text-sm outline-none transition placeholder:text-black/25 focus:border-black/25 focus:bg-white"
              />
            </div>

            {/* Confirm password */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="mb-2 block text-xs font-medium text-black/60"
              >
                Confirm password
              </label>

              <input
                id="confirmPassword"
                type="password"
                autoComplete="new-password"
                required
                value={confirmPassword}
                onChange={(event) =>
                  setConfirmPassword(event.target.value)
                }
                placeholder="Repeat your password"
                className="h-11 w-full rounded-xl border border-black/[0.08] bg-[#f9f9fa] px-3.5 text-sm outline-none transition placeholder:text-black/25 focus:border-black/25 focus:bg-white"
              />
            </div>

            {/* Error */}
            {error && (
              <div className="rounded-xl bg-black/[0.04] px-3.5 py-3 text-xs leading-5 text-black/60">
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="h-11 w-full rounded-xl bg-black text-sm font-medium text-white transition hover:bg-black/80 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Creating account..." : "Create account"}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-black/[0.06]" />

            <span className="text-[10px] uppercase tracking-widest text-black/25">
              or
            </span>

            <div className="h-px flex-1 bg-black/[0.06]" />
          </div>

          {/* Google */}
          <button
            type="button"
            onClick={handleGoogleRegister}
            className="flex h-11 w-full items-center justify-center gap-3 rounded-xl border border-black/[0.08] bg-white text-sm font-medium text-black transition hover:bg-black/[0.03]"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                fill="#4285F4"
                d="M21.35 12.27c0-.72-.06-1.41-.18-2.07H12v3.92h5.24a4.48 4.48 0 0 1-1.95 2.94v2.45h3.15c1.84-1.69 2.91-4.18 2.91-7.24Z"
              />

              <path
                fill="#34A853"
                d="M12 21.5c2.63 0 4.84-.87 6.45-2.36l-3.15-2.45c-.87.58-1.98.93-3.3.93-2.54 0-4.69-1.72-5.46-4.03H3.29v2.53A9.74 9.74 0 0 0 12 21.5Z"
              />

              <path
                fill="#FBBC05"
                d="M6.54 13.59A5.85 5.85 0 0 1 6.23 12c0-.55.11-1.08.31-1.59V7.88H3.29A9.75 9.75 0 0 0 2.25 12c0 1.57.38 3.05 1.04 4.12l3.25-2.53Z"
              />

              <path
                fill="#EA4335"
                d="M12 6.38c1.43 0 2.71.49 3.72 1.45l2.79-2.79C16.83 3.48 14.63 2.5 12 2.5a9.74 9.74 0 0 0-8.71 5.38l3.25 2.53c.77-2.31 2.92-4.03 5.46-4.03Z"
              />
            </svg>

            <span>Continue with Google</span>
          </button>

          <p className="mt-3 text-center text-[10px] text-black/25">
            Google Sign-Up will be available soon.
          </p>

          {/* Login */}
          <div className="mt-6 border-t border-black/[0.05] pt-6">
            <p className="text-center text-xs text-black/40">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-medium text-black transition hover:text-black/60"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>

        {/* Footer */}
        <p className="mt-6 text-center text-[10px] text-black/25">
          LifeOS · Your personal operating system
        </p>
      </div>
    </main>
  );
}

