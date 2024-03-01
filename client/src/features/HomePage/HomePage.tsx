import { useSearchParams } from "react-router-dom";
import HomeSuggestionsSection from "./HomeSuggestionsSection";
import Sidebar from "./Sidebar";
import { useGetSuggestedFeedbacks } from "./useGetSuggestedFeedbacks";
import { useEffect } from "react";
import { useGetAllFeedbacks } from "./useGetAllFeedbacks";

function HomePage() {
  const { getSuggestedFeedbacks, isPendingGetFeedbacks } =
    useGetSuggestedFeedbacks();
  const { allFeedbacks, isAllFeedbackPending } = useGetAllFeedbacks();

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const categoryQuery = searchParams.get("category");
    const isSortInQuery = searchParams.get("sortBy");

    if (!categoryQuery && !isSortInQuery)
      setSearchParams({ category: "all", sortBy: "most-upvotes" });
  }, [setSearchParams, searchParams]);

  if (isPendingGetFeedbacks || isAllFeedbackPending)
    return <p>Loading...............................</p>;

  return (
    <div className="grid grid-cols-[auto_1fr] gap-12 p-16">
      <Sidebar allFeedbacks={allFeedbacks} />
      <HomeSuggestionsSection getSuggestedFeedbacks={getSuggestedFeedbacks} />
    </div>
  );
}

export default HomePage;