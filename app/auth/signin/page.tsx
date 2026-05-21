"use client";

import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { BsBugFill } from "react-icons/bs";
import { FaSpinner } from "react-icons/fa";
import { Eye, EyeOff } from "lucide-react";
import { FcGoogle } from "react-icons/fc";

const SignInPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const handleCredentialsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    setIsLoading(false);
    if (result?.error) {
      setError("Invalid email or password. Please try again.");
    } else {
      router.push(callbackUrl);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true);
    await signIn("google", { callbackUrl });
  };

  return (
    <div className="h-[90vh] flex items-center justify-center px-4 overflow-hidden">
      <div className="w-full max-w-md flex flex-col gap-5">

        <div className="flex flex-col items-center gap-3 text-center">
          <div className="p-4 rounded-3xl bg-primary/10">
            <BsBugFill className="text-4xl text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-base-content tracking-tight uppercase">
              Welcome back
            </h1>
            <p className="text-sm text-base-content/50 font-medium mt-1">
              Sign in to your account to continue
            </p>
          </div>
        </div>

        <div className="bg-base-200 rounded-3xl shadow-xl p-6 flex flex-col gap-4">

          {error && (
            <div className="px-4 py-3 rounded-2xl bg-red-500/10 text-red-400 text-xs font-semibold">
              {error}
            </div>
          )}

          <button
            onClick={handleGoogleSignIn}
            disabled={isGoogleLoading}
            className="w-full flex items-center justify-center gap-2.5 h-11 rounded-2xl bg-base-100 hover:bg-base-300 transition-all text-sm font-bold text-base-content/80 hover:text-base-content"
          >
            {isGoogleLoading ? (
              <FaSpinner className="animate-spin text-base-content/50" />
            ) : (
              <FcGoogle size={18} />
            )}
            Continue with Google
          </button>

          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-base-content/10" />
            <span className="text-[10px] font-black uppercase tracking-widest text-base-content/30">or</span>
            <div className="flex-1 h-px bg-base-content/10" />
          </div>

          <form onSubmit={handleCredentialsSubmit} className="flex flex-col gap-3">

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-black uppercase tracking-widest text-base-content/50">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="w-full px-4 py-3 rounded-2xl bg-base-100 text-sm text-base-content placeholder-base-content/30 focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-black uppercase tracking-widest text-base-content/50">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Your password"
                  required
                  className="w-full px-4 py-3 pr-11 rounded-2xl bg-base-100 text-sm text-base-content placeholder-base-content/30 focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-base-content/40 hover:text-base-content transition-colors"
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn btn-primary !text-white font-black uppercase tracking-widest text-xs rounded-2xl h-11 min-h-11 mt-1 flex items-center justify-center gap-2 transition-all hover:scale-[1.01] active:scale-[0.99]"
            >
              {isLoading && <FaSpinner className="animate-spin" />}
              {isLoading ? "Signing In..." : "Sign In"}
            </button>

          </form>
        </div>

        <p className="text-center text-xs text-base-content/50 font-medium">
          Don&apos;t have an account?{" "}
          <Link href="/auth/signup" className="text-primary font-black hover:underline">
            Sign Up
          </Link>
        </p>

      </div>
    </div>
  );
};

export default SignInPage;
