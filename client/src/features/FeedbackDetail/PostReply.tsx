import { UseMutateFunction } from "@tanstack/react-query";
import { SyntheticEvent } from "react";
import Cookies from "js-cookie";

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
    { comment: string; id: string; username: string; userId: string },
    unknown
  >;
  onOpenReply: (comment: string) => void;
  id: string;
  username: string;
}) {
  const currentUserId = Cookies.get("userId") ?? "";

  function handleSubmit(e: SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    postReply(
      { comment: valueText, id, username, userId: currentUserId! },
      {
        onSuccess: () => {
          onOpenReply("");
          setValueText("");
        },
      },
    );
  }

  function closeModal() {
    onOpenReply("");
    setValueText("");
  }

  return (
    <form
      className="flex w-[90%] gap-8 bg-white px-8 py-[2.4rem] tablet:w-full tablet:flex-col tablet:px-0"
      onSubmit={handleSubmit}
    >
      <textarea
        placeholder={`replying to ${username}...`}
        value={valueText}
        onChange={(e) => {
          if (
            valueText.length < 250 ||
            e.target.value.length < valueText.length
          ) {
            setValueText(e.target.value);
          }
        }}
        className={`w-[60%] resize-none rounded-[0.5rem] border border-solid border-transparent bg-[#f7f8fd] px-[2.4rem] py-[1.2rem] text-[1.5rem] text-[#3a4374] outline-transparent  tablet:w-full ${valueText.length < 3 ? "border-[#d73737] focus:border-[#d73737] focus:outline-[#d73737]" : "focus:border-[#4661e6] focus:outline-[#4661e6]"}`}
      />

      <div className="flex flex-col items-center justify-between gap-8 tablet:items-stretch">
        <button
          className="rounded-[1rem] bg-[#ad1fea] p-[1.2rem] text-[1.4rem] font-bold text-[#f2f4fe] disabled:bg-[#999]"
          disabled={valueText.length < 3}
        >
          Post Reply
        </button>
        <p className="text-[1.3rem] text-[#647196] tablet:-order-1">
          {250 - valueText.length} Chars left
        </p>
      </div>
      <button
        type="button"
        className="self-start rounded-[1rem] bg-[#3a4374] px-[2.4rem] py-[1.2rem] text-[1.4rem] font-bold text-[#f2f4fe] transition-all duration-300 hover:bg-[#656ea3] tablet:self-stretch"
        onClick={closeModal}
      >
        Cancel
      </button>
    </form>
  );
}

export default PostReply;
