import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { useNavigate } from "react-router-dom";

function NavigateBack() {
  const navigate = useNavigate();
  return (
    <div
      className="flex cursor-pointer items-center gap-2 pb-28 text-[1.4rem] font-bold text-[#647196]"
      onClick={() => navigate(-1)}
    >
      <MdOutlineKeyboardArrowLeft size={"2rem"} />
      <span>Go Back</span>
    </div>
  );
}

export default NavigateBack;
