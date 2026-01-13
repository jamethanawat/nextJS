'use client'

import { useEffect, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { authenticateUser, getValidSession } from "@/app/services/authService";
import type { AuthDomain } from "@/app/types/auth";

const DEFAULT_DOMAIN: AuthDomain = "admin";
export const Login = () => {
   const router = useRouter();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [domain, setDomain] = useState<AuthDomain>(DEFAULT_DOMAIN);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
  
    useEffect(() => {
      const session = getValidSession();
      if (session) {
        const returnUrl = sessionStorage.getItem("returnUrl");
        sessionStorage.removeItem("returnUrl");
        router.replace(returnUrl || "/");
      }
    }, [router]);
  
    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setLoading(true);
      setError(null);
  
      try {
        await authenticateUser({ username: username.trim(), password, domain });
        const returnUrl = sessionStorage.getItem("returnUrl");
        sessionStorage.removeItem("returnUrl");
        router.replace(returnUrl || "/");
      } catch (err) {
        const message = err instanceof Error ? err.message : "Login failed";
        setError(message);
      } finally {
        setLoading(false);
      }
    };
  
    return (
      <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#fefce8,_#ffffff_45%,_#e0f2fe_100%)]">
        <div className="mx-auto flex w-full max-w-lg flex-col gap-8 px-6 py-16">
          <header className="flex flex-col gap-3 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
              Secure Access
            </p>
            <h1 className="text-3xl font-semibold text-slate-900 md:text-4xl">
              Login to continue
            </h1>
            <p className="text-sm text-slate-600">
              Enter your credentials and choose the domain to sign in.
            </p>
          </header>
  
          <section className="rounded-2xl border border-slate-200 bg-white/90 p-6 shadow-sm backdrop-blur">
            <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
              {error ? (
                <div className="rounded-lg border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {error}
                </div>
              ) : null}
  
              <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
                Username
                <input
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  className="rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 shadow-sm outline-none transition focus:border-slate-400"
                  placeholder="your.username"
                  required
                />
              </label>
  
              <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
                Password
                <input
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 shadow-sm outline-none transition focus:border-slate-400"
                  placeholder="••••••••"
                  type="password"
                  required
                />
              </label>
  
              <label className="flex flex-col gap-2 text-sm font-medium text-slate-700">
                Domain
                <select
                  value={domain}
                  onChange={(event) => setDomain(event.target.value as AuthDomain)}
                  className="rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-900 shadow-sm outline-none transition focus:border-slate-400"
                >
                  <option value="admin">Admin</option>
                  <option value="sale">Sale</option>
                </select>
              </label>
  
              <button
                type="submit"
                className="rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400"
                disabled={loading}
              >
                {loading ? "Signing in..." : "Login"}
              </button>
            </form>
          </section>
        </div>
      </div>
    );
}
