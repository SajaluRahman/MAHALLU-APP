import React from "react";
import StatCard from "../../components/common/AdminCommon/Dashboard/StatCard";
import ActivityItem from "../../components/common/AdminCommon/Dashboard/ActivityItem";
import QuickStats from "../../components/common/AdminCommon/Dashboard/QuickStats";
import {
  HiOutlineUsers,
  HiOutlineBell,
  HiOutlineDocumentText,
} from "react-icons/hi2";
import { LuIndianRupee } from "react-icons/lu";

const activities = [
  { title: "New user registration", time: "2 minutes ago" },
  { title: "New payment received", time: "10 minutes ago" },
  { title: "New complaint submitted", time: "1 hour ago" },
];

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4 md:p-8 transition-colors duration-300">
      <div className="max-w-5xl mx-auto">
        {/* Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-8 mb-8">
          <StatCard
            title="Total Users"
            value="1,234"
            icon={<HiOutlineUsers size={32} />}
            iconColor="text-emerald-600"
          />
          <StatCard
            title="Pending Requests"
            value="56"
            icon={<HiOutlineDocumentText size={32} />}
            iconColor="text-red-500"
          />
          <StatCard
            title="Monthly Revenue"
            value="₹2,45,000"
            icon={<LuIndianRupee size={32} />}
            iconColor="text-green-500"
          />
          <StatCard
            title="Active Notifications"
            value="12"
            icon={<HiOutlineBell size={32} />}
            iconColor="text-green-600"
          />
        </div>

        {/* Recent Activities */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-8 transition-colors duration-300">
          <div className="text-base font-semibold mb-4 text-gray-800 dark:text-white">
            Recent Activities
          </div>
          <div>
            {activities.map((act, idx) => (
              <ActivityItem key={idx} title={act.title} time={act.time} />
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <QuickStats />
      </div>
    </div>
  );
}
