

interface TopTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const TopTabs: React.FC<TopTabsProps> = ({ activeTab, setActiveTab }) => (
  <div className="flex justify-center items-center gap-4 mb-1 mt-2">
    <button
      className={`uppercase text-xs font-medium pb-1 border-b-2 transition duration-300 ${
        activeTab === "monthly"
          ? "text-emerald-700 dark:text-emerald-400 border-emerald-700"
          : "text-gray-700 dark:text-gray-300 border-transparent hover:text-emerald-600"
      }`}
      onClick={() => setActiveTab("monthly")}
    >
      Monthly Payment
    </button>
    <button
      className={`uppercase text-xs font-medium pb-1 border-b-2 transition duration-300 ${
        activeTab === "mess"
          ? "text-emerald-700 dark:text-emerald-400 border-emerald-700"
          : "text-gray-700 dark:text-gray-300 border-transparent hover:text-emerald-600"
      }`}
      onClick={() => setActiveTab("mess")}
    >
      Mess Payment
    </button>
  </div>
);

export default TopTabs;
