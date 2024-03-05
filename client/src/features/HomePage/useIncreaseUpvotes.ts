import { useMutation, useQueryClient } from "@tanstack/react-query";
import { increaseUpvotesApi } from "../../services/api";

export function useIncreaseUpvotes() {
  const queryClient = useQueryClient();
  const { mutate: increaseUpvotes, isPending: isIncreasing } = useMutation({
    mutationFn: (id: string) => increaseUpvotesApi(id),
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });

  return { increaseUpvotes, isIncreasing };
}
