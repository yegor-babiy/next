import { flattenError, ZodError } from "zod";

export type ActionState<T = any> =
  | {
      status?: "SUCCESS" | "ERROR";
      message: string;
      payload?: FormData;
      fieldErrors?: Record<string, string[]>;
      timestamp: number;
      data?: T;
    }
  | undefined;

export const EMPTY_ACTION_STATE: ActionState = {
  message: "",
  fieldErrors: {},
  timestamp: Date.now()
};

export const fromErrorToActionState = (
  error: unknown,
  formData?: FormData
): ActionState => {
  if (error instanceof ZodError) {
    return {
      status: "ERROR",
      message: "",
      fieldErrors: flattenError(error).fieldErrors,
      payload: formData,
      timestamp: Date.now()
    };
  }
  if (error instanceof Error) {
    return {
      status: "ERROR",
      message: error.message,
      fieldErrors: {},
      payload: formData,
      timestamp: Date.now()
    };
  }
  return {
    status: "ERROR",
    message: "An unknown error occurred",
    fieldErrors: {},
    payload: formData,
    timestamp: Date.now()
  };
};

export const toActionState = (
  status: NonNullable<ActionState>["status"],
  message: string,
  formData?: FormData,
  data?: unknown
): ActionState => ({
  status,
  message,
  payload: formData,
  fieldErrors: {},
  timestamp: Date.now(),
  data
});
