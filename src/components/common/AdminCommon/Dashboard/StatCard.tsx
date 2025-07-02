import React from "react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  iconColor?: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, iconColor }) => (
  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 flex flex-col items-center max-w-[350px] min-h-[180px] transition-colors duration-300">
    <span className="text-gray-800 dark:text-white text-base mb-8">{title}</span>
    <span className="text-2xl font-semibold mb-8 text-gray-800 dark:text-white">{value}</span>
    <span className={iconColor}>{icon}</span>
  </div>
);

export default StatCard;
