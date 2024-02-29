function SidebarCategories({ category }: { category: string }) {
  return (
    <button className="rounded-[1rem] bg-[#f2f3ff] px-5 py-2 text-[1.3rem] font-semibold text-[#4661e6]">
      {category}
    </button>
  );
}

export default SidebarCategories;
