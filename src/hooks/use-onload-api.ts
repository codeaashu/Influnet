import { handlApiError } from "@/utils";
import { useState } from "react";

// Type for the API function
type ApiFunc<T> = (...args: any[]) => Promise<T>;

// New return type with error passed directly
type UseApiReturn<T> = {
  request: (...args: any[]) => Promise<{ data?: T; error?: string }>;
  loading: boolean;
  errorMessage: string | null; // Still keeping state version if needed
};

const useOnloadApi = <T>(apiFunc: ApiFunc<T>): UseApiReturn<T> => {
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const request = async (
    ...args: any[]
  ): Promise<{ data?: T; error?: string }> => {
    setLoading(true);
    setErrorMessage(null);
    try {
      const result = await apiFunc(...args);
      return { data: result };
    } catch (err) {
      const error = handlApiError(err);
      setErrorMessage(error);
      return { error };
    } finally {
      setLoading(false);
    }
  };

  return { request, loading, errorMessage };
};

export default useOnloadApi;
