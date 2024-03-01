function SidebarCategories({
  category,
  checkCategory,
  handleChangeCategory,
}: {
  category: string;
  checkCategory: string;
  handleChangeCategory: (value: string) => void;
}) {
  return (
    <button
      className={`rounded-[1rem] px-5 py-2 text-[1.3rem] font-semibold transition-all duration-500 ${checkCategory === category ? "bg-[#4661e6] text-white" : "bg-[#f2f3ff] text-[#4661e6] hover:bg-[#cfd7ff]"} `}
      onClick={() => handleChangeCategory(category)}
    >
      {category}
    </button>
  );
}

export default SidebarCategories;
