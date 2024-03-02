import { commentType, replyType } from "../../types/types";
import FeedbackReplies from "./FeedbackReplies";

function FeedbackComments({ comment }: { comment: commentType }) {
  console.log(comment);
  return (
    <div>
      <div className="grid grid-cols-[auto_1fr_auto] gap-x-[3.2rem] gap-y-[1.7rem] pt-[3.2rem]">
        <img
          src={comment.user.image}
          alt={`image of ${comment.user.username}`}
          className="h-[4rem] w-[4rem] rounded-full"
        />

        <div className="flex flex-col">
          <h2 className="text-[1.4rem] font-bold tracking-[-0.0194rem] text-[#3a4374]">
            {comment.user.name}
          </h2>
          <p className="text-[1.4rem] text-[#647196]">
            @{comment.user.username}
          </p>
        </div>

        <button className="text-[1.3rem] font-semibold text-[#4661e6]">
          Reply
        </button>

        <p className="col-start-2 col-end-4 text-[1.5rem] text-[#647196]">
          {comment.content}
        </p>
      </div>

      <div className="flex flex-col items-end gap-[3.2rem] pt-[3.2rem]">
        {comment.replies.map((reply: replyType) => (
          <FeedbackReplies key={reply._id} reply={reply} />
        ))}
      </div>
    </div>
  );
}

export default FeedbackComments;
