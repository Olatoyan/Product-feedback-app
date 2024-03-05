import { UseMutateFunction } from "@tanstack/react-query";
import { replyType } from "../../types/types";
import PostReply from "./PostReply";
import { useState } from "react";
import { useDeleteReply } from "./useDeleteReply";
import { useEditReply } from "./useEditReply";
import TransparentLoader from "../../ui/TransparentLoader";
import EditPost from "./EditPost";
import DeleteModal from "./DeleteModal";
import { TbDotsVertical } from "react-icons/tb";

function FeedbackReplies({
  reply,
  isOpen,
  onOpenReply,
  postReply,
  commentId,
}: {
  reply: replyType;
  isOpen: boolean;
  commentId: string;
  onOpenReply: (replyId: string) => void;
  postReply: UseMutateFunction<
    unknown,
    Error,
    { comment: string; id: string; username: string },
    unknown
  >;
}) {
  const { deleteReply, isDeletingReply } = useDeleteReply();
  const { editReply, isEditingReply } = useEditReply();

  const [commentText, setCommentText] = useState("");
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openEditForm, setOpenEditForm] = useState(false);
  const [editText, setEditText] = useState(reply?.content);
  const [openMobileModal, setOpenMobileModal] = useState(false);

  console.log(reply);
  function handleReply() {
    onOpenReply(reply._id);
    setOpenMobileModal(false);
  }

  function handleOpenModal() {
    setOpenDeleteModal(true);
  }

  function handleCloseModal() {
    setOpenDeleteModal(false);
  }

  function deleteReplyFn() {
    deleteReply(reply._id);
  }

  function handleOpenEditForm() {
    setOpenEditForm(true);
    setOpenMobileModal(false);
  }

  function handleCloseEditForm() {
    setOpenEditForm(false);
  }

  return (
    <div className="relative flex w-[90%] flex-col">
      {(isDeletingReply || isEditingReply) && <TransparentLoader />}
      <div className="tablet:gap-x-[1.6rem] grid grid-cols-[auto_1fr_auto] gap-x-[3.2rem] gap-y-[1.7rem]">
        <img
          src={reply.user.image}
          alt={`image of ${reply.user.username}`}
          className="h-[4rem] w-[4rem] rounded-full"
        />

        <div className="flex flex-col">
          <h2 className="tablet:text-[1.3rem] tablet:tracking-[-0.0181rem] text-[1.4rem] font-bold tracking-[-0.0194rem] text-[#3a4374]">
            {reply.user.name}
          </h2>
          <p className="tablet:text-[1.3rem] text-[1.4rem] text-[#647196]">
            @{reply.user.username}
          </p>
        </div>

        <div className="tablet:relative flex">
          <div
            className={`tablet:absolute tablet:top-0 tablet:bg-white tablet:flex-col tablet:items-start tablet:shadow-modal-sh tablet:left-[-10.5rem] tablet:rounded-[1rem] tablet:py-4 tablet:px-12 flex items-center gap-4 ${openMobileModal ? "tablet:flex" : "tablet:hidden"}`}
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
              onClick={handleReply}
            >
              Reply
            </button>
          </div>
          <button
            className="tablet:block hidden"
            onClick={() => setOpenMobileModal((prev) => !prev)}
          >
            <TbDotsVertical size="2rem" />
          </button>
        </div>

        {openEditForm ? (
          <EditPost
            text={editText}
            setText={setEditText}
            id={reply._id}
            type="reply"
            editFn={editReply}
            handleCloseEditForm={handleCloseEditForm}
          />
        ) : (
          <p className="col-start-2 tablet:text-[1.3rem]  col-end-4 text-[1.5rem] text-[#647196]">
            <span className="font-bold text-[#ad1fea]">
              @{reply.replyingTo}
            </span>{" "}
            {reply.content}
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
            id={commentId}
            username={reply.user.username}
          />
        </div>
      )}

      {openDeleteModal && (
        <DeleteModal
          onDelete={deleteReplyFn}
          handleCloseModal={handleCloseModal}
          type="reply"
        />
      )}
    </div>
  );
}

export default FeedbackReplies;
