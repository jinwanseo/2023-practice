import QuickBtn from "./tools/QuickBtn";
import SideList from "./tools/SideList";
import RefList from "./tools/RefList";

function Sidebar() {
  return (
    <aside
      className="
      col-start-1
      col-end-4
      row-start-1
      row-end-7
      flex flex-col gap-9 p-9 font-light overflow-y-auto"
    >
      {/* 빠른 검색 */}
      <QuickBtn />
      {/* Document ~ Community */}
      <SideList />
      {/* Getting Started */}
      <RefList
        title="Getting Started"
        list={[
          { id: 1, label: "Installation" },
          { id: 2, label: "Editor Setup" },
          { id: 3, label: "Using with Preprocessors" },
          { id: 4, label: "Optimizing for Production" },
          { id: 5, label: "Browser Support" },
          { id: 6, label: "Upgrade Guide" },
        ]}
      />
      {/* CoreConcepts */}
      <RefList
        title="Core Concepts"
        list={[
          { id: 1, label: "Utility-First Fundamentals" },
          { id: 2, label: "Hover, Focus, and Other States" },
          { id: 3, label: "Responsive Design" },
          { id: 4, label: "Dark Mode" },
          { id: 5, label: "Reusing Styles" },
          { id: 6, label: "Adding Custom Styles" },
          { id: 7, label: "Functions & Directives" },
        ]}
      />
    </aside>
  );
}

export default Sidebar;
