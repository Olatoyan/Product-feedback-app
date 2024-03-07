import { useMutation } from "@tanstack/react-query";
import { createFeedBackApi } from "../../services/api";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
export function useCreateFeedback() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: createFeedback, isPending: isCreatingFeedback } = useMutation(
    {
      mutationFn: (data: {
        title: string;
        category: string;
        detail: string;
        createdBy: string;
      }) => createFeedBackApi(data),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["getSuggestedFeedbacks"] });
        navigate("/");
      },
    },
  );

  return { createFeedback, isCreatingFeedback };
}
