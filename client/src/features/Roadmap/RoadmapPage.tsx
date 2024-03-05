import { useState } from "react";
import { productType } from "../../types/types";
import Loader from "../../ui/Loader";
import { useGetAllFeedbacks } from "../HomePage/useGetAllFeedbacks";
import RoadmapHeader from "./RoadmapHeader";
import RoadmapStatusBox from "./RoadmapStatusBox";

function RoadmapPage() {
  const { allFeedbacks, isAllFeedbackPending } = useGetAllFeedbacks();
  const [roadmap, setRoadmap] = useState("planned");

  if (isAllFeedbackPending) return <Loader />;

  const liveData = allFeedbacks.filter(
    (data: productType) => data.status === "live",
  );
  const plannedData = allFeedbacks.filter(
    (data: productType) => data.status === "planned",
  );
  const inProgressData = allFeedbacks.filter(
    (data: productType) => data.status === "in-progress",
  );

  const isMobile = window.innerWidth <= 700;

  return (
    <section className="px-[17rem] py-28 laptop:px-[2.4rem] tablet:px-0 tablet:pt-0">
      <RoadmapHeader />

      <div className="hidden border-b tablet:flex tablet:items-center tablet:justify-between tablet:px-[2.4rem] tablet:pt-8">
        <p
          className={`${roadmap === "planned" ? "border-[#f49f85] opacity-100" : "border-transparent opacity-40"} border-b-[4px] border-solid pb-6 text-[1.3rem] font-bold tracking-[-0.0181rem] text-[#3a4374]`}
          onClick={() => setRoadmap("planned")}
        >
          Planned ({plannedData.length})
        </p>
        <p
          className={`${roadmap === "in-progress" ? "border-[#ad1fea] opacity-100" : "border-transparent opacity-40"} border-b-[4px] border-solid pb-6 text-[1.3rem]  font-bold tracking-[-0.0181rem] text-[#3a4374]`}
          onClick={() => setRoadmap("in-progress")}
        >
          In-Progress ({inProgressData.length})
        </p>
        <p
          className={`${roadmap === "live" ? "border-[#62bcfa] opacity-100" : "border-transparent opacity-40"} border-b-[4px] border-solid pb-6 text-[1.3rem]  font-bold tracking-[-0.0181rem] text-[#3a4374]`}
          onClick={() => setRoadmap("live")}
        >
          Live ({liveData.length})
        </p>
      </div>

      <div className="grid grid-cols-3 gap-12 pt-20 laptop:gap-8 tablet:grid-cols-1 tablet:px-[2.4rem]">
        {((isMobile && roadmap === "planned") || !isMobile) && (
          <div>
            <h2 className="text-[1.8rem] font-bold tracking-[-0.025rem] text-[#3a4374] laptop:text-[1.4rem] laptop:tracking-[-0.0194rem] tablet:text-[1.8rem] tablet:tracking-[-0.025rem]">
              Planned ({plannedData.length})
            </h2>
            <p className="text-[1.6rem] text-[#647196] laptop:text-[1.4rem]">
              Ideas prioritized for research
            </p>

            <div className="flex flex-col gap-[2.4rem] pt-[3.2rem]">
              {plannedData.map((data: productType) => (
                <RoadmapStatusBox data={data} key={data._id} />
              ))}
            </div>
          </div>
        )}
        {((isMobile && roadmap === "in-progress") || !isMobile) && (
          <div>
            <h2 className="text-[1.8rem] font-bold tracking-[-0.025rem] text-[#3a4374] laptop:text-[1.4rem] laptop:tracking-[-0.0194rem] tablet:text-[1.8rem] tablet:tracking-[-0.025rem]">
              In-Progress ({inProgressData.length})
            </h2>
            <p className="text-[1.6rem] text-[#647196] laptop:text-[1.4rem]">
              Currently being developed
            </p>

            <div className="flex flex-col gap-[2.4rem] pt-[3.2rem]">
              {inProgressData.map((data: productType) => (
                <RoadmapStatusBox data={data} key={data._id} />
              ))}
            </div>
          </div>
        )}
        {((isMobile && roadmap === "live") || !isMobile) && (
          <div>
            <h2 className="text-[1.8rem] font-bold tracking-[-0.025rem] text-[#3a4374] laptop:text-[1.4rem] laptop:tracking-[-0.0194rem] tablet:text-[1.8rem] tablet:tracking-[-0.025rem]">
              Live ({liveData.length})
            </h2>
            <p className="text-[1.6rem] text-[#647196] laptop:text-[1.4rem]">
              Released features
            </p>

            <div className="flex flex-col gap-[2.4rem] pt-[3.2rem]">
              {liveData.map((data: productType) => (
                <RoadmapStatusBox data={data} key={data._id} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default RoadmapPage;
