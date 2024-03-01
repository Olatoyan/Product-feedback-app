import { useSearchParams } from "react-router-dom";
import HomeSuggestionsSection from "./HomeSuggestionsSection";
import Sidebar from "./Sidebar";
import { useGetFeedbacks } from "./useGetFeedbacks";
import { useEffect } from "react";

function HomePage() {
  const { getFeedbacks, isPendingGetFeedbacks } = useGetFeedbacks();

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    setSearchParams({ category: "all", sortBy: "most-upvotes" });
  }, [setSearchParams]);

  if (isPendingGetFeedbacks)
    return <p>Loading...............................</p>;

  return (
    <div className="grid grid-cols-[auto_1fr] gap-12 p-16">
      <Sidebar getFeedbacks={getFeedbacks} />
      <HomeSuggestionsSection />
    </div>
  );
}

export default HomePage;
