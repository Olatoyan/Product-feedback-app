import { IoIosArrowUp } from "react-icons/io";
import { FaComment } from "react-icons/fa6";

function HomeSuggestionBox() {
  return (
    <div className="group grid cursor-pointer grid-cols-[auto_1fr_auto] gap-16 rounded-[1rem] bg-white px-[3.2rem] py-[2.8rem]">
      <button className="flex flex-col self-start rounded-[1rem] bg-[#f2f4fe] p-4 text-[#4661e6] transition-all duration-300 hover:bg-[#cfd7ff]">
        <IoIosArrowUp size={"2rem"} />
        <p className="text-[1.3rem] font-bold tracking-[-0.0181rem] text-[#3a4374]">
          99
        </p>
      </button>

      <div className="flex flex-col items-start">
        <h3 className="pb-[0.4rem] text-[1.8rem] font-bold tracking-[-0.025rem] text-[#3a4374] transition-all duration-300 group-hover:text-[#4661e6]">
          Add a dark theme option
        </h3>
        <p className="pb-[1.2rem] text-[1.6rem] text-[#647196]">
          We should add a dark theme option.
        </p>
        <p className="rounded-[1rem] bg-[#f2f4ff] px-[1.6rem] py-2 text-[1.3rem] font-semibold text-[#4661e6]">
          Feature
        </p>
      </div>

      <div className="flex items-center">
        <FaComment size={"2rem"} color="#cdd2ee" />
        <p className="pl-4 text-[1.6rem] font-bold tracking-[-0.0222rem] text-[#3a4374]">
          4
        </p>
      </div>
    </div>
  );
}

export default HomeSuggestionBox;
