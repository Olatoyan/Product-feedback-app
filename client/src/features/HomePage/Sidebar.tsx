import { Link } from "react-router-dom";
import SidebarCategories from "./SidebarCategories";
import SidebarRoadmap from "./SidebarRoadmap";

import { productType } from "../../types/types";
import { useState } from "react";

import { AnimatePresence, motion } from "framer-motion";

function Sidebar({ allFeedbacks }: { allFeedbacks: productType[] }) {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const liveData = allFeedbacks.filter((data) => data.status === "live");
  const plannedData = allFeedbacks.filter((data) => data.status === "planned");
  const inProgressData = allFeedbacks.filter(
    (data) => data.status === "in-progress",
  );

  function handleToggleNav() {
    setIsNavOpen((prev) => !prev);
  }

  function handleCloseNav() {
    setIsNavOpen(false);
  }
  return (
    <aside className="tablet:relative tablet:grid-cols-1 tablet:h-[7.5rem] max-w-[25.5rem] space-y-[2.4rem] laptop:grid laptop:h-[18rem] laptop:w-full laptop:max-w-full laptop:grid-cols-[1fr_2fr] laptop:gap-4 laptop:space-y-0">
      <div className="tablet:bg-suggestion-mobile tablet:fixed tablet:w-full tablet:top-0 tablet:left-0 tablet:h-[inherit] tablet:pb-0 tablet:rounded-none z-[11] flex h-[13.7rem] items-center justify-between rounded-[1rem] bg-suggestion-desktop bg-cover px-6 pb-6 laptop:h-auto laptop:bg-suggestion-tablet">
        <div className="tablet:self-center flex flex-col self-end">
          <h1 className="tablet:text-[1.5rem] tablet:tracking-[-0.0187rem] text-[2rem] font-bold tracking-[-0.025rem] text-white">
            Frontend Mentor
          </h1>
          <h2 className="tablet:text-[1.3rem] text-[1.5rem] font-medium text-white text-opacity-75">
            Feedback Board
          </h2>
        </div>

        <button className="tablet:flex hidden" onClick={handleToggleNav}>
          <AnimatePresence>
            {isNavOpen ? (
              <motion.img
                src="../shared/mobile/icon-close.svg"
                alt="close"
                initial={{ rotate: 180 }}
                animate={{ rotate: isNavOpen ? 0 : 180 }}
              />
            ) : (
              <motion.img
                src="../shared/mobile/icon-hamburger.svg"
                alt="menu"
                initial={{ rotate: 0 }}
                animate={{ rotate: isNavOpen ? 180 : 0 }}
              />
            )}
          </AnimatePresence>
        </button>
      </div>

      <div
        className={`tablet:fixed tablet:top-[7.5rem] tablet:right-0 tablet:h-full tablet:bg-[#f7f8fd] tablet:flex tablet:flex-col tablet:w-[75%] z-[11] space-y-[2.4rem] laptop:grid laptop:grid-cols-2 laptop:gap-4 laptop:space-y-0 ${isNavOpen ? "tablet:block" : "tablet:hidden"}`}
      >
        <div className="flex flex-wrap items-center gap-x-[0.8rem] gap-y-8 rounded-[1rem] bg-white p-[2.4rem]">
          <SidebarCategories category="All" handleToggleNav={handleCloseNav} />
          <SidebarCategories category="UI" handleToggleNav={handleCloseNav} />
          <SidebarCategories category="UX" handleToggleNav={handleCloseNav} />
          <SidebarCategories
            category="Enhancement"
            handleToggleNav={handleCloseNav}
          />
          <SidebarCategories category="Bug" handleToggleNav={handleCloseNav} />
          <SidebarCategories
            category="Feature"
            handleToggleNav={handleCloseNav}
          />
        </div>

        <div className="rounded-[1rem] bg-white p-[2.4rem]">
          <div className="flex items-center justify-between pb-[2.4rem]">
            <h3 className="text-[1.8rem] font-bold tracking-[-0.025rem] text-[#3a4374]">
              Roadmap
            </h3>
            <Link
              className="text-[1.3rem] font-semibold text-[#4661e6] underline transition-all duration-300 hover:text-[#8397fb]"
              to="/roadmap"
            >
              View
            </Link>
          </div>
          <div className="flex flex-col gap-[0.8rem]">
            <SidebarRoadmap status="Planned" number={plannedData.length} />
            <SidebarRoadmap
              status="In-Progress"
              number={inProgressData.length}
            />
            <SidebarRoadmap status="Live" number={liveData.length} />
          </div>
        </div>
      </div>

      {isNavOpen && (
        <div className="fixed left-0 top-0 z-[10] h-full w-full bg-black bg-opacity-50"></div>
      )}
    </aside>
  );
}

export default Sidebar;
