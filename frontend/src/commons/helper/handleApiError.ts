import toast from "react-hot-toast";
import axios from "axios";

interface ApiFieldError {
  field: string;
  message: string;
}

interface ApiErrorBody {
  message?: string;
  errors?: ApiFieldError[] | Record<string, string>;
}

/**
 * Parses API errors (string / array / object) and fires toast notifications.
 */
export function handleApiError(error: unknown): void {
  console.log("908989808908908989890");
  if (typeof error === "string") {
    toast.error(error);
    return;
  }

  if (axios.isAxiosError(error)) {
    const data = error.response?.data as ApiErrorBody | undefined;

    if (data) {
      if (Array.isArray(data.errors)) {
        data.errors.forEach((e) => toast.error(`${e.field}: ${e.message}`));
        return;
      }
      if (typeof data.errors === "object" && data.errors !== null) {
        Object.entries(data.errors as Record<string, string>).forEach(
          ([field, msg]) => toast.error(`${field}: ${msg}`),
        );
        return;
      }
      if (typeof data.message === "string") {
        toast.error(data.message);
        return;
      }
    }
    toast.error(error.message || "Request failed");
    return;
  }

  if (error instanceof Error) {
    toast.error(error.message);
    return;
  }

  toast.error("Đã xảy ra lỗi không xác định");
}
