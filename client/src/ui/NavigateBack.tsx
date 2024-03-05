import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { useNavigate } from "react-router-dom";

function NavigateBack({ text }: { text?: string }) {
  const navigate = useNavigate();
  return (
    <div
      className={`flex cursor-pointer items-center gap-2 text-[1.4rem] font-bold hover:underline tablet:text-[1.3rem] ${text ? "text-white" : "text-[#647196]"}`}
      onClick={() => navigate(-1)}
    >
      <MdOutlineKeyboardArrowLeft size={"2rem"} />
      <span>Go Back</span>
    </div>
  );
}

export default NavigateBack;
