import { jwtDecode } from "jwt-decode";

import { authApiService } from "@/api/endpoints";
import { RegistrationSchemaSchemaType } from "@/components/forms/schemas/auth/registration-schema";
import { LoginSchemaType } from "@/components/forms/schemas/auth/log-in-schema";
import ToastDescription from "@/components/toast/toast-description";
import { AuthContext } from "@/contexts";
import { useApi } from "@/hooks";
import { useState, ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import useOnloadApi from "@/hooks/use-onload-api";

export interface User {
  id: string;
  fullname: string;
  email: string;
  profile_image?: string | null;
  exp?: number;
}

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);

  // Fetch user data on app load
  const { request, loading: userLoading } = useOnloadApi(
    authApiService.getProfile
  );

  const fetchUser = async () => {
    const { data: userFetchingResponse } = await request();
    if (userFetchingResponse) {
      setUser(userFetchingResponse.user);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  // User registration api call
  const { request: registrationRequest } = useApi(authApiService.register);
  const registerUser = async (
    registrationData: RegistrationSchemaSchemaType
  ) => {
    const { data: registrationResponse, error: registrationError } =
      await registrationRequest(registrationData);
    if (registrationResponse) {
      toast.success("Welcome to InfluencrIn", {
        description: (
          <ToastDescription description={registrationResponse.message} />
        ),
      });
      navigate("/login");
    } else if (registrationError) {
      toast.error("Failed to join", {
        description: (
          <ToastDescription description={registrationError.message} />
        ),
      });
    }
  };

  // User login api call
  const { request: loginRequest } = useApi(authApiService.login);
  const login = async (loginData: LoginSchemaType, redirectUrl: string) => {
    const { data: loginResponse, error } = await loginRequest(loginData);

    if (loginResponse) {
      localStorage.setItem("token", loginResponse.token);
      const loggedUserData = jwtDecode<User>(loginResponse.token);
      setUser(loggedUserData);
      navigate(redirectUrl, { replace: true });

      toast.success("Welcome", {
        description: <ToastDescription description={loginResponse.message} />,
      });
    } else if (error) {
      toast.error("Login failed", {
        description: <ToastDescription description={error.message} />,
      });
    }
  };

  const isMe = (userId) => {
    return user.id == userId;
  };

  // User logout api call
  const logout = async () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
    toast.error("You're logged out");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        userLoading,
        setUser,
        isMe,
        login,
        registerUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
