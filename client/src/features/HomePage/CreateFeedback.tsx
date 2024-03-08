import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { FaCheck } from "react-icons/fa6";
import { useCreateFeedback } from "./useCreateFeedback";
import TransparentLoader from "../../ui/TransparentLoader";
import NavigateBack from "../../ui/NavigateBack";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

type feedbackState = {
  title: string;
  detail: string;
};

function CreateFeedback() {
  const currentUserId = Cookies.get("userId") ?? "";

  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [category, setCategory] = useState("Feature");

  const navigate = useNavigate();

  const { createFeedback, isCreatingFeedback } = useCreateFeedback();

  function handleToggleCategory() {
    setIsCategoryOpen((prev) => !prev);
  }

  function handleCategoryChange(value: string) {
    setCategory(value);
    setIsCategoryOpen(false);
  }

  const { register, handleSubmit, formState, reset } = useForm<feedbackState>();

  const { errors } = formState;

  function onSubmit(data: feedbackState) {
    createFeedback({
      title: data.title,
      category,
      detail: data.detail,
      createdBy: currentUserId!,
    });
  }

  useEffect(() => {
    if (!currentUserId) navigate("/login");
  }, [currentUserId, navigate]);

  return (
    <section className="relative mx-auto flex min-h-[100dvh] w-full max-w-[58rem] flex-col justify-center px-8 py-8">
      <NavigateBack />

      <form
        className="mt-28 rounded-[1rem] bg-white p-16 tablet:mt-20 tablet:px-[2.4rem]"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="-mt-28">
          <img
            src="./shared/icon-new-feedback.svg"
            alt="new feedback"
            className="h-[5.6rem] w-[5.6rem]"
          />
        </div>

        <h1 className="pt-[2.4rem] text-[2.4rem] font-bold tracking-[-0.0333rem] text-[#3a4374] tablet:text-[1.8rem] tablet:tracking-[-0.025rem]">
          Create New Feedback
        </h1>

        <div className="space-y-[2.4rem] pt-16 tablet:pt-[2.4rem]">
          <div>
            <label className="flex flex-col pb-[1.6rem]" htmlFor="title">
              <span className="text-[1.4rem] font-bold tracking-[-0.0194rem] text-[#3a4374] tablet:text-[1.3rem] tablet:tracking-[-0.0181rem]">
                Feedback Title
              </span>
              <span className="text-[1.4rem] text-[#647196] tablet:text-[1.3rem]">
                Add a short, descriptive headline
              </span>
            </label>
            <input
              type="text"
              id="title"
              className={`w-full rounded-[0.5rem] border border-solid border-transparent bg-[#f7f8fd] px-[2.4rem] py-[1.2rem] text-[1.5rem] text-[#3a4374] outline-transparent tablet:text-[1.3rem] ${errors?.title?.message ? "border-[#d73737] focus:border-[#d73737] focus:outline-[#d73737]" : "border-transparent focus:border-[#4661e6] focus:outline-[#4661e6]"}`}
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
              <span className="text-[1.4rem] font-bold tracking-[-0.0194rem] text-[#3a4374] tablet:text-[1.3rem] tablet:tracking-[-0.0181rem]">
                Category
              </span>
              <span className="text-[1.4rem] text-[#647196] tablet:text-[1.3rem]">
                Choose a category for your feedback
              </span>
            </label>
            <button
              type="button"
              className="flex w-full items-center justify-between rounded-lg border border-solid border-transparent bg-[#f7f8fd] px-[2.4rem] py-[1.3rem] text-[1.5rem] font-bold text-[#3a4374] focus:border-[#4661e6] focus:outline-[#4661e6] tablet:text-[1.3rem]"
              onClick={handleToggleCategory}
            >
              <span>{category}</span>
              <motion.img
                initial={{ rotate: 0 }}
                animate={{ rotate: isCategoryOpen ? 180 : 0 }}
                transition={{ type: "spring" }}
                src="./shared/icon-arrow-down.svg"
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
                  className="absolute top-[12rem] w-full divide-y-[1px] divide-[#3a4374] divide-opacity-15 rounded-[1rem] bg-white shadow-modal-sh"
                >
                  <div
                    className="flex cursor-pointer items-center justify-between px-[2.4rem] py-[1.2rem] text-[1.6rem] text-[#647196] transition-all duration-300 hover:text-[#ad1fea] tablet:text-[1.3rem]"
                    onClick={() => handleCategoryChange("Feature")}
                  >
                    <span>Feature</span>
                    {category === "Feature" && (
                      <FaCheck color="#ad1fea" size={"1.5rem"} />
                    )}
                  </div>
                  <div
                    className="flex cursor-pointer items-center justify-between px-[2.4rem] py-[1.2rem] text-[1.6rem] text-[#647196] transition-all duration-300 hover:text-[#ad1fea] tablet:text-[1.3rem]"
                    onClick={() => handleCategoryChange("UI")}
                  >
                    <span>UI</span>
                    {category === "UI" && (
                      <FaCheck color="#ad1fea" size={"1.5rem"} />
                    )}
                  </div>
                  <div
                    className="flex cursor-pointer items-center justify-between px-[2.4rem] py-[1.2rem] text-[1.6rem] text-[#647196] transition-all duration-300 hover:text-[#ad1fea] tablet:text-[1.3rem]"
                    onClick={() => handleCategoryChange("UX")}
                  >
                    <span>UX</span>
                    {category === "UX" && (
                      <FaCheck color="#ad1fea" size={"1.5rem"} />
                    )}
                  </div>
                  <div
                    className="flex cursor-pointer items-center justify-between px-[2.4rem] py-[1.2rem] text-[1.6rem] text-[#647196] transition-all duration-300 hover:text-[#ad1fea] tablet:text-[1.3rem]"
                    onClick={() => handleCategoryChange("Enhancement")}
                  >
                    <span>Enhancement</span>
                    {category === "Enhancement" && (
                      <FaCheck color="#ad1fea" size={"1.5rem"} />
                    )}
                  </div>
                  <div
                    className="flex cursor-pointer items-center justify-between px-[2.4rem] py-[1.2rem] text-[1.6rem] text-[#647196] transition-all duration-300 hover:text-[#ad1fea] tablet:text-[1.3rem]"
                    onClick={() => handleCategoryChange("Bug")}
                  >
                    <span>Bug</span>
                    {category === "Bug" && (
                      <FaCheck color="#ad1fea" size={"1.5rem"} />
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <div>
            <label className="flex flex-col pb-[1.6rem]" htmlFor="detail">
              <span className="text-[1.4rem] font-bold tracking-[-0.0194rem] text-[#3a4374] tablet:text-[1.3rem] tablet:tracking-[-0.0181rem]">
                Feedback Detail
              </span>
              <span className="text-[1.4rem] text-[#647196] tablet:text-[1.3rem]">
                Include any specific comments on what should be improved, added,
                etc.
              </span>
            </label>
            <textarea
              id="detail"
              rows={4}
              className={`w-full resize-none rounded-[0.5rem] border border-solid border-transparent bg-[#f7f8fd] px-[2.4rem] py-[1.2rem] text-[1.5rem] text-[#3a4374] outline-transparent tablet:text-[1.3rem] ${errors?.detail?.message ? "border-[#d73737] focus:border-[#d73737] focus:outline-[#d73737]" : "border-transparent focus:border-[#4661e6] focus:outline-[#4661e6]"}`}
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

        <div className="flex items-center justify-end gap-8 pt-[3.2rem] tablet:flex-col tablet:items-stretch">
          <button
            type="button"
            className="rounded-[1rem] bg-[#3a4374] px-[2.4rem] py-[1.2rem] text-[1.4rem] font-bold text-[#f2f4fe] transition-all duration-300 hover:bg-[#656ea3]"
            onClick={() => {
              reset();
              navigate(-1);
            }}
          >
            Cancel
          </button>

          <button
            type="submit"
            className="rounded-[1rem] bg-[#ad1fea] px-[2.4rem] py-[1.2rem] text-[1.4rem] font-bold text-[#f2f4fe] transition-all duration-300 hover:bg-[#c75af6] tablet:-order-1"
          >
            Add Feedback
          </button>
        </div>
      </form>

      {isCreatingFeedback && <TransparentLoader />}
    </section>
  );
}

export default CreateFeedback;
