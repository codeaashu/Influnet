import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import JoinInfluncrInImage from "@/assets/images/join-influencrin-form-image.png";
import {
  registrationSchema,
  RegistrationSchemaSchemaType,
} from "../schemas/auth/registration-schema";
import { useAuth } from "@/hooks/use-auth";

export default function JoinInfluencrInForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<RegistrationSchemaSchemaType>({
    resolver: zodResolver(registrationSchema),
  });

  const { registerUser } = useAuth();

  const onSubmit = async (registrationData: RegistrationSchemaSchemaType) => {
    registerUser(registrationData);
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0 border border-gray-200 shadow-none">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="p-6 md:p-8 border-r z-50 bg-white"
          >
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center mb-3">
                <h1 className="text-2xl font-semibold">
                  Join Influencr<span className="text-primary">In</span>
                </h1>
                <p className="text-xs text-muted-foreground mt-1">
                  Manage or review influencers in your niche.
                </p>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="fullname">Full Name</Label>
                <Input
                  id="fullname"
                  placeholder="Your name"
                  className="text-xs md:text-sm"
                  {...register("fullname")}
                />
                {errors.fullname && (
                  <p className="text-xs text-red-500">
                    {errors.fullname.message}
                  </p>
                )}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  className="text-xs md:text-sm"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-xs text-red-500">{errors.email.message}</p>
                )}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  className="text-xs md:text-sm"
                  {...register("password")}
                />
                {errors.password && (
                  <p className="text-xs text-red-500">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Joining" : "Join"}
              </Button>

              <div className="text-center text-xs md:text-sm">
                Already have an account?
                <Link to="/login" className="ml-2 font-semibold text-primary">
                  Log in
                </Link>
              </div>
            </div>
          </form>

          <div className="hidden md:flex items-center justify-center">
            <img
              src={JoinInfluncrInImage}
              alt="Join"
              className="max-w-[440px] dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
