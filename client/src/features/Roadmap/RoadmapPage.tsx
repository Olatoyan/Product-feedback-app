import { productType } from "../../types/types";
import Loader from "../../ui/Loader";
import { useGetAllFeedbacks } from "../HomePage/useGetAllFeedbacks";
import RoadmapHeader from "./RoadmapHeader";
import RoadmapStatusBox from "./RoadmapStatusBox";

function RoadmapPage() {
  const { allFeedbacks, isAllFeedbackPending } = useGetAllFeedbacks();

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

  console.log({ liveData, plannedData, inProgressData });

  return (
    <section className="px-[17rem] py-28">
      <RoadmapHeader />

      <div className="grid grid-cols-3 gap-12 pt-20">
        <div>
          <h2 className="text-[1.8rem] font-bold tracking-[-0.025rem] text-[#3a4374]">
            Planned ({plannedData.length})
          </h2>
          <p className="text-[1.6rem] text-[#647196]">
            Ideas prioritized for research
          </p>

          <div className="flex flex-col gap-[2.4rem] pt-[3.2rem]">
            {plannedData.map((data: productType) => (
              <RoadmapStatusBox data={data} key={data._id} />
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-[1.8rem] font-bold tracking-[-0.025rem] text-[#3a4374]">
            In-Progress ({inProgressData.length})
          </h2>
          <p className="text-[1.6rem] text-[#647196]">
            Currently being developed
          </p>

          <div className="flex flex-col gap-[2.4rem] pt-[3.2rem]">
            {inProgressData.map((data: productType) => (
              <RoadmapStatusBox data={data} key={data._id} />
            ))}
          </div>
        </div>
        <div>
          <h2 className="text-[1.8rem] font-bold tracking-[-0.025rem] text-[#3a4374]">
            Live ({liveData.length})
          </h2>
          <p className="text-[1.6rem] text-[#647196]">Released features</p>

          <div className="flex flex-col gap-[2.4rem] pt-[3.2rem]">
            {liveData.map((data: productType) => (
              <RoadmapStatusBox data={data} key={data._id} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default RoadmapPage;
