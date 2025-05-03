import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import LoginImage from "@/assets/images/login-influencrin-form-image.png";
import { loginSchema, LoginSchemaType } from "../schemas/auth/log-in-schema";

import { useAuth } from "@/hooks/use-auth";
import { redirect, useLocation } from "react-router-dom";

export default function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
  });
  const location = useLocation();
  const from = location.state?.from?.pathname || "/my-account";

  const { login } = useAuth();

  const onSubmit = async (data: LoginSchemaType) => {
    await login(data, from);
    // reset();
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
                <h1 className="text-2xl font-semibold">Log in</h1>
                <p className="text-xs text-muted-foreground mt-1">
                  Manage or review influencers in your niche.
                </p>
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
                {errors.password?.message && (
                  <p className="text-xs text-red-500">
                    {errors.password.message}
                  </p>
                )}
              </div>
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Logging in..." : "Log in"}
              </Button>
              {/* Social buttons */}
              {/* <SocialMediaAuthButtons /> */}
            </div>
          </form>
          <div className="hidden md:flex items-center justify-center">
            <img
              src={LoginImage}
              alt="Login"
              className="max-w-[380px] dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
