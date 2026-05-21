"use client";

import { issueSchema } from "@/app/validationSchemas";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Issue } from "@prisma/client";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Loader from "../Loader";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { priorities } from "@/lib/types";
import { Sparkles } from "lucide-react";

type IssueFormData = z.infer<typeof issueSchema>;

const IssueForm = ({ issue }: { issue?: Issue }) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isTriaging, setIsTriaging] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<IssueFormData>({
    resolver: zodResolver(issueSchema),
    defaultValues: {
      priority: issue?.priority || "MEDIUM",
    },
  });

  const triageIssue = async () => {
    const title = watch("title");
    const description = watch("description");

    if (!title || !description) {
      toast.error("Please provide both title and description for AI triage");
      return;
    }

    try {
      setIsTriaging(true);
      const { data } = await axios.post("/api/issues/triage", {
        title,
        description,
      });
      setValue("priority", data.priority);
      toast.success(`AI suggests: ${data.priority} priority`, {
        description: data.reason,
      });
    } catch (error) {
      toast.error("AI Triage failed");
    } finally {
      setIsTriaging(false);
    }
  };

  const onSubmit = handleSubmit(async (data) => {
    try {
      setIsSubmitting(true);
      if (issue) {
        await axios.patch("/api/issues/" + issue.id, data);
        router.push("/issues/" + issue.id);
        toast.success("Issue updated successfully");
      } else {
        await axios.post("/api/issues", data);
        toast.success("Issue created successfully");
        router.push("/issues/list");
        router.refresh();
      }
    } catch (error) {
      setIsSubmitting(false);
      toast.error("An unexpected error has occurred");
    }
  });

  return (
    <div className="w-full">
      <form className="flex flex-col gap-4" onSubmit={onSubmit}>
        <div className="flex gap-2">
          <Input
            type="text"
            className="bg-base-200 text-base-content border-0 flex-1 h-10"
            placeholder="Issue title"
            defaultValue={issue?.title}
            {...register("title")}
          />
          <button
            type="button"
            onClick={triageIssue}
            disabled={isTriaging}
            className="relative h-10 min-h-10 px-4 rounded-xl flex items-center gap-2 text-xs font-black uppercase tracking-widest text-white overflow-hidden transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed bg-gradient-to-r from-violet-600 via-purple-500 to-amber-500 shadow-md hover:shadow-violet-500/30 hover:shadow-lg"
          >
            <span className="absolute inset-0 bg-white/10 opacity-0 hover:opacity-100 transition-opacity duration-300" />
            {isTriaging ? (
              <Loader />
            ) : (
              <>
                <Sparkles size={14} className="text-yellow-300 drop-shadow-[0_0_4px_rgba(253,224,71,0.8)]" />
                <span className="hidden sm:inline relative z-10">AI Triage</span>
              </>
            )}
          </button>
        </div>
        {errors.title && (
          <Label className="text-red-500">{errors.title.message}</Label>
        )}

        <div className="flex flex-col gap-2">
          <Label className="text-[10px] font-black uppercase tracking-widest text-base-content/50">Priority</Label>
          <Controller
            name="priority"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger className="bg-base-100 text-base-content border-0 h-10 rounded-xl">
                  <SelectValue placeholder="Select Priority" />
                </SelectTrigger>
                <SelectContent className="bg-base-200 text-base-content border-0">
                  {priorities.map((p) => (
                    <SelectItem key={p} value={p}>
                      {p}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label className="text-[10px] font-black uppercase tracking-widest text-base-content/50">Description</Label>
          <Controller
            name="description"
            control={control}
            defaultValue={issue?.description}
            render={({ field }) => (
              <SimpleMDE placeholder="Describe the issue in detail..." {...field} />
            )}
          />
          {errors.description && (
            <Label className="text-red-500">{errors.description.message}</Label>
          )}
        </div>

        <button
          className={`btn btn-primary !text-white h-10 min-h-10 rounded-2xl font-black uppercase tracking-widest text-xs ${
            isSubmitting && "cursor-not-allowed opacity-40"
          }`}
        >
          {isSubmitting && <Loader />}
          {issue ? "Update Issue" : "Submit Issue"}
        </button>
      </form>
    </div>
  );
};

export default IssueForm;
