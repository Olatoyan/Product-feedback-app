import { Link } from "react-router-dom";
import NavigateBack from "../../ui/NavigateBack";
import { HiPlusSmall } from "react-icons/hi2";

function RoadmapHeader() {
  return (
    <header className="flex items-center justify-between rounded-[1rem] bg-[#373f68] px-[3.2rem] py-[2.7rem] tablet:rounded-none tablet:px-8">
      <div className="flex flex-col">
        <NavigateBack text="white" />
        <h1 className="text-[2.4rem] font-bold tracking-[-0.0333rem] text-white tablet:text-[1.8rem] tablet:tracking-[-0.025rem]">
          Roadmap
        </h1>
      </div>

      <Link
        to="/create-feedback"
        className="flex items-center gap-2 rounded-[1rem] bg-[#c75af6] px-[2.4rem] py-[1.2rem] text-[1.4rem] font-bold text-[#f2f4fe] tablet:px-[1.6rem]"
      >
        <HiPlusSmall />
        <span>Add feedback</span>
      </Link>
    </header>
  );
}

export default RoadmapHeader;
