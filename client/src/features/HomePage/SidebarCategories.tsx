import { Link, useSearchParams } from "react-router-dom";

function SidebarCategories({
  category,
  handleToggleNav,
}: {
  category: string;
  handleToggleNav: () => void;
}) {
  const [searchParams] = useSearchParams();

  const isSortInQuery = searchParams.get("sortBy");
  const categoryQuery = searchParams.get("category");
  function handleQueryString(value: string) {
    return isSortInQuery
      ? `?sortBy=${isSortInQuery}&category=${value}`
      : `?category=${value}`;
  }

  return (
    <Link
      to={handleQueryString(category.toLowerCase())}
      className={`rounded-[1rem] px-5 py-2 text-[1.3rem] font-semibold transition-all duration-500 ${(categoryQuery || "all") === category.toLowerCase() ? "bg-[#4661e6] text-white" : "bg-[#f2f3ff] text-[#4661e6] hover:bg-[#cfd7ff]"} `}
      onClick={handleToggleNav}
    >
      {category}
    </Link>
  );
}

export default SidebarCategories;
