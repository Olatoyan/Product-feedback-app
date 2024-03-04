import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editReplyApi } from "../../services/api";

export function useEditReply() {
  const queryClient = useQueryClient();
  const { mutate: editReply, isPending: isEditingReply } = useMutation({
    mutationFn: (data: { id: string; comment: string }) => editReplyApi(data),
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });

  return { editReply, isEditingReply };
}
