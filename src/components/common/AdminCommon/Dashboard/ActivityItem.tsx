import React from "react";
import { HiOutlineCheckCircle } from "react-icons/hi2";

interface ActivityItemProps {
  title: string;
  time: string;
}

const ActivityItem: React.FC<ActivityItemProps> = ({ title, time }) => (
  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 mb-3 flex items-start transition-colors duration-300">
    <span className="mt-1 mr-3 text-[#26A489]">
      <HiOutlineCheckCircle size={22} />
    </span>
    <div>
      <div className="text-gray-800 dark:text-white text-sm font-medium">{title}</div>
      <div className="text-xs text-gray-500 dark:text-gray-300">{time}</div>
    </div>
  </div>
);

export default ActivityItem;
