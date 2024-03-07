import { Link, useNavigate, useParams } from "react-router-dom";
import NavigateBack from "../../ui/NavigateBack";
import { FaComment } from "react-icons/fa6";
import { IoIosArrowUp } from "react-icons/io";

import { commentType } from "../../types/types";
import { SyntheticEvent, useEffect, useState } from "react";
import FeedbackComments from "./FeedbackComments";
import { usePostReply } from "./usePostReply";
import TransparentLoader from "../../ui/TransparentLoader";
import { usePostComment } from "./usePostComment";
import { useGetFeedback } from "./useGetFeedback";
import Loader from "../../ui/Loader";
import { useIncreaseUpvotes } from "../HomePage/useIncreaseUpvotes";
import Cookies from "js-cookie";

function FeedbackDetail() {
  const currentUserId = Cookies.get("userId") ?? "";

  const { postReply, isReplying } = usePostReply();
  const { postComment, isCommenting } = usePostComment();
  const { getFeedback, isGettingFeedback } = useGetFeedback();
  const { increaseUpvotes, isIncreasing } = useIncreaseUpvotes();

  const navigate = useNavigate();

  const { feedbackId } = useParams();

  const [openReplyId, setOpenReplyId] = useState("");
  const [commentText, setCommentText] = useState("");

  function handleOpenReply(commentId: string) {
    setOpenReplyId(commentId);
  }

  function handlePostComment(e: SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    if (commentText.length < 3) return;
    postComment(
      { id: feedbackId!, comment: commentText, userId: currentUserId! },
      {
        onSuccess: () => {
          setCommentText("");
        },
      },
    );
  }

  useEffect(() => {
    if (!getFeedback && !isGettingFeedback) {
      navigate("/");
    }
  }, [getFeedback, navigate, isGettingFeedback]);

  useEffect(() => {
    if (!currentUserId) navigate("/signup");
  });

  if (isGettingFeedback) return <Loader />;

  const createdBy = getFeedback?.createdBy?._id;
  const userUpvotes = Cookies.get("userUpvotes") || "";
  const isUpvoted = userUpvotes?.includes(getFeedback?._id);

  return (
    <section className="relative mx-auto flex min-h-[100dvh] w-full max-w-[82rem] flex-col justify-center gap-[2.4rem] py-8 tablet:grid-cols-[auto_1fr_auto] tablet:px-8">
      {(isReplying || isCommenting || isGettingFeedback || isIncreasing) && (
        <TransparentLoader />
      )}
      <div className="flex items-center justify-between">
        <NavigateBack />

        {currentUserId === createdBy ? (
          <Link
            to={`/edit-feedback/${feedbackId}`}
            className="rounded-[1rem] bg-[#4661e6] px-[2.4rem] py-[1.2rem] text-[1.4rem] font-bold text-[#f2f4fe] tablet:px-[1.6rem] tablet:text-[1.3rem]"
          >
            Edit Feedback
          </Link>
        ) : (
          <p className="text-[1.4rem] font-bold tracking-[-0.0194rem] text-[#3a4374] tablet:text-[1.3rem] tablet:tracking-[-0.0181rem]">
            Created By: {createdBy || "Toyan"}
          </p>
        )}
      </div>

      <div className="group grid cursor-pointer grid-cols-[auto_1fr_auto] gap-16 rounded-[1rem] bg-white px-[3.2rem] py-[2.8rem] tablet:px-[2.4rem]">
        <button
          className={`flex flex-col items-center self-start rounded-[1rem] p-4 transition-all duration-300 tablet:col-start-1 tablet:row-start-2 tablet:flex-row tablet:gap-3  ${isUpvoted ? "bg-[#4661e6] text-white" : "bg-[#f2f4fe] text-[#4661e6] hover:bg-[#cfd7ff]"}`}
          onClick={() => {
            increaseUpvotes({ id: feedbackId!, user: currentUserId! });
          }}
        >
          <IoIosArrowUp size={"2rem"} />
          <p
            className={`text-[1.3rem] font-bold tracking-[-0.0181rem] ${isUpvoted ? "text-white" : "text-[#3a4374]"}`}
          >
            {getFeedback?.upvotes}
          </p>
        </button>

        <div className="flex flex-col items-start tablet:col-span-full">
          <h1 className="pb-[0.4rem] text-[1.8rem] font-bold tracking-[-0.025rem] text-[#3a4374] transition-all duration-300 group-hover:text-[#4661e6] tablet:text-[1.3rem] tablet:tracking-[-0.0181rem]">
            {getFeedback?.title}
          </h1>
          <p className="pb-[1.2rem] text-[1.6rem] text-[#647196] tablet:text-[1.3rem]">
            {getFeedback?.description}
          </p>
          <p className="rounded-[1rem] bg-[#f2f4ff] px-[1.6rem] py-2 text-[1.3rem] font-semibold capitalize text-[#4661e6]">
            {getFeedback?.category}
          </p>
        </div>

        <div className="flex items-center tablet:col-start-3 tablet:row-start-2 ">
          <FaComment size={"2rem"} color="#cdd2ee" />
          <p className="pl-4 text-[1.6rem] font-bold tracking-[-0.0222rem] text-[#3a4374]">
            {getFeedback?.comments.length}
          </p>
        </div>
      </div>

      <div
        className={`space-y-[3.2rem] divide-y divide-[#8c92b3] divide-opacity-25 bg-white px-[3.2rem] pb-[4.8rem] pt-[2.4rem] tablet:px-[2.4rem] tablet:pt-0 ${getFeedback?.comments.length === 0 ? "hidden" : ""}`}
      >
        {getFeedback?.comments.map((comment: commentType) => (
          <FeedbackComments
            key={comment._id}
            comment={comment}
            openReplyId={openReplyId}
            isOpen={openReplyId === comment._id}
            onOpenReply={handleOpenReply}
            postReply={postReply}
          />
        ))}
      </div>

      <form
        className="bg-white px-[3.4rem] py-[2.4rem] tablet:px-8"
        onSubmit={handlePostComment}
      >
        <h3 className="pb-[2.4rem] text-[1.8rem] font-bold tracking-[-0.025rem] text-[#3a4374]">
          Add Comment
        </h3>
        <textarea
          placeholder="Type your comment here"
          value={commentText}
          onChange={(e) => {
            if (
              commentText.length < 250 ||
              e.target.value.length < commentText.length
            ) {
              setCommentText(e.target.value);
            }
          }}
          className={`w-full resize-none rounded-[0.5rem] border border-solid border-transparent bg-[#f7f8fd] px-[2.4rem] py-[1.2rem] text-[1.5rem]  text-[#3a4374] ${commentText.length < 3 ? "border-[#d73737] focus:border-[#d73737] focus:outline-[#d73737]" : "focus:border-[#4661e6] focus:outline-[#4661e6]"}`}
        />

        <div className="flex items-center justify-between pt-[1.6rem]">
          <p className="text-[1.5rem] text-[#647196] tablet:text-[1.3rem]">
            {250 - commentText.length} Characters left
          </p>
          <button
            className="rounded-[1rem] bg-[#ad1fea] px-[2.4rem] py-[1.2rem] text-[1.4rem] font-bold text-[#f2f4fe] disabled:cursor-not-allowed disabled:bg-[#999] tablet:px-[1.6rem]"
            disabled={commentText.length < 3}
          >
            Post Comment
          </button>
        </div>
      </form>
    </section>
  );
}

export default FeedbackDetail;
