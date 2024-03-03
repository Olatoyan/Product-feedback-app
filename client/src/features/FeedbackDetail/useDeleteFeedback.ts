import { useMutation } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { deleteFeedbackApi } from "../../services/api";

export function useDeleteFeedback() {
  const { feedbackId } = useParams();
  const navigate = useNavigate();
  const { mutate: deleteFeedback, isPending: isDeletingFeedback } = useMutation(
    {
      mutationFn: () => deleteFeedbackApi(feedbackId!),
      onSuccess: () => {
        navigate("/");
      },
    },
  );

  return { deleteFeedback, isDeletingFeedback };
}
