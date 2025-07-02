
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";

interface NotificationTableRowProps {
  title: string;
  message: string;
  status: "Active" | "Inactive";
  date: string;
}

const statusColor: Record<string, string> = {
  Active: "bg-emerald-100 text-emerald-700 dark:bg-emerald-200 dark:text-emerald-800",
  Inactive: "bg-gray-200 text-gray-700 dark:bg-gray-500 dark:text-gray-100",
};

const NotificationTableRow: React.FC<NotificationTableRowProps> = ({
  title,
  message,
  status,
  date,
}) => (
  <tr className="border-b last:border-b-0 border-gray-200 dark:border-gray-600 transition-colors duration-300">
    <td className="py-2 px-4 font-bold text-gray-800 dark:text-gray-100">{title}</td>
    <td className="py-2 px-4 text-gray-700 dark:text-gray-200">{message}</td>
    <td className="py-2 px-4">
      <span
        className={`px-3 py-1 rounded-full text-xs font-medium ${statusColor[status]}`}
      >
        {status}
      </span>
    </td>
    <td className="py-2 px-4 text-gray-700 dark:text-gray-200">{date}</td>
    <td className="py-2 px-4 flex items-center gap-3">
      <button
        className="text-emerald-500 hover:text-emerald-700 dark:hover:text-emerald-300"
        title="View"
      >
        <FaEye />
      </button>
      <button
        className="text-blue-500 hover:text-blue-700 dark:hover:text-blue-300"
        title="Edit"
      >
        <FaEdit />
      </button>
      <button
        className="text-red-500 hover:text-red-700 dark:hover:text-red-300"
        title="Delete"
      >
        <FaTrash />
      </button>
    </td>
  </tr>
);

export default NotificationTableRow;
