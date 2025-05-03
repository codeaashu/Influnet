"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Star } from "lucide-react";
import clsx from "clsx";
import { useApi } from "@/hooks";
import reviewApiService from "@/api/endpoints/influencer-review-api-service";
import { toast } from "sonner";
import { useAuth } from "@/hooks/use-auth";

const FormSchema = z.object({
  comment: z
    .string({ message: "Write a comment please" })
    .min(10, { message: "Comment must be at least 10 characters." })
    .max(300, { message: "Comment must not be longer than 300 characters." }),
  rating: z.number().min(1, "Select at least 1").max(5),
});

export default function AddReviewForm({ setReviews, influencer }) {
  const { user } = useAuth();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      comment: "",
      rating: 0,
    },
  });

  const { request: addReviewRequest, loading: addReviewLoading } = useApi(
    reviewApiService.createReview
  );
  const onSubmit = async (review: z.infer<typeof FormSchema>) => {
    const { data: reviewAddResponse, error: reviewAddError } =
      await addReviewRequest(influencer.id, review);
    if (reviewAddResponse) {
      const newReview = { ...reviewAddResponse.review, author: user };
      setReviews((prevReviews) => [newReview, ...prevReviews]);
      toast.success(reviewAddResponse.message);
    } else if (reviewAddError) {
      toast.error(reviewAddError.message);
    }
  };

  return (
    <div className="w-full md:w-2/3 mt-12 md:mt-0">
      <h3 className="text-xl font-semibold text-center md:text-left">
        Rate the Influencer
      </h3>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-6 mt-5"
        >
          {/* Rating Field */}
          <FormField
            control={form.control}
            name="rating"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-center md:justify-start">
                <FormLabel>
                  <span className="text-black">Rating</span>
                </FormLabel>
                <FormControl>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        // stroke="none"
                        className={clsx(
                          "w-6 h-6 cursor-pointer transition-colors",
                          star <= field.value
                            ? "fill-primary stroke-0"
                            : "stroke-1 text-primary"
                        )}
                        onClick={() => field.onChange(star)}
                      />
                    ))}
                  </div>
                </FormControl>
                <FormMessage className="text-xs text-red-500" />
              </FormItem>
            )}
          />
          {/* Comment Field */}
          <FormField
            control={form.control}
            name="comment"
            render={({ field }) => (
              <FormItem className="flex flex-col items-center md:items-start justify-center md:justify-start">
                <FormLabel>
                  <div className="text-black">
                    What you think about{" "}
                    <span className="text-primary font-semibold">
                      {influencer.fullname}
                    </span>{" "}
                    ?
                  </div>
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="start writing here..."
                    className="h-32 resize-none border-gray-200 focus-visible:border-gray-200 text-sm md:text-md"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-xs text-red-500" />
              </FormItem>
            )}
          />
          <div className="flex justify-center md:justify-start">
            <Button type="submit" disabled={addReviewLoading}>
              {" "}
              {addReviewLoading ? "Adding Review..." : "Add Review"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
