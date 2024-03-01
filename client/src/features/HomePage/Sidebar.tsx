import { Link } from "react-router-dom";
import SidebarCategories from "./SidebarCategories";
import SidebarRoadmap from "./SidebarRoadmap";
import { useState } from "react";

function Sidebar() {
  const [checkCategory, setCheckCategory] = useState("All");

  function handleChangeCategory(value: string) {
    setCheckCategory(value);
  }

  return (
    <aside className="max-w-[25.5rem] space-y-[2.4rem]">
      <div className="bg-suggestion-desktop flex h-[13.7rem] flex-col justify-end rounded-[1rem] bg-cover pb-6 pl-6">
        <h1 className="text-[2rem] font-bold tracking-[-0.025rem] text-white">
          Frontend Mentor
        </h1>
        <h2 className="text-[1.5rem] font-medium text-white text-opacity-75">
          Feedback Board
        </h2>
      </div>

      <div className="flex flex-wrap items-center gap-x-[0.8rem] gap-y-8 rounded-[1rem] bg-white p-[2.4rem]">
        <SidebarCategories
          category="All"
          checkCategory={checkCategory}
          handleChangeCategory={handleChangeCategory}
        />
        <SidebarCategories
          category="UI"
          checkCategory={checkCategory}
          handleChangeCategory={handleChangeCategory}
        />
        <SidebarCategories
          category="UX"
          checkCategory={checkCategory}
          handleChangeCategory={handleChangeCategory}
        />
        <SidebarCategories
          category="Enhancement"
          checkCategory={checkCategory}
          handleChangeCategory={handleChangeCategory}
        />
        <SidebarCategories
          category="Bug"
          checkCategory={checkCategory}
          handleChangeCategory={handleChangeCategory}
        />
        <SidebarCategories
          category="Feature"
          checkCategory={checkCategory}
          handleChangeCategory={handleChangeCategory}
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
          <SidebarRoadmap status="Planned" number={2} />
          <SidebarRoadmap status="In-Progress" number={3} />
          <SidebarRoadmap status="Live" number={1} />
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
