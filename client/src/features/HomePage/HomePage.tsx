import HomeSuggestionsSection from "./HomeSuggestionsSection";
import Sidebar from "./Sidebar";

function HomePage() {
  return (
    <div className="grid grid-cols-[auto_1fr] gap-12 p-16">
      <Sidebar />
      <HomeSuggestionsSection />
    </div>
  );
}

export default HomePage;
