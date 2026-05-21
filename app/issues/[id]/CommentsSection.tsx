"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import Link from "next/link";
import CommentForm from "./CommentForm";
import CommentCard from "./CommentCard";

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

type CommentsSectionProps = {
  issueId: string;
};

const CommentsSection = ({ issueId }: CommentsSectionProps) => {
  const { data: session, status } = useSession();
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [highlightedCommentId, setHighlightedCommentId] = useState<number | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash) {
      const hash = window.location.hash;
      if (hash.startsWith("#comment-")) {
        const id = parseInt(hash.replace("#comment-", ""));
        if (!isNaN(id)) {
          setHighlightedCommentId(id);
          
          setTimeout(() => {
            const element = document.getElementById(`comment-${id}`);
            if (element) {
              element.scrollIntoView({ behavior: "smooth", block: "center" });
              
              setTimeout(() => {
                setHighlightedCommentId(null);
              }, 3000);
            }
          }, 600);
        }
      }
    }
  }, [comments]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`/api/issues/${issueId}/comments`);
        setComments(response.data);
      } catch (err) {
        console.error("Failed to load comments", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchComments();
  }, [issueId]);

  const handlePostComment = async (text: string) => {
    const response = await axios.post(`/api/issues/${issueId}/comments`, {
      text,
    });
    const newComment = response.data;
    setComments((prevComments) => [newComment, ...prevComments]);
  };

  const handleCommentAdded = (newComment: Comment) => {
    setComments((prevComments) => {
      if (prevComments.some((c) => c.id === newComment.id)) return prevComments;
      return [...prevComments, newComment];
    });
  };

  const rootComments = comments.filter((c) => !c.parentId);

  return (
    <div className="w-full p-6 rounded-3xl bg-base-200 shadow-xl flex flex-col gap-5">
      <div className="flex items-center justify-between pb-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-base-content/70 uppercase tracking-widest">
            Discussion
          </span>
          <span className="px-2 py-0.5 rounded-full bg-base-100 text-[10px] font-black text-base-content/50">
            {comments.length}
          </span>
        </div>
        <span className="text-[10px] text-base-content/50 font-bold uppercase tracking-wider">
          Threaded view
        </span>
      </div>

      {status === "unauthenticated" ? (
        <div className="p-4 rounded-2xl bg-base-100 flex flex-col items-center gap-2.5 text-center">
          <span className="text-xs text-base-content/75 font-semibold">
            You must be signed in to join the discussion.
          </span>
          <Link
            href="/api/auth/signin"
            className="btn btn-primary !text-white text-[10px] font-extrabold rounded-lg transition-colors uppercase tracking-wider min-h-0 h-8 flex items-center px-4"
          >
            Sign In
          </Link>
        </div>
      ) : status === "loading" ? (
        <div className="h-16 w-full rounded-2xl bg-base-100 animate-pulse"></div>
      ) : (
        <CommentForm onSubmit={handlePostComment} />
      )}

      <div className="flex flex-col mt-1">
        {isLoading ? (
          <div className="flex flex-col gap-3 py-2">
            <div className="h-14 w-full rounded-2xl bg-base-100 animate-pulse"></div>
            <div className="h-14 w-full rounded-2xl bg-base-100 animate-pulse"></div>
          </div>
        ) : comments.length === 0 ? (
          <div className="text-center py-6 text-xs text-base-content/50 font-semibold uppercase tracking-wider">
            No comments yet. Be the first to share!
          </div>
        ) : (
          rootComments.map((comment) => (
            <CommentCard
              key={comment.id}
              comment={comment}
              allComments={comments}
              status={status}
              issueId={issueId}
              onCommentAdded={handleCommentAdded}
              highlightedCommentId={highlightedCommentId}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default CommentsSection;
