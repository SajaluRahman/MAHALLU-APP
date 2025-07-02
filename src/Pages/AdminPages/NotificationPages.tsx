import React from "react";
import { FaPlus } from "react-icons/fa";
import NotificationTable from "../../components/common/AdminCommon/NotificationTable/NotificationTable";

export default function NotificationPage() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4 md:p-8 transition-colors duration-300">
      <div className="max-w-4xl mx-auto">
        {/* Add Notification button */}
        <div className="mb-4">
          <button className="flex items-center bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 text-white font-medium px-6 py-2 rounded-lg text-base shadow-md transition-colors duration-300">
            <FaPlus className="mr-2" /> Add Notifications
          </button>
        </div>
        {/* Table */}
        <NotificationTable />
      </div>
    </div>
  );
}
