import { AxiosError } from "axios";

type ErrorResponse = {
  message?: string;
  errors?: Record<string, string[]>;
};

export const parseErrorMessage = (err: unknown): string => {
  if (err && typeof err === "object" && "response" in err) {
    const axiosErr = err as AxiosError<ErrorResponse>;
    const fieldErrors = axiosErr.response?.data?.errors;

    if (fieldErrors) {
      return Object.entries(fieldErrors)
        .map(([field, errors]) => `${field}: ${errors.join(", ")}`)
        .join("\n");
    }

    return axiosErr.response?.data?.message || "Something went wrong.";
  }

  return "Something went wrong.";
};
