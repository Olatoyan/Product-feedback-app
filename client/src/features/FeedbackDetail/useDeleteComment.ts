import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCommentApi } from "../../services/api";

export function useDeleteComment() {
  const queryClient = useQueryClient();

  const { mutate: deleteComment, isPending: isDeletingComment } = useMutation({
    mutationFn: (id: string) => deleteCommentApi(id),
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });

  return { deleteComment, isDeletingComment };
}
