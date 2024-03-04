import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteReplyApi } from "../../services/api";

export function useDeleteReply() {
  const queryClient = useQueryClient();

  const { mutate: deleteReply, isPending: isDeletingReply } = useMutation({
    mutationFn: (id: string) => deleteReplyApi(id),
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });

  return { deleteReply, isDeletingReply };
}
