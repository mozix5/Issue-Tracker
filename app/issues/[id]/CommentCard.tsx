import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaUserCircle, FaSpinner } from "react-icons/fa";
import { ArrowUp, ArrowDown, MessageSquare, Share2, MoreHorizontal, CornerDownRight } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";

type User = {
  id: string;
  name: string | null;
  email: string | null;
  image: string | null;
};

type Comment = {
  id: number;
  text: string;
  createdAt: string;
  parentId: number | null;
  upvotes: number;
  user: User | null;
};

type CommentCardProps = {
  comment: Comment;
  allComments: Comment[];
  depth?: number;
  status: string;
  issueId: string;
  onCommentAdded: (comment: Comment) => void;
  highlightedCommentId: number | null;
};

const CommentCard = ({
  comment,
  allComments,
  depth = 0,
  status,
  issueId,
  onCommentAdded,
  highlightedCommentId,
}: CommentCardProps) => {
  const [isReplying, setIsReplying] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [isSubmittingReply, setIsSubmittingReply] = useState(false);
  const [replyError, setReplyError] = useState("");

  // Upvotes state
  const [upvotes, setUpvotes] = useState(comment.upvotes || 0);
  const [userVote, setUserVote] = useState<"up" | "down" | null>(null);

  const childReplies = allComments.filter(
    (c) => c.parentId && Number(c.parentId) === Number(comment.id)
  );
  const isHighlighted = highlightedCommentId === comment.id;

  const handleVote = async (type: "up" | "down") => {
    let diff = 0;
    const previousVote = userVote;

    if (userVote === type) {
      diff = type === "up" ? -1 : 1;
      setUserVote(null);
    } else {
      if (userVote === "up") diff = -2;
      else if (userVote === "down") diff = 2;
      else diff = type === "up" ? 1 : -1;

      setUserVote(type);
    }

    setUpvotes((prev) => prev + diff);

    try {
      await axios.patch(`/api/comments/${comment.id}/vote`, {
        voteChange: diff,
      });
    } catch (err) {
      console.error("Failed to persist vote", err);
      // Revert on error
      setUpvotes((prev) => prev - diff);
      setUserVote(previousVote);
    }
  };

  const handleShare = () => {
    if (typeof window === "undefined") return;
    const shareUrl = `${window.location.origin}${window.location.pathname}#comment-${comment.id}`;
    
    navigator.clipboard.writeText(shareUrl)
      .then(() => {
        toast.success("Direct link to comment copied to clipboard!");
      })
      .catch((err) => {
        console.error("Could not copy sharing URL:", err);
        toast.error("Failed to copy link");
      });
  };

  const handleReplySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim()) return;

    setIsSubmittingReply(true);
    setReplyError("");

    try {
      const response = await axios.post(`/api/issues/${issueId}/comments`, {
        text: replyText.trim(),
        parentId: comment.id,
      });
      onCommentAdded(response.data);
      setReplyText("");
      setIsReplying(false);
    } catch (err: any) {
      setReplyError(err.response?.data?.error || "Failed to post reply.");
    } finally {
      setIsSubmittingReply(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMins < 1) return "just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;

    return date.toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div id={`comment-${comment.id}`} className="relative flex flex-col gap-1 w-full mt-1">
      <div className={`relative flex gap-3 pl-1 py-3 group rounded-2xl transition-all duration-700 ${
        isHighlighted ? "bg-primary/10 scale-[1.005] ring-1 ring-primary/30 px-3" : ""
      } ${
        depth > 0 ? "ml-6 md:ml-8 border-l-[1.5px] border-base-content/20 hover:border-primary pl-3 md:pl-4 mt-0.5" : ""
      }`}>
        
        <Avatar className="w-8 h-8 flex-shrink-0 z-10 border border-base-content/10">
          <AvatarImage src={comment.user?.image || undefined} />
          <AvatarFallback className="bg-base-200 text-base-content/50 text-xs">
            <FaUserCircle className="text-xl" />
          </AvatarFallback>
        </Avatar>

        <div className="flex flex-col gap-1 flex-1 min-w-0">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[13px] font-bold text-base-content truncate hover:underline cursor-pointer">
              {comment.user?.name || comment.user?.email?.split("@")[0] || "anonymous"}
            </span>
            <span className="text-[10px] text-base-content/30 font-bold">•</span>
            <span className="text-[11px] text-base-content/50 font-bold tracking-wide uppercase">
              {formatDate(comment.createdAt)}
            </span>
          </div>

          <p className="text-sm text-base-content/90 font-normal leading-relaxed pl-0.5 whitespace-pre-line break-words">
            {comment.text}
          </p>

          <div className="flex flex-wrap items-center gap-3.5 mt-2 pl-0.5">
            <div className="flex items-center bg-base-100 rounded-full border border-base-content/10 overflow-hidden h-[24px]">
              <button
                onClick={() => handleVote("up")}
                className={`px-2 h-full flex items-center justify-center transition-colors ${
                  userVote === "up" ? "text-orange-500 bg-orange-500/10" : "text-base-content/50 hover:text-primary"
                }`}
              >
                <ArrowUp size={12} className={userVote === "up" ? "stroke-[3px]" : "stroke-[2px]"} />
              </button>
              <span
                className={`text-xs font-black px-1 min-w-[12px] text-center ${
                  userVote === "up" ? "text-orange-500" : userVote === "down" ? "text-blue-500" : "text-base-content/40"
                }`}
              >
                {upvotes}
              </span>
              <button
                onClick={() => handleVote("down")}
                className={`px-2 h-full flex items-center justify-center transition-colors ${
                  userVote === "down" ? "text-blue-500 bg-blue-500/10" : "text-base-content/50 hover:text-primary"
                }`}
              >
                <ArrowDown size={12} className={userVote === "down" ? "stroke-[3px]" : "stroke-[2px]"} />
              </button>
            </div>

            {status === "authenticated" && (
              <button
                onClick={() => {
                  setIsReplying(!isReplying);
                  setReplyText("");
                  setReplyError("");
                }}
                className={`flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider transition-colors ${
                  isReplying ? "text-primary" : "text-base-content/50 hover:text-primary"
                }`}
              >
                <MessageSquare size={11} />
                <span>Reply</span>
              </button>
            )}

            <button
              onClick={handleShare}
              className="flex items-center gap-1.5 text-[11px] font-bold text-base-content/50 hover:text-primary transition-colors uppercase tracking-wider"
            >
              <Share2 size={11} />
              <span>Share</span>
            </button>

            <button className="flex items-center justify-center text-[11px] font-bold text-base-content/50 hover:text-primary transition-colors">
              <MoreHorizontal size={12} />
            </button>
          </div>

          {isReplying && (
            <form onSubmit={handleReplySubmit} className="mt-3 flex flex-col gap-2 pl-0.5">
              <div className="flex gap-2 items-start w-full">
                <CornerDownRight size={16} className="text-base-content/40 mt-2 flex-shrink-0" />
                <textarea
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Reply to this thread..."
                  className="textarea textarea-bordered w-full h-16 bg-base-100 rounded-xl p-2.5 text-base-content placeholder-base-content/40 text-xs focus:outline-none focus:ring-0 transition-all resize-none"
                  maxLength={1000}
                  disabled={isSubmittingReply}
                />
              </div>
              {replyError && <span className="text-[10px] text-red-500 font-semibold pl-6">{replyError}</span>}
              <div className="flex gap-2 self-end">
                <button
                  type="button"
                  onClick={() => setIsReplying(false)}
                  className="px-3 py-1 btn btn-ghost min-h-0 h-8 text-[10px] font-black rounded-md transition-all uppercase tracking-widest text-base-content/65 hover:text-base-content"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmittingReply || !replyText.trim()}
                  className="px-3 py-1 btn btn-primary text-primary-content min-h-0 h-8 text-[10px] font-black rounded-md transition-all uppercase tracking-widest flex items-center gap-1"
                >
                  {isSubmittingReply && <FaSpinner className="animate-spin" />}
                  Reply
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      {childReplies.length > 0 && (
        <div className="flex flex-col">
          {childReplies.map((child) => (
            <CommentCard
              key={child.id}
              comment={child}
              allComments={allComments}
              depth={depth + 1}
              status={status}
              issueId={issueId}
              onCommentAdded={onCommentAdded}
              highlightedCommentId={highlightedCommentId}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentCard;
