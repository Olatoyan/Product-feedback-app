import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postReplyApi } from "../../services/api";

export function usePostReply() {
  const queryClient = useQueryClient();

  const { mutate: postReply, isPending: isReplying } = useMutation({
    mutationFn: (data: {
      comment: string;
      id: string;
      username: string;
      userId: string;
    }) => postReplyApi(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["feedback"] });
    },
  });

  return { postReply, isReplying };
}
