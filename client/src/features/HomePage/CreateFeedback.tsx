import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaCheck } from "react-icons/fa6";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { TiPlus } from "react-icons/ti";
import { useCreateFeedback } from "./useCreateFeedback";

import { useNavigate } from "react-router-dom";
import TransparentLoader from "../../ui/TransparentLoader";

type feedbackState = {
  title: string;
  detail: string;
};

function CreateFeedback() {
  const navigate = useNavigate();
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [category, setCategory] = useState("Feature");

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
    });
  }

  return (
    <section className="relative mx-auto flex min-h-[100dvh] w-full max-w-[58rem] flex-col justify-center">
      <div
        className="flex cursor-pointer items-center gap-2 pb-28 text-[1.4rem] font-bold text-[#647196]"
        onClick={() => navigate(-1)}
      >
        <MdOutlineKeyboardArrowLeft size={"2rem"} />
        <span>Go Back</span>
      </div>

      <form className="bg-white p-16" onSubmit={handleSubmit(onSubmit)}>
        <div className="-mt-28 flex h-[4.6rem] w-[4.6rem] items-center justify-center rounded-full bg-gradient-to-bl from-[#ed4d70] via-[#a337f6] to-[#28a7ed]">
          <TiPlus size={"3rem"} color="#fff" />
        </div>

        <h1 className="text-[2.4rem] font-bold tracking-[-0.0333rem] text-[#3a4374]">
          Create New Feedback
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
              className="flex w-full items-center justify-between rounded-lg border border-solid border-transparent bg-[#f7f8fd] px-[2.4rem] py-[1.3rem] text-[1.5rem] font-bold text-[#3a4374] focus:border-[#4661e6] focus:outline-[#4661e6]"
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
                    className="flex cursor-pointer items-center justify-between px-[2.4rem] py-[1.2rem] text-[1.6rem] text-[#647196] transition-all duration-300 hover:text-[#ad1fea]"
                    onClick={() => handleCategoryChange("Feature")}
                  >
                    <span>Feature</span>
                    {category === "Feature" && (
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
                    onClick={() => handleCategoryChange("Enhancement")}
                  >
                    <span>Enhancement</span>
                    {category === "Enhancement" && (
                      <FaCheck color="#ad1fea" size={"1.5rem"} />
                    )}
                  </div>
                  <div
                    className="flex cursor-pointer items-center justify-between px-[2.4rem] py-[1.2rem] text-[1.6rem] text-[#647196] transition-all duration-300 hover:text-[#ad1fea]"
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
              <span className="text-[1.4rem] font-bold tracking-[-0.0194rem] text-[#3a4374]">
                Feedback Detail
              </span>
              <span className="text-[1.4rem] text-[#647196]">
                Include any specific comments on what should be improved, added,
                etc.
              </span>
            </label>
            <textarea
              id="detail"
              rows={4}
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

        <div className="flex items-center justify-end gap-8 pt-[3.2rem]">
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
      </form>

      {isCreatingFeedback && <TransparentLoader />}
    </section>
  );
}

export default CreateFeedback;
