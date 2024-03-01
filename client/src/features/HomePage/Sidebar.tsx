import { Link } from "react-router-dom";
import SidebarCategories from "./SidebarCategories";
import SidebarRoadmap from "./SidebarRoadmap";

import { productType } from "../../types/types";

function Sidebar({ allFeedbacks }: { allFeedbacks: productType[] }) {
  const liveData = allFeedbacks.filter((data) => data.status === "live");
  const plannedData = allFeedbacks.filter((data) => data.status === "planned");
  const inProgressData = allFeedbacks.filter(
    (data) => data.status === "in-progress",
  );

  return (
    <aside className="max-w-[25.5rem] space-y-[2.4rem]">
      <div className="flex h-[13.7rem] flex-col justify-end rounded-[1rem] bg-suggestion-desktop bg-cover pb-6 pl-6">
        <h1 className="text-[2rem] font-bold tracking-[-0.025rem] text-white">
          Frontend Mentor
        </h1>
        <h2 className="text-[1.5rem] font-medium text-white text-opacity-75">
          Feedback Board
        </h2>
      </div>

      <div className="flex flex-wrap items-center gap-x-[0.8rem] gap-y-8 rounded-[1rem] bg-white p-[2.4rem]">
        <SidebarCategories category="All" />
        <SidebarCategories category="UI" />
        <SidebarCategories category="UX" />
        <SidebarCategories category="Enhancement" />
        <SidebarCategories category="Bug" />
        <SidebarCategories category="Feature" />
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
          <SidebarRoadmap status="In-Progress" number={inProgressData.length} />
          <SidebarRoadmap status="Live" number={liveData.length} />
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
