import { IoIosArrowUp } from "react-icons/io";
import { FaComment } from "react-icons/fa6";
import { productType } from "../../types/types";
import { Link } from "react-router-dom";
import { useIncreaseUpvotes } from "./useIncreaseUpvotes";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

function HomeSuggestionBox({ feedback }: { feedback: productType }) {
  const currentUserId = Cookies.get("userId") ?? "";
  const userUpvotes = Cookies.get("userUpvotes") ?? "";
  const isUpvoted = userUpvotes?.includes(feedback._id);

  const navigate = useNavigate();

  const { increaseUpvotes, isIncreasing } = useIncreaseUpvotes();
  return (
    <Link
      to={`/feedback-detail/${feedback._id}`}
      className="group grid cursor-pointer grid-cols-[auto_1fr_auto] gap-16 rounded-[1rem] bg-white px-[3.2rem] py-[2.8rem] tablet:gap-8 tablet:px-8"
    >
      <button
        className={`flex flex-col items-center self-start rounded-[1rem] p-4 transition-all duration-300  disabled:bg-[#ccc] tablet:col-start-1 tablet:row-start-2 tablet:flex-row tablet:gap-3 ${isUpvoted ? "bg-[#4661e6] text-white" : "bg-[#f2f4fe] text-[#4661e6] hover:bg-[#cfd7ff]"}`}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          if (!currentUserId) {
            navigate("/login");
          }
          increaseUpvotes({ id: feedback._id, user: currentUserId! });
        }}
        disabled={isIncreasing}
      >
        <IoIosArrowUp size={"2rem"} />
        <p
          className={`text-[1.3rem] font-bold tracking-[-0.0181rem] ${isUpvoted ? "text-white" : "text-[#3a4374]"}`}
        >
          {feedback.upvotes}
        </p>
      </button>

      <div className="flex flex-col items-start tablet:col-span-full">
        <h3 className="pb-[0.4rem] text-[1.8rem] font-bold tracking-[-0.025rem] text-[#3a4374] transition-all duration-300 group-hover:text-[#4661e6] tablet:text-[1.3rem] tablet:tracking-[-0.0181rem]">
          {feedback.title}
        </h3>
        <p className="pb-[1.2rem] text-[1.6rem] text-[#647196] tablet:text-[1.3rem]">
          {feedback.description}
        </p>
        <p className="rounded-[1rem] bg-[#f2f4ff] px-[1.6rem] py-2 text-[1.3rem] font-semibold capitalize text-[#4661e6]">
          {feedback.category}
        </p>
      </div>

      <div className="flex items-center tablet:col-start-3 tablet:row-start-2">
        <FaComment size={"2rem"} color="#cdd2ee" />
        <p className="pl-4 text-[1.6rem] font-bold tracking-[-0.0222rem] text-[#3a4374]">
          {feedback.comments.length}
        </p>
      </div>
    </Link>
  );
}

export default HomeSuggestionBox;
