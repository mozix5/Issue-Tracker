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
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type IssueFormData = z.infer<typeof issueSchema>;

const IssueForm = ({ issue }: { issue?: Issue }) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueFormData>({
    resolver: zodResolver(issueSchema),
  });
  const onSubmit = handleSubmit(async (data) => {
    try {
      setIsSubmitting(true);
      if (issue) {
        await axios.patch("/api/issues/" + issue.id, data);
        router.push("/issues/" + issue.id);
        toast("Issue updated successfully");
      } else {
        await axios.post("/api/issues", data);
        toast("Issue created successfully");
        router.push("/issues/list");
        router.refresh();
      }
    } catch (error) {
      setIsSubmitting(false);
      toast("An unexpected error has occurred");
    }
  });
  return (
    <div className=" max-w-xl pt-4">
      <form className="flex flex-col gap-4" onSubmit={onSubmit}>
        <Input
          type="text"
          placeholder="Title"
          defaultValue={issue?.title}
          {...register("title")}
        />
        {errors.title && (
          <Label className="text-red-500">{errors.title.message}</Label>
        )}
        <Controller
          name="description"
          control={control}
          defaultValue={issue?.description}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />
        <Button disabled={isSubmitting}>
          {issue ? "Update Issue" : "Submit Issue"}
        </Button>
      </form>
    </div>
  );
};

export default IssueForm;
