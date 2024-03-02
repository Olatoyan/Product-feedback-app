import { useMutation } from "@tanstack/react-query";
import { createFeedBackApi } from "../../services/api";
import { useQueryClient } from "@tanstack/react-query";
export function useCreateFeedback() {
  const queryClient = useQueryClient();

  const { mutate: createFeedback, isPending: isCreatingFeedback } = useMutation(
    {
      mutationFn: (data: { title: string; category: string; detail: string }) =>
        createFeedBackApi(data),
      onSuccess: () => {
        console.log("Success");
        queryClient.invalidateQueries({ queryKey: ["getSuggestedFeedbacks"] });
      },
    },
  );

  return { createFeedback, isCreatingFeedback };
}
