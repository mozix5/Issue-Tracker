"use client";

import React, { useState } from "react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { LogOut, ArrowLeft, RefreshCw } from "lucide-react";
import { BsBugFill } from "react-icons/bs";

const SignOutPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSignOut = async () => {
    setIsLoading(true);
    await signOut({ callbackUrl: "/" });
  };

  return (
    <div className="h-[90vh] flex items-center justify-center px-4 overflow-hidden">
      <div className="w-full max-w-md flex flex-col gap-6">
        
        {/* Logo and Header */}
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="p-4 rounded-3xl bg-warning/10 animate-pulse">
            <BsBugFill className="text-4xl text-warning" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-base-content tracking-tight uppercase">
              Sign Out
            </h1>
            <p className="text-sm text-base-content/50 font-medium mt-1">
              Are you sure you want to end your active session?
            </p>
          </div>
        </div>

        {/* Confirmation Card */}
        <div className="bg-base-200 rounded-3xl shadow-xl p-6 flex flex-col gap-5 border border-base-content/5">
          <div className="flex flex-col gap-3">
            <button
              onClick={handleSignOut}
              disabled={isLoading}
              className="w-full btn btn-warning h-12 min-h-[3rem] rounded-2xl text-sm font-bold uppercase tracking-wider gap-2 shadow-md hover:shadow-lg transition-all"
            >
              {isLoading ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <LogOut className="w-4 h-4" />
              )}
              {isLoading ? "Signing out..." : "Yes, Sign Out"}
            </button>

            <button
              onClick={() => router.back()}
              disabled={isLoading}
              className="w-full btn btn-ghost h-12 min-h-[3rem] rounded-2xl text-sm font-bold uppercase tracking-wider gap-2 transition-all hover:bg-base-300"
            >
              <ArrowLeft className="w-4 h-4" />
              Cancel & Go Back
            </button>
          </div>

          <div className="flex items-center justify-center gap-2 mt-2">
            <div className="w-1.5 h-1.5 rounded-full bg-success animate-ping" />
            <span className="text-[10px] font-black uppercase tracking-widest text-base-content/40">
              Session is currently active
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignOutPage;
