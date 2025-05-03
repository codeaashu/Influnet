import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useAuth } from "@/hooks/use-auth";
import { ProfileImageUpload } from "@/components/user/profile-image-upload";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useApi } from "@/hooks";
import userApiServices from "@/api/endpoints/user-api-service";
import { toast } from "sonner";

// Zod schema
const updateSchema = z.object({
  fullname: z.string().min(1, "Full name is required"),
  profile_image: z.any().optional(), // can be null or a File
});

type UpdateFormData = z.infer<typeof updateSchema>;

export default function UpdateUserForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { user, setUser } = useAuth();
  const { request, loading, errorMessage } = useApi(userApiServices.updateUser);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<UpdateFormData>({
    resolver: zodResolver(updateSchema),
    defaultValues: {
      fullname: user?.fullname || "",
    },
  });

  const onSubmit = async (data: UpdateFormData) => {
    const formData = new FormData();
    formData.append("fullname", data.fullname);
    if (selectedImage) {
      formData.append("profile_image", selectedImage);
    }

    const { data: updateUserResponse, error: updateUserError } = await request(
      formData
    );
    if (updateUserResponse?.user) {
      setUser((prevUser) => ({
        ...prevUser,
        ...updateUserResponse.user,
      }));
      toast.success(updateUserResponse.message);
    } else if (updateUserError) {
      toast.error(updateUserError.message);
    }
  };

  const onImageSelect = (file: File) => {
    setSelectedImage(file);
    setValue("profile_image", file);
  };

  return (
    <div
      className={cn(
        "flex flex-col gap-6 items-center justify-center",
        className
      )}
      {...props}
    >
      <Card className="w-full md:w-[500px] overflow-hidden p-0 border border-gray-200 shadow-none">
        <CardContent className="p-0">
          <form onSubmit={handleSubmit(onSubmit)} className="p-6 md:p-8">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center mb-0">
                <h1 className="text-lg md:text-xl font-semibold">
                  Account Information
                </h1>
                <p className="text-xs text-muted-foreground mt-1">
                  Update your account information any time.
                </p>
              </div>

              <ProfileImageUpload
                isUser={true}
                defaultName={user?.fullname}
                defaultImage={user?.profile_image}
                onImageSelect={onImageSelect}
              />

              <div className="grid gap-2">
                <Label htmlFor="fullname">Full Name</Label>
                <Input
                  id="fullname"
                  type="text"
                  placeholder="Your name"
                  className="text-xs md:text-sm"
                  {...register("fullname")}
                />
                {errors.fullname && (
                  <p className="text-red-500 text-xs">
                    {errors.fullname.message}
                  </p>
                )}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={user?.email}
                  disabled
                  className="text-xs md:text-sm"
                />
              </div>

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Updating..." : "Update Account"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
