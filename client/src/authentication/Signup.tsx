import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useSignup } from "./useSignup";
import TransparentLoader from "../ui/TransparentLoader";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";

type feedbackState = {
  name: string;
  username: string;
  password: string;
  confirmPassword: string;
};

function Signup() {
  const navigate = useNavigate();
  const { signup, isSigningUp } = useSignup();

  const { register, handleSubmit, formState, reset, getValues } =
    useForm<feedbackState>();

  const { errors } = formState;

  function onSubmit(data: feedbackState) {
    signup(data);
  }

  return (
    <section className="relative mx-auto flex min-h-[100dvh] w-full max-w-[58rem] flex-col justify-center px-8 py-8">
      <div
        className={`tablet:text-[1.3rem flex cursor-pointer items-center gap-2 text-[1.4rem] font-bold text-[#647196] hover:underline`}
        onClick={() => navigate("/")}
      >
        <MdOutlineKeyboardArrowLeft size={"2rem"} />
        <span>Go Back</span>
      </div>

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
          Create account
        </h1>

        <div className="space-y-[2.4rem] pt-16 tablet:pt-[2.4rem]">
          <div>
            <label className="flex flex-col pb-[1.6rem]" htmlFor="name">
              <span className="text-[1.4rem] font-bold tracking-[-0.0194rem] text-[#3a4374] tablet:text-[1.3rem] tablet:tracking-[-0.0181rem]">
                Full Name
              </span>
            </label>
            <input
              type="text"
              id="name"
              placeholder="e.g. George Olatoyan"
              className={`w-full rounded-[0.5rem] border border-solid border-transparent bg-[#f7f8fd] px-[2.4rem] py-[1.2rem] text-[1.5rem] text-[#3a4374] outline-transparent tablet:text-[1.3rem] ${errors?.name?.message ? "border-[#d73737] focus:border-[#d73737] focus:outline-[#d73737]" : "border-transparent focus:border-[#4661e6] focus:outline-[#4661e6]"}`}
              {...register("name", {
                required: "Can't be empty",
                minLength: {
                  value: 3,
                  message: "Must be at least 3 characters",
                },
              })}
            />
            {errors?.name?.message && (
              <p className="pt-1 text-[1.4rem] text-[#d73737]">
                {errors?.name?.message}
              </p>
            )}
          </div>
          <div>
            <label className="flex flex-col pb-[1.6rem]" htmlFor="username">
              <span className="text-[1.4rem] font-bold tracking-[-0.0194rem] text-[#3a4374] tablet:text-[1.3rem] tablet:tracking-[-0.0181rem]">
                Username
              </span>
            </label>
            <input
              type="text"
              id="username"
              placeholder="e.g. toyan"
              className={`w-full rounded-[0.5rem] border border-solid border-transparent bg-[#f7f8fd] px-[2.4rem] py-[1.2rem] text-[1.5rem] text-[#3a4374] outline-transparent tablet:text-[1.3rem] ${errors?.username?.message ? "border-[#d73737] focus:border-[#d73737] focus:outline-[#d73737]" : "border-transparent focus:border-[#4661e6] focus:outline-[#4661e6]"}`}
              {...register("username", {
                required: "Can't be empty",
                minLength: {
                  value: 3,
                  message: "Must be at least 3 characters",
                },
              })}
            />
            {errors?.username?.message && (
              <p className="pt-1 text-[1.4rem] text-[#d73737]">
                {errors?.username?.message}
              </p>
            )}
          </div>
          <div>
            <label className="flex flex-col pb-[1.6rem]" htmlFor="password">
              <span className="text-[1.4rem] font-bold tracking-[-0.0194rem] text-[#3a4374] tablet:text-[1.3rem] tablet:tracking-[-0.0181rem]">
                Password
              </span>
            </label>
            <input
              type="password"
              id="password"
              placeholder="At least 6 characters"
              className={`w-full rounded-[0.5rem] border border-solid border-transparent bg-[#f7f8fd] px-[2.4rem] py-[1.2rem] text-[1.5rem] text-[#3a4374] outline-transparent tablet:text-[1.3rem] ${errors?.password?.message ? "border-[#d73737] focus:border-[#d73737] focus:outline-[#d73737]" : "border-transparent focus:border-[#4661e6] focus:outline-[#4661e6]"}`}
              {...register("password", {
                required: "Can't be empty",
                minLength: {
                  value: 6,
                  message: "Must be at least 6 characters",
                },
              })}
            />
            {errors?.password?.message && (
              <p className="pt-1 text-[1.4rem] text-[#d73737]">
                {errors?.password?.message}
              </p>
            )}
          </div>
          <div>
            <label className="flex flex-col pb-[1.6rem]" htmlFor="confirm">
              <span className="text-[1.4rem] font-bold tracking-[-0.0194rem] text-[#3a4374] tablet:text-[1.3rem] tablet:tracking-[-0.0181rem]">
                Confirm Password
              </span>
            </label>
            <input
              type="password"
              id="confirm"
              placeholder="At least 6 characters"
              className={`w-full rounded-[0.5rem] border border-solid border-transparent bg-[#f7f8fd] px-[2.4rem] py-[1.2rem] text-[1.5rem] text-[#3a4374] outline-transparent tablet:text-[1.3rem] ${errors?.confirmPassword?.message ? "border-[#d73737] focus:border-[#d73737] focus:outline-[#d73737]" : "border-transparent focus:border-[#4661e6] focus:outline-[#4661e6]"}`}
              {...register("confirmPassword", {
                required: "Can't be empty",
                validate: (value) =>
                  value === getValues("password") ||
                  "The passwords do not match",
              })}
            />
            {errors?.confirmPassword?.message && (
              <p className="pt-1 text-[1.4rem] text-[#d73737]">
                {errors?.confirmPassword?.message}
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
            Create Account
          </button>
        </div>

        <p className="pt-16 text-center text-[1.4rem] font-bold tracking-[-0.0194rem] text-[#647196] tablet:text-[1.3rem] tablet:tracking-[-0.0181rem]">
          Already have an account?{" "}
          <Link className="text-[#4661e6] underline" to="/login">
            Sign in
          </Link>
        </p>
      </form>

      {isSigningUp && <TransparentLoader />}
    </section>
  );
}

export default Signup;
