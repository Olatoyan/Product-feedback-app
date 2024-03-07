import { useState } from "react";
import { commentType, replyType } from "../../types/types";
import FeedbackReplies from "./FeedbackReplies";
import PostReply from "./PostReply";
import { UseMutateFunction } from "@tanstack/react-query";
import DeleteModal from "./DeleteModal";
import { useDeleteComment } from "./useDeleteComment";
import TransparentLoader from "../../ui/TransparentLoader";
import { useEditComment } from "./useEditComment";
import EditPost from "./EditPost";
import { TbDotsVertical } from "react-icons/tb";
import Cookies from "js-cookie";

import { FaUserLarge } from "react-icons/fa6";

function FeedbackComments({
  comment,
  isOpen,
  onOpenReply,
  openReplyId,
  postReply,
}: {
  comment: commentType;
  isOpen: boolean;
  onOpenReply: (comment: string) => void;
  openReplyId: string;
  postReply: UseMutateFunction<
    unknown,
    Error,
    { comment: string; id: string; username: string; userId: string },
    unknown
  >;
}) {
  const { deleteComment, isDeletingComment } = useDeleteComment();
  const { editComment, isEditingComment } = useEditComment();

  const [commentText, setCommentText] = useState("");
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openEditForm, setOpenEditForm] = useState(false);
  const [editText, setEditText] = useState(comment?.content);
  const [openMobileModal, setOpenMobileModal] = useState(false);
  function handleCommentReply() {
    onOpenReply(comment._id);
    setOpenMobileModal(false);
  }

  function handleOpenModal() {
    setOpenDeleteModal(true);
  }

  function handleCloseModal() {
    setOpenDeleteModal(false);
  }

  function deleteCommentFn() {
    deleteComment(comment._id);
  }

  function handleOpenEditForm() {
    setOpenEditForm(true);
    setOpenMobileModal(false);
  }

  function handleCloseEditForm() {
    setOpenEditForm(false);
  }

  const currentUserId = Cookies.get("userId") || "";

  const isSameUser = comment.user._id;

  return (
    <div className="relative">
      {(isDeletingComment || isEditingComment) && <TransparentLoader />}
      <div className="grid grid-cols-[auto_1fr_auto] gap-x-[3.2rem] gap-y-[1.7rem] pt-[3.2rem] tablet:gap-x-[1.6rem]">
        {comment?.user?.image ? (
          <img
            src={comment?.user?.image}
            alt={`image of ${comment.user.username}`}
            className="h-[4rem] w-[4rem] rounded-full"
          />
        ) : (
          <FaUserLarge
            className="h-[4rem] w-[4rem] rounded-full"
            color="#647196"
          />
        )}

        <div className="flex flex-col">
          <h2 className="text-[1.4rem] font-bold tracking-[-0.0194rem] text-[#3a4374] tablet:text-[1.3rem] tablet:tracking-[-0.0181rem]">
            {comment.user.name}
          </h2>
          <p className="text-[1.4rem] text-[#647196]  tablet:text-[1.3rem]">
            @{comment.user.username}
          </p>
        </div>

        {currentUserId === isSameUser ? (
          <div className="flex tablet:relative">
            <div
              className={`flex items-center gap-4 tablet:absolute tablet:left-[-10.5rem] tablet:top-0 tablet:flex-col tablet:items-start tablet:rounded-[1rem] tablet:bg-white tablet:px-12 tablet:py-4 tablet:shadow-modal-sh ${openMobileModal ? "tablet:flex" : "tablet:hidden"}`}
            >
              <button
                className="text-[1.3rem] font-semibold text-[#d73737] hover:underline"
                onClick={handleOpenModal}
              >
                Delete
              </button>
              <button
                className="text-[1.3rem] font-semibold text-[#647196] hover:underline"
                onClick={handleOpenEditForm}
              >
                Edit
              </button>
              <button
                className="text-[1.3rem] font-semibold text-[#4661e6] hover:underline"
                onClick={handleCommentReply}
              >
                Reply
              </button>
            </div>
            <button
              className="hidden tablet:block"
              onClick={() => setOpenMobileModal((prev) => !prev)}
            >
              <TbDotsVertical size="2rem" />
            </button>
          </div>
        ) : (
          <button
            className="text-[1.3rem] font-semibold text-[#4661e6] hover:underline"
            onClick={handleCommentReply}
          >
            Reply
          </button>
        )}

        {openEditForm ? (
          <EditPost
            text={editText}
            setText={setEditText}
            id={comment._id}
            type="comment"
            editFn={editComment}
            handleCloseEditForm={handleCloseEditForm}
          />
        ) : (
          <p className="col-start-2 col-end-4 text-[1.5rem]  text-[#647196] tablet:col-start-1 tablet:text-[1.3rem]">
            {comment.content}
          </p>
        )}
      </div>
      {isOpen && (
        <div className="flex justify-end">
          <PostReply
            valueText={commentText}
            setValueText={setCommentText}
            postReply={postReply}
            onOpenReply={onOpenReply}
            id={comment._id}
            username={comment.user.username}
          />
        </div>
      )}

      <div className="flex flex-col items-end gap-[3.2rem] pt-[3.2rem]">
        {comment.replies.map((reply: replyType) => (
          <FeedbackReplies
            key={reply._id}
            reply={reply}
            isOpen={openReplyId === reply._id}
            onOpenReply={onOpenReply}
            postReply={postReply}
            commentId={comment._id}
          />
        ))}
      </div>

      {openDeleteModal && (
        <DeleteModal
          onDelete={deleteCommentFn}
          handleCloseModal={handleCloseModal}
          type="Comment"
        />
      )}
    </div>
  );
}

export default FeedbackComments;
