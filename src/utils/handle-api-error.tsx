type ApiError = {
  response?: {
    data?: {
      message?: string;
      description?: string;
    };
  };
  message?: string;
  error?: string;
};

type ParsedApiError = {
  message: string;
  description?: string;
};

const handlApiError = (
  requestError: ApiError,
  fallbackMessage: string = "Something went wrong"
): ParsedApiError => {
  const message =
    requestError?.response?.data?.message ||
    requestError?.message ||
    requestError?.error ||
    fallbackMessage;

  const description = requestError?.response?.data?.description;

  if (!message) {
    return null;
  }

  return { message, ...(description && { description }) };
};

export default handlApiError;
