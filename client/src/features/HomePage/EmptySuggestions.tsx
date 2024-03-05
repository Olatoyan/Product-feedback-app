import { HiPlusSmall } from "react-icons/hi2";
import { Link } from "react-router-dom";

function EmptySuggestions() {
  return (
    <div className="flex h-full flex-col items-center justify-center">
      <img
        src="./suggestions/illustration-empty.svg"
        alt="empty illustration"
        className="h-[14rem] w-[13rem]"
      />

      <h3 className="tablet:text-[1.8rem] tablet:tracking-[-0.025rem] pb-[1.2rem] pt-[5.2rem] text-[2.4rem] font-bold tracking-[-0.0333rem] text-[#3a4374]">
        There is no feedback yet
      </h3>
      <p className="tablet:text-[1.3rem] tablet:pb-[2.4rem] max-w-[41rem] pb-[4.8rem] text-center text-[1.6rem] text-[#647196]">
        Got a suggestion? Found a bug that needs to be squashed? We love hearing
        about new ideas to improve our app.
      </p>

      <Link
        to="/create-feedback"
        className="flex items-center gap-2 rounded-[1rem] bg-[#c75af6] px-[2.4rem] py-[1.2rem] text-[1.4rem] font-bold text-[#f2f4fe]"
      >
        <HiPlusSmall />
        <span>Add feedback</span>
      </Link>
    </div>
  );
}

export default EmptySuggestions;
