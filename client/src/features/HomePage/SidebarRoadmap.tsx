function SidebarRoadmap({
  status,
  number,
}: {
  status: string;
  number: number;
}) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-[1.6rem]">
        <div
          className={`h-[0.8rem] w-[0.8rem] rounded-full ${status === "Planned" ? "bg-[#f49f85]" : status === "In-Progress" ? "bg-[#ad1fea]" : "bg-[#62bcfa]"}`}
        ></div>
        <p className="text-[1.6rem] text-[#647196]">{status}</p>
      </div>
      <p className="text-[1.6rem] font-bold text-[#647196]">{number}</p>
    </div>
  );
}

export default SidebarRoadmap;
