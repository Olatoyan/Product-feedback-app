import { UseMutateFunction } from "@tanstack/react-query";
import { Dispatch, SyntheticEvent } from "react";

function EditPost({
  text,
  setText,
  id,
  type,
  editFn,
  handleCloseEditForm,
}: {
  text: string;
  setText: Dispatch<React.SetStateAction<string>>;
  id: string;
  type: "comment" | "reply";
  editFn: UseMutateFunction<
    unknown,
    Error,
    { comment: string; id: string },
    unknown
  >;
  handleCloseEditForm: () => void;
}) {
  function handleSubmit(e: SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    editFn(
      { comment: text, id },
      {
        onSuccess: () => {
          handleCloseEditForm();
        },
      },
    );
  }
  return (
    <form
      className="col-start-1 col-end-4 flex w-full gap-8 bg-white px-[3.4rem] py-[2.4rem] tablet:flex-col tablet:px-0"
      onSubmit={handleSubmit}
    >
      <textarea
        placeholder="Type your comment here"
        value={text}
        onChange={(e) => {
          if (text.length < 250 || e.target.value.length < text.length) {
            setText(e.target.value);
          }
        }}
        className={`w-[60%] resize-none rounded-[0.5rem] border border-solid border-transparent bg-[#f7f8fd] px-[2.4rem] py-[1.2rem] text-[1.5rem] text-[#3a4374] outline-transparent  tablet:w-full ${text.length < 3 ? "border-[#d73737] focus:border-[#d73737] focus:outline-[#d73737]" : "focus:border-[#4661e6] focus:outline-[#4661e6]"}`}
      />

      <div className="flex flex-col items-center justify-between gap-8 tablet:items-stretch">
        <button
          className="rounded-[1rem] bg-[#ad1fea] p-[1.2rem] text-[1.4rem] font-bold text-[#f2f4fe] disabled:bg-[#999]"
          disabled={text.length < 3}
        >
          Edit {type === "comment" ? "Comment" : "Reply"}
        </button>
        <p className="text-[1.3rem] text-[#647196] tablet:-order-1">
          {250 - text.length} Chars left
        </p>
      </div>
      <button
        type="button"
        className="self-start rounded-[1rem] bg-[#3a4374] px-[2.4rem] py-[1.2rem] text-[1.4rem] font-bold text-[#f2f4fe] transition-all duration-300 hover:bg-[#656ea3] tablet:self-stretch"
        onClick={handleCloseEditForm}
      >
        Cancel
      </button>
    </form>
  );
}

export default EditPost;
