import { UseMutateFunction } from "@tanstack/react-query";
import { SyntheticEvent } from "react";

function PostReply({
  valueText,
  setValueText,
  postReply,
  onOpenReply,
  id,
  username,
}: {
  valueText: string;
  setValueText: React.Dispatch<React.SetStateAction<string>>;
  postReply: UseMutateFunction<
    unknown,
    Error,
    { comment: string; id: string; username: string },
    unknown
  >;
  onOpenReply: (comment: string) => void;
  id: string;
  username: string;
}) {
  function handleSubmit(e: SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(id, username);
    postReply(
      { comment: valueText, id, username },
      {
        onSuccess: () => {
          onOpenReply("");
        },
      },
    );
  }

  return (
    <form
      className="flex w-[90%] gap-8 bg-white px-[3.4rem] py-[2.4rem]"
      onSubmit={handleSubmit}
    >
      <textarea
        placeholder="Type your comment here"
        value={valueText}
        onChange={(e) => {
          if (
            valueText.length < 250 ||
            e.target.value.length < valueText.length
          ) {
            setValueText(e.target.value);
          }
        }}
        className={`w-[75%] resize-none rounded-[0.5rem] border border-solid border-transparent bg-[#f7f8fd] px-[2.4rem] py-[1.2rem] text-[1.5rem]  text-[#3a4374] focus:border-[#4661e6] focus:outline-[#4661e6]`}
      />

      <div className="flex flex-col items-center justify-between gap-8">
        <button className="rounded-[1rem] bg-[#ad1fea] p-[1.2rem] text-[1.4rem] font-bold text-[#f2f4fe]">
          Post Reply
        </button>
        <p className="text-[1.3rem] text-[#647196]">
          {250 - valueText.length} Chars left
        </p>
      </div>
    </form>
  );
}

export default PostReply;
