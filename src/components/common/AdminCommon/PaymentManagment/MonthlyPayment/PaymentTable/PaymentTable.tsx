import React from "react";
import { FaPlus, FaEye, FaEdit, FaTrash } from "react-icons/fa";

type Payment = {
  user: string;
  amount: string;
  type: string;
  dueDate: string;
  status: "Paid" | "UnPaid";
};

const payments: Payment[] = [
  {
    user: "kadhar",
    amount: "₹5,000",
    type: "Monthly",
    dueDate: "2024-06-15",
    status: "Paid",
  },
  {
    user: "kadhar",
    amount: "₹5,000",
    type: "Monthly",
    dueDate: "2024-06-15",
    status: "UnPaid",
  },
  {
    user: "kadhar",
    amount: "₹5,000",
    type: "Monthly",
    dueDate: "2024-06-15",
    status: "Paid",
  },
  {
    user: "kadhar",
    amount: "₹5,000",
    type: "Monthly",
    dueDate: "2024-06-15",
    status: "Paid",
  },
];

const statusClass = (status: Payment["status"]) =>
  status === "Paid"
    ? "bg-green-100 text-green-600 border border-green-400"
    : "bg-red-100 text-red-600 border border-red-400";

const PaymentTable: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col items-center py-8 transition duration-300">
      <div className="flex flex-wrap gap-4 mb-4 w-full max-w-3xl">
        <button className="flex items-center gap-2 px-5 py-2 bg-teal-600 text-white rounded-md shadow transition duration-300 hover:bg-teal-700 hover:scale-105 font-medium">
          <FaPlus /> Add Payments
        </button>
        <select className="ml-auto px-3 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 shadow text-gray-700 dark:text-gray-300 transition duration-300 focus:ring-2 focus:ring-emerald-500">
          <option>Filter</option>
          <option>Paid</option>
          <option>UnPaid</option>
        </select>
      </div>

      <div className="w-full max-w-6xl bg-white dark:bg-gray-800 rounded-md shadow-md overflow-x-auto transition duration-300">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-gray-50 dark:bg-gray-700 transition">
              <th className="px-4 py-3 text-left font-semibold text-gray-800 dark:text-gray-200">
                User
              </th>
              <th className="px-4 py-3 text-left font-semibold text-gray-800 dark:text-gray-200">
                Amount
              </th>
              <th className="px-4 py-3 text-left font-semibold text-gray-800 dark:text-gray-200">
                Type
              </th>
              <th className="px-4 py-3 text-left font-semibold text-gray-800 dark:text-gray-200">
                Due Date
              </th>
              <th className="px-4 py-3 text-left font-semibold text-gray-800 dark:text-gray-200">
                Status
              </th>
              <th className="px-4 py-3 text-left font-semibold text-gray-800 dark:text-gray-200">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {payments.map((p, i) => (
              <tr
                key={i}
                className="border-b dark:border-gray-700 last:border-b-0 hover:bg-gray-100 dark:hover:bg-gray-700 transition duration-300"
              >
                <td className="px-4 py-3 text-gray-800 dark:text-gray-300">
                  {p.user}
                </td>
                <td className="px-4 py-3 text-gray-800 dark:text-gray-300">
                  {p.amount}
                </td>
                <td className="px-4 py-3 text-gray-800 dark:text-gray-300">
                  {p.type}
                </td>
                <td className="px-4 py-3 text-gray-800 dark:text-gray-300">
                  {p.dueDate}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium inline-block ${statusClass(
                      p.status
                    )}`}
                  >
                    {p.status}
                  </span>
                </td>
                <td className="px-4 py-3 flex gap-4 items-center">
                  <button
                    className="text-teal-600 hover:text-teal-800 transition duration-300 hover:scale-110"
                    title="View"
                  >
                    <FaEye />
                  </button>
                  <button
                    className="text-blue-500 hover:text-blue-700 transition duration-300 hover:scale-110"
                    title="Edit"
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="text-red-500 hover:text-red-700 transition duration-300 hover:scale-110"
                    title="Delete"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentTable;
