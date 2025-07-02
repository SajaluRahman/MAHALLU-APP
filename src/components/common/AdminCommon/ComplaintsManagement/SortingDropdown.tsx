
import { IoFilter } from "react-icons/io5";

export default function SortingDropdown() {
  return (
    <div className="flex items-center mb-4">
      <button className="flex items-center px-5 py-2 bg-white dark:bg-gray-900 rounded-full shadow text-gray-700 dark:text-gray-300 font-medium text-base">
        <IoFilter className="mr-2" />
        Sorting
      </button>
    </div>
  );
}