import { useQuery } from "@tanstack/react-query";
import { getAllSuggestedFeedbackApi } from "../../services/api";
import { useSearchParams } from "react-router-dom";

export function useGetSuggestedFeedbacks() {
  const [searchParams] = useSearchParams();

  const category = searchParams.get("category");
  const sortBy = searchParams.get("sortBy");

  const { data, isPending: isPendingGetFeedbacks } = useQuery({
    queryKey: ["getSuggestedFeedbacks", category, sortBy],
    queryFn: () => getAllSuggestedFeedbackApi(category!, sortBy!),
  });
  const getSuggestedFeedbacks = data?.data?.products;
  return { getSuggestedFeedbacks, isPendingGetFeedbacks };
}
