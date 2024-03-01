import { HiPlusSmall } from "react-icons/hi2";

function EmptySuggestions() {
  return (
    <div className="flex h-full flex-col items-center justify-center">
      <img
        src="./suggestions/illustration-empty.svg"
        alt="empty illustration"
        className="h-[14rem] w-[13rem]"
      />

      <h3 className="pb-[1.2rem] pt-[5.2rem] text-[2.4rem] font-bold tracking-[-0.0333rem] text-[#3a4374]">
        There is no feedback yet
      </h3>
      <p className="max-w-[41rem] pb-[4.8rem] text-center text-[1.6rem] text-[#647196]">
        Got a suggestion? Found a bug that needs to be squashed? We love hearing
        about new ideas to improve our app.
      </p>

      <button className="flex items-center gap-2 rounded-[1rem] bg-[#c75af6] px-[2.4rem] py-[1.2rem] text-[1.4rem] font-bold text-[#f2f4fe]">
        <HiPlusSmall />
        <span>Add feedback</span>
      </button>
    </div>
  );
}

export default EmptySuggestions;
