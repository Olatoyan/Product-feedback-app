import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editCommentApi } from "../../services/api";

export function useEditComment() {
  const queryClient = useQueryClient();
  const { mutate: editComment, isPending: isEditingComment } = useMutation({
    mutationFn: (data: { id: string; comment: string }) => editCommentApi(data),
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });

  return { editComment, isEditingComment };
}
