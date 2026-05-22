"use client";

import { Link2, Check } from "lucide-react";
import { useState } from "react";

const CopyLinkButton = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <button
      onClick={handleCopy}
      className="w-full flex items-center justify-center gap-2 btn btn-ghost h-9 min-h-9 rounded-xl text-[10px] font-black uppercase tracking-widest text-base-content/50 hover:text-base-content hover:bg-base-100 transition-all"
    >
      {copied ? (
        <>
          <Check size={12} className="text-success" />
          <span className="text-success">Link Copied!</span>
        </>
      ) : (
        <>
          <Link2 size={12} />
          <span>Copy Link</span>
        </>
      )}
    </button>
  );
};

export default CopyLinkButton;
