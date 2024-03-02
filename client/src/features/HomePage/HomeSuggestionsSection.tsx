import HomeSuggestionBox from "./HomeSuggestionBox";

import { RiArrowDownSLine } from "react-icons/ri";
import { HiPlusSmall } from "react-icons/hi2";
import { FaCheck } from "react-icons/fa6";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { productType } from "../../types/types";
import EmptySuggestions from "./EmptySuggestions";

function HomeSuggestionsSection({
  getSuggestedFeedbacks,
}: {
  getSuggestedFeedbacks: productType[];
}) {
  console.log(getSuggestedFeedbacks);
  const [searchParams] = useSearchParams();

  const isCategoryInQuery = searchParams.get("category");
  const sortQuery = searchParams.get("sortBy");

  const [isOpen, setIsOpen] = useState(false);
  const [sortBy, setIsSortBy] = useState(sortQuery || "most-upvotes");

  function handleClickSortBy(value: string) {
    setIsOpen(!isOpen);
    setIsSortBy(value);
  }

  function handleQueryString(value: string) {
    return isCategoryInQuery
      ? `?category=${isCategoryInQuery}&sortBy=${value}`
      : `?sortBy=${value}`;
  }

  function unSlugify(text: string) {
    return text
      .replace(/-/g, " ")
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  return (
    <section>
      <header className="flex items-center gap-[3.8rem] rounded-[1rem] bg-[#373f68] px-[2.4rem] py-[1.4rem]">
        <div className="flex items-center gap-8">
          <img
            src="./suggestions/icon-suggestions.svg"
            alt="suggestions icon"
          />
          <h2 className="text-[1.8rem] font-bold tracking-[-0.025rem] text-white">
            {getSuggestedFeedbacks.length} Suggestions
          </h2>
        </div>

        <div
          className="relative flex cursor-pointer items-center gap-6"
          onClick={() => setIsOpen(!isOpen)}
        >
          <p className="text-[1.4rem] text-[#f2f4fe]">Sort by</p>
          <button className="flex items-center gap-2 text-[#f2f4fe]">
            <span className="text-[1.4rem] font-bold">{unSlugify(sortBy)}</span>
            <RiArrowDownSLine size={"2rem"} />
          </button>

          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                exit={{ scaleY: 0 }}
                transition={{
                  duration: 0.2,
                  ease: "easeInOut",
                  type: "spring",
                }}
                className="absolute top-[6rem] w-[22rem] divide-y-[1px] divide-[#3a4374] divide-opacity-15 rounded-[1rem] bg-white shadow-modal-sh"
              >
                <Link
                  to={handleQueryString("most-upvotes")}
                  className="flex items-center justify-between px-[2.4rem] py-[1.2rem]"
                  onClick={handleClickSortBy.bind(null, "most-upvotes")}
                >
                  <p className="cursor-pointer text-[1.6rem] text-[#647196] transition-all duration-300 hover:text-[#ad1fea]">
                    Most Upvotes
                  </p>
                  {sortBy === "most-upvotes" && (
                    <FaCheck color="#ad1fea" size={"1.5rem"} />
                  )}
                </Link>
                <Link
                  to={handleQueryString("least-upvotes")}
                  className="flex items-center justify-between px-[2.4rem] py-[1.2rem]"
                  onClick={handleClickSortBy.bind(null, "least-upvotes")}
                >
                  <p className="cursor-pointer text-[1.6rem] text-[#647196] transition-all duration-300 hover:text-[#ad1fea]">
                    Least Upvotes
                  </p>
                  {sortBy === "least-upvotes" && (
                    <FaCheck color="#ad1fea" size={"1.5rem"} />
                  )}
                </Link>
                <Link
                  to={handleQueryString("most-comments")}
                  className="flex items-center justify-between px-[2.4rem] py-[1.2rem]"
                  onClick={handleClickSortBy.bind(null, "most-comments")}
                >
                  <p className="cursor-pointer text-[1.6rem] text-[#647196] transition-all duration-300 hover:text-[#ad1fea]">
                    Most Comments
                  </p>
                  {sortBy === "most-comments" && (
                    <FaCheck color="#ad1fea" size={"1.5rem"} />
                  )}
                </Link>
                <Link
                  to={handleQueryString("least-comments")}
                  className="flex items-center justify-between px-[2.4rem] py-[1.2rem]"
                  onClick={handleClickSortBy.bind(null, "least-comments")}
                >
                  <p className="cursor-pointer text-[1.6rem] text-[#647196] transition-all duration-300 hover:text-[#ad1fea]">
                    Least Comments
                  </p>
                  {sortBy === "least-comments" && (
                    <FaCheck color="#ad1fea" size={"1.5rem"} />
                  )}
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <Link
          to="/create-feedback"
          className="ml-auto flex items-center gap-1 rounded-[1rem] bg-[#ad1fea] px-[2.4rem] py-5 text-[#f2f4fe] transition-all duration-300 hover:bg-[#c75af6]"
        >
          <HiPlusSmall size={"2rem"} />
          <span className="text-[1.4rem] font-bold">Add Feedback</span>
        </Link>
      </header>

      {getSuggestedFeedbacks.length > 0 ? (
        <div className="flex flex-col gap-8 pt-[2.4rem]">
          {getSuggestedFeedbacks.map((feedback) => (
            <HomeSuggestionBox key={feedback._id} feedback={feedback} />
          ))}
        </div>
      ) : (
        <EmptySuggestions />
      )}
    </section>
  );
}

export default HomeSuggestionsSection;
