import { useMutation, useQueryClient } from "@tanstack/react-query";
import { increaseUpvotesApi } from "../../services/api";

export function useIncreaseUpvotes() {
  const queryClient = useQueryClient();
  const { mutate: increaseUpvotes, isPending: isIncreasing } = useMutation({
    mutationFn: (data: { id: string; user: string }) =>
      increaseUpvotesApi(data),
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });

  return { increaseUpvotes, isIncreasing };
}
