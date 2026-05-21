import React, { useState } from "react";
import { FaSpinner } from "react-icons/fa";

type CommentFormProps = {
  onSubmit: (text: string) => Promise<void>;
};

const CommentForm = ({ onSubmit }: CommentFormProps) => {
  const [text, setText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;

    setIsSubmitting(true);
    setError("");
    try {
      await onSubmit(text.trim());
      setText("");
    } catch (err: any) {
      setError(err.response?.data?.error || "Failed to post comment. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2.5">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="What are your thoughts?"
        className="textarea border-none w-full h-20 bg-base-100 rounded-2xl p-3.5 text-base-content placeholder-base-content/40 text-xs focus:outline-none focus:ring-0 transition-all resize-none"
        maxLength={1000}
        disabled={isSubmitting}
      />
      {error && <span className="text-[10px] text-red-500 font-semibold">{error}</span>}
      <button
        type="submit"
        disabled={isSubmitting || !text.trim()}
        className="self-end btn btn-primary text-primary-content text-xs font-bold rounded-lg transition-all duration-200 uppercase tracking-widest flex items-center gap-1.5 h-10 min-h-0"
      >
        {isSubmitting && <FaSpinner className="animate-spin" />}
        Comment
      </button>
    </form>
  );
};

export default CommentForm;
