import { FaComment } from "react-icons/fa6";
import { IoIosArrowUp } from "react-icons/io";
import { productType } from "../../types/types";
import { useIncreaseUpvotes } from "../HomePage/useIncreaseUpvotes";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

function RoadmapStatusBox({ data }: { data: productType }) {
  const currentUserId = Cookies.get("userId") ?? "";
  const userUpvotes = Cookies.get("userUpvotes") ?? "";
  const isUpvoted = userUpvotes?.includes(data._id);

  const { increaseUpvotes, isIncreasing } = useIncreaseUpvotes();
  return (
    <Link
      to={`/feedback-detail/${data._id}`}
      className={`group flex min-h-[28rem] flex-col rounded-[0.5rem] border-t-[6px] border-solid bg-white p-[3.2rem] laptop:px-8 tablet:min-h-full ${data.status === "planned" ? "border-[#f49f85]" : data.status === "in-progress" ? "border-[#ad1fea]" : "border-[#62bcfa]"}`}
    >
      <div className="flex items-center gap-8">
        <div
          className={`h-[0.8rem] w-[0.8rem] rounded-full ${data.status === "planned" ? "bg-[#f49f85]" : data.status === "in-progress" ? "bg-[#ad1fea]" : "bg-[#62bcfa]"}`}
        ></div>
        <p className="text-[1.6rem] capitalize text-[#647196] laptop:text-[1.3rem]">
          {data.status}
        </p>
      </div>

      <h3 className="pt-[0.8rem] text-[1.8rem] font-bold tracking-[-0.025rem] text-[#3a4374] group-hover:text-[#4661e6] laptop:text-[1.3rem] laptop:tracking-[-0.0181rem]">
        {data.title}
      </h3>
      <p className="pb-[1.6rem] text-[1.6rem] text-[#647196] laptop:text-[1.3rem]">
        {data.description}
      </p>
      <p className="self-start rounded-[1rem] bg-[#f2f4ff] px-[1.6rem] py-2 text-[1.3rem] font-semibold capitalize text-[#4661e6]">
        {data.category}
      </p>

      <div className="flex items-center justify-between pt-[1.6rem]">
        <button
          className={`flex items-center gap-3 self-start rounded-[1rem] p-4 transition-all duration-300  disabled:bg-[#ccc] ${isUpvoted ? "bg-[#4661e6] text-white" : "bg-[#f2f4fe] text-[#4661e6] hover:bg-[#cfd7ff]"}`}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            increaseUpvotes({ id: data._id, user: currentUserId! });
          }}
          disabled={isIncreasing}
        >
          <IoIosArrowUp size={"2rem"} />
          <p
            className={`text-[1.3rem] font-bold tracking-[-0.0181rem] ${isUpvoted ? "text-white" : "text-[#3a4374]"}`}
          >
            {data.upvotes}
          </p>
        </button>

        <div className="flex items-center">
          <FaComment size={"2rem"} color="#cdd2ee" />
          <p className="pl-4 text-[1.6rem] font-bold tracking-[-0.0222rem] text-[#3a4374]">
            {data.comments.length}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default RoadmapStatusBox;
