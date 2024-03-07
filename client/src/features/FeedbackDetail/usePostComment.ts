import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postCommentApi } from "../../services/api";

export function usePostComment() {
  const queryClient = useQueryClient();
  const { mutate: postComment, isPending: isCommenting } = useMutation({
    mutationFn: (data: { comment: string; id: string; userId: string }) =>
      postCommentApi(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["feedback"] });
    },
  });

  return { postComment, isCommenting };
}
