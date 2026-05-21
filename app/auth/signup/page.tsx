"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { BsBugFill } from "react-icons/bs";
import { FaSpinner } from "react-icons/fa";
import { Eye, EyeOff } from "lucide-react";

const schema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((d) => d.password === d.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type FormData = z.infer<typeof schema>;

const SignUpPage = () => {
  const router = useRouter();
  const [serverError, setServerError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    setServerError("");
    try {
      await axios.post("/api/auth/signup", {
        name: data.name,
        email: data.email,
        password: data.password,
      });
      router.push("/api/auth/signin?callbackUrl=/");
    } catch (err) {
      const e = err as AxiosError<{ error: string }>;
      setServerError(e.response?.data?.error || "Something went wrong.");
    }
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
              Create your account
            </h1>
            <p className="text-sm text-base-content/50 font-medium mt-1">
              Start tracking issues in seconds
            </p>
          </div>
        </div>

        <div className="bg-base-200 rounded-3xl shadow-xl p-6 flex flex-col gap-4">

          {serverError && (
            <div className="px-4 py-3 rounded-2xl bg-red-500/10 text-red-400 text-xs font-semibold">
              {serverError}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-black uppercase tracking-widest text-base-content/50">
                Full Name
              </label>
              <input
                {...register("name")}
                type="text"
                placeholder="John Doe"
                className="w-full px-4 py-3 rounded-2xl bg-base-100 text-sm text-base-content placeholder-base-content/30 focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all"
              />
              {errors.name && (
                <span className="text-[10px] text-red-400 font-semibold">{errors.name.message}</span>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-black uppercase tracking-widest text-base-content/50">
                Email Address
              </label>
              <input
                {...register("email")}
                type="email"
                placeholder="you@example.com"
                className="w-full px-4 py-3 rounded-2xl bg-base-100 text-sm text-base-content placeholder-base-content/30 focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all"
              />
              {errors.email && (
                <span className="text-[10px] text-red-400 font-semibold">{errors.email.message}</span>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-black uppercase tracking-widest text-base-content/50">
                Password
              </label>
              <div className="relative">
                <input
                  {...register("password")}
                  type={showPassword ? "text" : "password"}
                  placeholder="At least 8 characters"
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
              {errors.password && (
                <span className="text-[10px] text-red-400 font-semibold">{errors.password.message}</span>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-black uppercase tracking-widest text-base-content/50">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  {...register("confirmPassword")}
                  type={showConfirm ? "text" : "password"}
                  placeholder="Re-enter your password"
                  className="w-full px-4 py-3 pr-11 rounded-2xl bg-base-100 text-sm text-base-content placeholder-base-content/30 focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-base-content/40 hover:text-base-content transition-colors"
                >
                  {showConfirm ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
              {errors.confirmPassword && (
                <span className="text-[10px] text-red-400 font-semibold">{errors.confirmPassword.message}</span>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full btn btn-primary !text-white font-black uppercase tracking-widest text-xs rounded-2xl h-12 min-h-12 mt-2 flex items-center justify-center gap-2 transition-all hover:scale-[1.01] active:scale-[0.99]"
            >
              {isSubmitting && <FaSpinner className="animate-spin" />}
              {isSubmitting ? "Creating Account..." : "Create Account"}
            </button>

          </form>
        </div>

        <p className="text-center text-xs text-base-content/50 font-medium">
          Already have an account?{" "}
          <Link
            href="/api/auth/signin"
            className="text-primary font-black hover:underline"
          >
            Sign In
          </Link>
        </p>

      </div>
    </div>
  );
};

export default SignUpPage;
