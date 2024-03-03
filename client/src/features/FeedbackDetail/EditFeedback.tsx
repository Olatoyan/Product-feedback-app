import { useForm } from "react-hook-form";
import NavigateBack from "../../ui/NavigateBack";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaCheck } from "react-icons/fa6";
import { useGetFeedback } from "./useGetFeedback";
import Loader from "../../ui/Loader";
import { useDeleteFeedback } from "./useDeleteFeedback";
import DeleteModal from "./DeleteModal";

type feedbackState = {
  title: string;
  detail: string;
};

function EditFeedback() {
  const { getFeedback, isGettingFeedback } = useGetFeedback();
  const { deleteFeedback, isDeletingFeedback } = useDeleteFeedback();

  console.log("edit", getFeedback);

  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [category, setCategory] = useState(getFeedback?.category);
  const [status, setStatus] = useState(getFeedback?.status);

  const { register, handleSubmit, formState, reset } = useForm<feedbackState>();

  const { errors } = formState;

  function handleToggleCategory() {
    setIsCategoryOpen((prev) => !prev);
  }

  function handleToggleStatus() {
    setIsStatusOpen((prev) => !prev);
  }

  function handleCategoryChange(value: string) {
    setCategory(value);
    setIsCategoryOpen(false);
  }

  function handleStatusChange(value: string) {
    setStatus(value);
    setIsStatusOpen(false);
  }

  function onSubmit(data: feedbackState) {
    console.log(data);
  }

  function handleOpenModal() {
    setOpenDeleteModal(true);
  }

  function handleCloseModal() {
    setOpenDeleteModal(false);
  }

  if (isGettingFeedback || isDeletingFeedback) return <Loader />;

  return (
    <>
      <section className="relative mx-auto flex min-h-[100dvh] w-full max-w-[58rem] flex-col justify-center py-8">
        <NavigateBack />

        <form
          className="mt-28 rounded-[1rem] bg-white p-16"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="-mt-28">
            <img
              src="../shared/icon-edit-feedback.svg"
              alt="edit feedback"
              className="h-[5.6rem] w-[5.6rem]"
            />
          </div>

          <h1 className="pt-[2.4rem] text-[2.4rem] font-bold tracking-[-0.0333rem] text-[#3a4374]">
            Editing ‘{getFeedback.title}’
          </h1>

          <div className="space-y-[2.4rem] pt-16">
            <div>
              <label className="flex flex-col pb-[1.6rem]" htmlFor="title">
                <span className="text-[1.4rem] font-bold tracking-[-0.0194rem] text-[#3a4374]">
                  Feedback Title
                </span>
                <span className="text-[1.4rem] text-[#647196]">
                  Add a short, descriptive headline
                </span>
              </label>
              <input
                type="text"
                id="title"
                defaultValue={getFeedback.description}
                className={`w-full rounded-[0.5rem] border border-solid bg-[#f7f8fd] px-[2.4rem] py-[1.2rem] text-[1.5rem] text-[#3a4374] ${errors?.title?.message ? "border-[#d73737] focus:border-[#d73737] focus:outline-[#d73737]" : "border-transparent focus:border-[#4661e6] focus:outline-[#4661e6]"}`}
                {...register("title", {
                  required: "Can't be empty",
                  minLength: {
                    value: 3,
                    message: "Must be at least 3 characters",
                  },
                })}
              />
              {errors?.title?.message && (
                <p className="pt-1 text-[1.4rem] text-[#d73737]">
                  {errors?.title?.message}
                </p>
              )}
            </div>
            <div className="relative">
              <label className="flex flex-col pb-[1.6rem]">
                <span className="text-[1.4rem] font-bold tracking-[-0.0194rem] text-[#3a4374]">
                  Category
                </span>
                <span className="text-[1.4rem] text-[#647196]">
                  Choose a category for your feedback
                </span>
              </label>
              <button
                type="button"
                className="flex w-full items-center justify-between rounded-lg border border-solid border-transparent bg-[#f7f8fd] px-[2.4rem] py-[1.3rem] text-[1.5rem] font-bold capitalize text-[#3a4374] focus:border-[#4661e6] focus:outline-[#4661e6]"
                onClick={handleToggleCategory}
              >
                <span>{category}</span>
                <motion.img
                  initial={{ rotate: 0 }}
                  animate={{ rotate: isCategoryOpen ? 180 : 0 }}
                  transition={{ type: "spring" }}
                  src="../shared/icon-arrow-down.svg"
                  alt="arrow down"
                />
              </button>

              <AnimatePresence>
                {isCategoryOpen && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{
                      duration: 0.2,
                      damping: 15,
                      ease: "easeInOut",
                      type: "spring",
                    }}
                    className="absolute top-[12rem] z-[99] w-full divide-y-[1px] divide-[#3a4374] divide-opacity-15 rounded-[1rem] bg-white shadow-modal-sh"
                  >
                    <div
                      className="flex cursor-pointer items-center justify-between px-[2.4rem] py-[1.2rem] text-[1.6rem] text-[#647196] transition-all duration-300 hover:text-[#ad1fea]"
                      onClick={() => handleCategoryChange("feature")}
                    >
                      <span>Feature</span>
                      {category === "feature" && (
                        <FaCheck color="#ad1fea" size={"1.5rem"} />
                      )}
                    </div>
                    <div
                      className="flex cursor-pointer items-center justify-between px-[2.4rem] py-[1.2rem] text-[1.6rem] text-[#647196] transition-all duration-300 hover:text-[#ad1fea]"
                      onClick={() => handleCategoryChange("UI")}
                    >
                      <span>UI</span>
                      {category === "UI" && (
                        <FaCheck color="#ad1fea" size={"1.5rem"} />
                      )}
                    </div>
                    <div
                      className="flex cursor-pointer items-center justify-between px-[2.4rem] py-[1.2rem] text-[1.6rem] text-[#647196] transition-all duration-300 hover:text-[#ad1fea]"
                      onClick={() => handleCategoryChange("UX")}
                    >
                      <span>UX</span>
                      {category === "UX" && (
                        <FaCheck color="#ad1fea" size={"1.5rem"} />
                      )}
                    </div>
                    <div
                      className="flex cursor-pointer items-center justify-between px-[2.4rem] py-[1.2rem] text-[1.6rem] text-[#647196] transition-all duration-300 hover:text-[#ad1fea]"
                      onClick={() => handleCategoryChange("enhancement")}
                    >
                      <span>Enhancement</span>
                      {category === "enhancement" && (
                        <FaCheck color="#ad1fea" size={"1.5rem"} />
                      )}
                    </div>
                    <div
                      className="flex cursor-pointer items-center justify-between px-[2.4rem] py-[1.2rem] text-[1.6rem] text-[#647196] transition-all duration-300 hover:text-[#ad1fea]"
                      onClick={() => handleCategoryChange("bug")}
                    >
                      <span>Bug</span>
                      {category === "bug" && (
                        <FaCheck color="#ad1fea" size={"1.5rem"} />
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <div className="relative">
              <label className="flex flex-col pb-[1.6rem]">
                <span className="text-[1.4rem] font-bold tracking-[-0.0194rem] text-[#3a4374]">
                  Update Status
                </span>
                <span className="text-[1.4rem] text-[#647196]">
                  Change feature state
                </span>
              </label>
              <button
                type="button"
                className="flex w-full items-center justify-between rounded-lg border border-solid border-transparent bg-[#f7f8fd] px-[2.4rem] py-[1.3rem] text-[1.5rem] font-bold capitalize text-[#3a4374] focus:border-[#4661e6] focus:outline-[#4661e6]"
                onClick={handleToggleStatus}
              >
                <span>{status}</span>
                <motion.img
                  initial={{ rotate: 0 }}
                  animate={{ rotate: isStatusOpen ? 180 : 0 }}
                  transition={{ type: "spring" }}
                  src="../shared/icon-arrow-down.svg"
                  alt="arrow down"
                />
              </button>

              <AnimatePresence>
                {isStatusOpen && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    transition={{
                      duration: 0.2,
                      damping: 15,
                      ease: "easeInOut",
                      type: "spring",
                    }}
                    className="absolute top-[12rem] w-full divide-y-[1px] divide-[#3a4374] divide-opacity-15 rounded-[1rem] bg-white shadow-modal-sh"
                  >
                    <div
                      className="flex cursor-pointer items-center justify-between px-[2.4rem] py-[1.2rem] text-[1.6rem] text-[#647196] transition-all duration-300 hover:text-[#ad1fea]"
                      onClick={() => handleStatusChange("suggestion")}
                    >
                      <span>Suggestion</span>
                      {status === "suggestion" && (
                        <FaCheck color="#ad1fea" size={"1.5rem"} />
                      )}
                    </div>
                    <div
                      className="flex cursor-pointer items-center justify-between px-[2.4rem] py-[1.2rem] text-[1.6rem] text-[#647196] transition-all duration-300 hover:text-[#ad1fea]"
                      onClick={() => handleStatusChange("planned")}
                    >
                      <span>Planned</span>
                      {status === "planned" && (
                        <FaCheck color="#ad1fea" size={"1.5rem"} />
                      )}
                    </div>
                    <div
                      className="flex cursor-pointer items-center justify-between px-[2.4rem] py-[1.2rem] text-[1.6rem] text-[#647196] transition-all duration-300 hover:text-[#ad1fea]"
                      onClick={() => handleStatusChange("in-progress")}
                    >
                      <span>In-Progress</span>
                      {status === "in-progress" && (
                        <FaCheck color="#ad1fea" size={"1.5rem"} />
                      )}
                    </div>
                    <div
                      className="flex cursor-pointer items-center justify-between px-[2.4rem] py-[1.2rem] text-[1.6rem] text-[#647196] transition-all duration-300 hover:text-[#ad1fea]"
                      onClick={() => handleStatusChange("live")}
                    >
                      <span>Live</span>
                      {status === "live" && (
                        <FaCheck color="#ad1fea" size={"1.5rem"} />
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <div>
              <label className="flex flex-col pb-[1.6rem]" htmlFor="detail">
                <span className="text-[1.4rem] font-bold tracking-[-0.0194rem] text-[#3a4374]">
                  Feedback Detail
                </span>
                <span className="text-[1.4rem] text-[#647196]">
                  Include any specific comments on what should be improved,
                  added, etc.
                </span>
              </label>
              <textarea
                id="detail"
                rows={4}
                defaultValue={getFeedback?.description}
                className={`w-full resize-none rounded-[0.5rem] border border-solid bg-[#f7f8fd] px-[2.4rem] py-[1.2rem] text-[1.5rem] text-[#3a4374] ${errors?.detail?.message ? "border-[#d73737] focus:border-[#d73737] focus:outline-[#d73737]" : "border-transparent focus:border-[#4661e6] focus:outline-[#4661e6]"}`}
                {...register("detail", {
                  required: "Can't be empty",
                  minLength: {
                    value: 3,
                    message: "Must be at least 3 characters",
                  },
                })}
              />
              {errors?.detail?.message && (
                <p className="pt-1 text-[1.4rem] text-[#d73737]">
                  {errors?.detail?.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between pt-[3.2rem]">
            <button
              type="button"
              className="rounded-[1rem] bg-[#d73737] px-[2.4rem] py-[1.2rem] text-[1.4rem] font-bold text-[#f2f4fe] transition-all duration-300 hover:bg-[#e98888]"
              onClick={handleOpenModal}
            >
              Delete
            </button>

            <div className="flex items-center gap-8">
              <button
                type="button"
                className="rounded-[1rem] bg-[#3a4374] px-[2.4rem] py-[1.2rem] text-[1.4rem] font-bold text-[#f2f4fe] transition-all duration-300 hover:bg-[#656ea3]"
                onClick={() => reset()}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="rounded-[1rem] bg-[#ad1fea] px-[2.4rem] py-[1.2rem] text-[1.4rem] font-bold text-[#f2f4fe] transition-all duration-300 hover:bg-[#c75af6]"
              >
                Add Feedback
              </button>
            </div>
          </div>
        </form>
      </section>
      {openDeleteModal && (
        <DeleteModal
          deleteFeedback={deleteFeedback}
          handleCloseModal={handleCloseModal}
        />
      )}
    </>
  );
}

export default EditFeedback;
