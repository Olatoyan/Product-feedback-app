import { useQuery } from "@tanstack/react-query";
import { getAllFeedbacksApi } from "../../services/api";

export function useGetAllFeedbacks() {
  const { data, isPending: isAllFeedbackPending } = useQuery({
    queryKey: ["all-feedbacks"],
    queryFn: getAllFeedbacksApi,
  });

  const allFeedbacks = data?.data?.products;

  return { allFeedbacks, isAllFeedbackPending };
}
