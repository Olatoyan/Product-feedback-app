import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postReplyApi } from "../../services/api";

export function usePostReply() {
  const queryClient = useQueryClient();

  const { mutate: postReply, isPending: isReplying } = useMutation({
    mutationFn: (data: { comment: string; id: string; username: string }) =>
      postReplyApi(data),
    onSuccess: () => {
      console.log("success");
      queryClient.invalidateQueries({ queryKey: ["all-feedbacks"] });
    },
  });

  return { postReply, isReplying };
}