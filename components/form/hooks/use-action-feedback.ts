import { useEffect, useEffectEvent, useRef } from "react";
import { ActionState } from "../utils/to-action-state";

type onArgs = {
  actionState: ActionState;
};

type useActionFeedbackOptions = {
  onSuccess?: (onArgs: onArgs) => void;
  onError?: (onArgs: onArgs) => void;
};

export const useActionFeedback = (
  actionState: ActionState,
  options: useActionFeedbackOptions
) => {
  const prevTimestamp = useRef(actionState?.timestamp);
  const handleSuccess = useEffectEvent(() => {
    options.onSuccess?.({ actionState });
  });

  const handleError = useEffectEvent(() => {
    options.onError?.({ actionState });
  });

  useEffect(() => {
    if (prevTimestamp.current === actionState?.timestamp) return;

    if (actionState?.status === "SUCCESS") {
      handleSuccess();
    }

    if (actionState?.status === "ERROR") {
      handleError();
    }

    prevTimestamp.current = actionState?.timestamp;
  }, [actionState]);
};
