import { replyType } from "../../types/types";
import PostReply from "./PostReply";

function FeedbackReplies({
  reply,
  isOpen,
  onOpenReply,
}: {
  reply: replyType;
  isOpen: boolean;
  onOpenReply: (replyId: string) => void;
}) {
  function handleReply() {
    console.log(reply);
    onOpenReply(reply._id);
  }
  return (
    <div className="flex w-[90%] flex-col">
      <div className="grid grid-cols-[auto_1fr_auto] gap-x-[3.2rem] gap-y-[1.7rem]">
        <img
          src={reply.user.image}
          alt={`image of ${reply.user.username}`}
          className="h-[4rem] w-[4rem] rounded-full"
        />

        <div className="flex flex-col">
          <h2 className="text-[1.4rem] font-bold tracking-[-0.0194rem] text-[#3a4374]">
            {reply.user.name}
          </h2>
          <p className="text-[1.4rem] text-[#647196]">@{reply.user.username}</p>
        </div>

        <button
          className="text-[1.3rem] font-semibold text-[#4661e6]"
          onClick={handleReply}
        >
          Reply
        </button>

        <p className="col-start-2 col-end-4 text-[1.5rem] text-[#647196]">
          <span className="font-bold text-[#ad1fea]">@{reply.replyingTo}</span>{" "}
          {reply.content}
        </p>
      </div>

      {isOpen && (
        <div className="flex justify-end">
          <PostReply />
        </div>
      )}
    </div>
  );
}

export default FeedbackReplies;
