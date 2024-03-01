import HomeSuggestionBox from "./HomeSuggestionBox";

import { RiArrowDownSLine } from "react-icons/ri";
import { HiPlusSmall } from "react-icons/hi2";
import { FaCheck } from "react-icons/fa6";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

function HomeSuggestionsSection() {
  const [isOpen, setIsOpen] = useState(false);
  const [sortBy, setIsSortBy] = useState("Most upvotes");

  function handleClickSortBy(value: string) {
    setIsOpen(!isOpen);
    setIsSortBy(value);
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
            6 Suggestions
          </h2>
        </div>

        <div
          className="relative flex cursor-pointer items-center gap-6"
          onClick={() => setIsOpen(!isOpen)}
        >
          <p className="text-[1.4rem] text-[#f2f4fe]">Sort by</p>
          <button className="flex items-center gap-2 text-[#f2f4fe]">
            <span className="text-[1.4rem] font-bold">{sortBy}</span>
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
                <div
                  className="flex items-center justify-between px-[2.4rem] py-[1.2rem]"
                  onClick={handleClickSortBy.bind(null, "Most upvotes")}
                >
                  <p className="cursor-pointer text-[1.6rem] text-[#647196] transition-all duration-300 hover:text-[#ad1fea]">
                    Most upvotes
                  </p>
                  {sortBy === "Most upvotes" && (
                    <FaCheck color="#ad1fea" size={"1.5rem"} />
                  )}
                </div>
                <div
                  className="flex items-center justify-between px-[2.4rem] py-[1.2rem]"
                  onClick={handleClickSortBy.bind(null, "Least upvotes")}
                >
                  <p className="cursor-pointer text-[1.6rem] text-[#647196] transition-all duration-300 hover:text-[#ad1fea]">
                    Least upvotes
                  </p>
                  {sortBy === "Least upvotes" && (
                    <FaCheck color="#ad1fea" size={"1.5rem"} />
                  )}
                </div>
                <div
                  className="flex items-center justify-between px-[2.4rem] py-[1.2rem]"
                  onClick={handleClickSortBy.bind(null, "Most comments")}
                >
                  <p className="cursor-pointer text-[1.6rem] text-[#647196] transition-all duration-300 hover:text-[#ad1fea]">
                    Most Comments
                  </p>
                  {sortBy === "Most comments" && (
                    <FaCheck color="#ad1fea" size={"1.5rem"} />
                  )}
                </div>
                <div
                  className="flex items-center justify-between px-[2.4rem] py-[1.2rem]"
                  onClick={handleClickSortBy.bind(null, "Least comments")}
                >
                  <p className="cursor-pointer text-[1.6rem] text-[#647196] transition-all duration-300 hover:text-[#ad1fea]">
                    Least Comments
                  </p>
                  {sortBy === "Least comments" && (
                    <FaCheck color="#ad1fea" size={"1.5rem"} />
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <button className="ml-auto flex items-center gap-1 rounded-[1rem] bg-[#ad1fea] px-[2.4rem] py-5 text-[#f2f4fe] transition-all duration-300 hover:bg-[#c75af6]">
          <HiPlusSmall size={"2rem"} />
          <span className="text-[1.4rem] font-bold">Add Feedback</span>
        </button>
      </header>

      <div className="flex flex-col gap-8 pt-[2.4rem]">
        <HomeSuggestionBox />
        <HomeSuggestionBox />
        <HomeSuggestionBox />
        <HomeSuggestionBox />
      </div>
    </section>
  );
}

export default HomeSuggestionsSection;
