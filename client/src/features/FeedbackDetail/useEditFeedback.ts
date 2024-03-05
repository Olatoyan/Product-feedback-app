import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { editFeedbackApi } from "../../services/api";

export function useEditFeedback() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { feedbackId } = useParams();

  const { mutate: editFeedback, isPending: isEditingFeedback } = useMutation({
    mutationFn: (data: {
      title: string;
      category: string;
      detail: string;
      status: string;
    }) => editFeedbackApi({ id: feedbackId!, ...data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["feedback", feedbackId] });
      navigate(-1);
    },
  });

  return { editFeedback, isEditingFeedback };
}
