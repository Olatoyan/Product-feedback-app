import { useQuery } from "@tanstack/react-query";
import { getAllFeedbackApi } from "../../services/api";
import { useSearchParams } from "react-router-dom";

export function useGetFeedbacks() {
  const [searchParams] = useSearchParams();

  const category = searchParams.get("category");
  const sortBy = searchParams.get("sortBy");

  const { data, isPending: isPendingGetFeedbacks } = useQuery({
    queryKey: ["getFeedbacks", category, sortBy],
    queryFn: () => getAllFeedbackApi(category!, sortBy!),
  });
  const getFeedbacks = data?.data?.products;
  return { getFeedbacks, isPendingGetFeedbacks };
}
