import React from "react";
import NotificationTableRow from "./NotificationTableRow";

const notifications = [
  {
    title: "Community Meeting",
    message: "Monthly community meeting scheduled",
    status: "Active",
    date: "2024-06-10",
  },
  {
    title: "Eid Celebration",
    message: "Eid celebration arrangements",
    status: "Inactive",
    date: "2024-06-10",
  },
  {
    title: "Community Meeting",
    message: "Monthly community meeting scheduled",
    status: "Active",
    date: "2024-06-10",
  },
  {
    title: "Community Meeting",
    message: "Monthly community meeting scheduled",
    status: "Active",
    date: "2024-06-10",
  },
];

const NotificationTable: React.FC = () => (
  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-0 overflow-x-auto transition-colors duration-300">
    <table className="min-w-full text-left">
      <thead>
        <tr className="bg-gray-50 dark:bg-gray-700 transition-colors duration-300">
          <th className="py-2 px-4 font-medium text-gray-700 dark:text-gray-200">Title</th>
          <th className="py-2 px-4 font-medium text-gray-700 dark:text-gray-200">Message</th>
          <th className="py-2 px-4 font-medium text-gray-700 dark:text-gray-200">Status</th>
          <th className="py-2 px-4 font-medium text-gray-700 dark:text-gray-200">Date</th>
          <th className="py-2 px-4 font-medium text-gray-700 dark:text-gray-200">Actions</th>
        </tr>
      </thead>
      <tbody>
        {notifications.map((noti, idx) => (
          <NotificationTableRow key={idx} {...noti} />
        ))}
      </tbody>
    </table>
  </div>
);

export default NotificationTable;
