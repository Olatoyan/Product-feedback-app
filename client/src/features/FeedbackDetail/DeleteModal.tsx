function DeleteModal({
  handleCloseModal,
  onDelete,
  type,
}: {
  handleCloseModal: () => void;
  onDelete: () => void;
  type: string;
}) {
  return (
    <div className="fixed left-0 top-0 z-[9999] flex h-full w-full items-center justify-center tablet:px-8">
      <div className="z-[3] flex max-w-[40rem] flex-col justify-center gap-[2.4rem] rounded-[1rem] bg-white p-[2.4rem] tablet:gap-[1.6rem]">
        <h3 className="text-[2.4rem] font-bold text-[#3a4374] tablet:text-[1.8rem]">
          Delete{" "}
          {type === "Feedback"
            ? "Feedback"
            : type === "Comment"
              ? "Comment"
              : "Reply"}
          ?
        </h3>
        <p className="text-[1.4rem] text-[#647196] tablet:text-[1.3rem]">
          Are you sure you want to delete this{" "}
          {type === "Feedback"
            ? "feedback"
            : type === "Comment"
              ? "comment"
              : "reply"}
          ? This action cannot be undone.
        </p>

        <div className="flex items-center justify-between">
          <button
            className="rounded-[1rem] bg-[#3a4374] px-[2.4rem] py-[1.2rem] text-[1.4rem] text-[#f2f4fe] transition-all duration-300 hover:bg-[#656ea3] tablet:px-[1.6rem] tablet:text-[1.3rem]"
            onClick={handleCloseModal}
          >
            No, Cancel
          </button>
          <button
            className="rounded-[1rem] bg-[#d73737] px-[2.4rem] py-[1.2rem] text-[1.4rem] text-[#f2f4fe] transition-all duration-300 hover:bg-[#e98888] tablet:px-[1.6rem] tablet:text-[1.3rem]"
            onClick={onDelete}
          >
            Yes, Delete
          </button>
        </div>
      </div>

      <div
        className="absolute left-0 top-0 h-full w-full bg-black opacity-50"
        onClick={handleCloseModal}
      ></div>
    </div>
  );
}

export default DeleteModal;
