import { useQuery } from "@tanstack/react-query";
import { getProductApi } from "../../services/api";
import { useParams } from "react-router-dom";

export function useGetFeedback() {
  const { feedbackId } = useParams();
  const { data, isPending: isGettingFeedback } = useQuery({
    queryKey: ["feedback", feedbackId],
    queryFn: () => getProductApi(feedbackId!),
  });
  const getFeedback = data?.data?.product;

  return { getFeedback, isGettingFeedback };
}
