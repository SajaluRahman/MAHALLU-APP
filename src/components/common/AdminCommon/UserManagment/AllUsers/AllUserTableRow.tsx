import React from "react";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";

interface UserTableRowProps {
  name: string;
  phone: string;
  email: string;
  bloodGroup: string;
  aadhar: string;
  pan: string;
  joinDate: string;
  payment: string;
  address: string;
  dob?: string;
  age?: number;
}

const AllUserTableRow: React.FC<UserTableRowProps> = ({
  name,
  phone,
  bloodGroup,
  address,
  dob,
  age,
}) => {
  const [popupOpen, setPopupOpen] = React.useState(false);

  const setView = () => {
    setPopupOpen(!popupOpen);
  };

  return (
    <>
      <tr className="border-b border-gray-200 dark:border-gray-700 last:border-b-0 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
        <td className="py-3 px-4 text-gray-800 dark:text-gray-100 text-sm">{name}</td>
        <td className="py-3 px-4 text-gray-800 dark:text-gray-100 text-sm">{phone || "N/A"}</td>
        <td className="py-3 px-4 text-gray-800 dark:text-gray-100 text-sm">{bloodGroup || "N/A"}</td>
        <td className="py-3 px-4 text-gray-800 dark:text-gray-100 text-sm">{age !== undefined ? age : "N/A"}</td>
        <td className="py-3 px-4 flex items-center gap-4">
          <button
            onClick={setView}
            className="text-emerald-500 hover:text-emerald-600 transition-colors"
            title="View"
            aria-label="View user details"
          >
            <FaEye className="w-5 h-5" />
          </button>
          <button
            className="text-[#26A489] hover:text-emerald-400 transition-colors"
            title="Edit"
            aria-label="Edit user"
          >
            <FaEdit className="w-5 h-5" />
          </button>
          <button
            className="text-red-500 hover:text-red-600 transition-colors"
            title="Delete"
            aria-label="Delete user"
          >
            <FaTrash className="w-5 h-5" />
          </button>
        </td>
      </tr>
      {popupOpen && (
        <div className="fixed inset-0 bg-opacity-50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="relative bg-white dark:bg-gray-900 rounded-xl shadow-2xl max-w-lg w-full p-6 sm:p-8">
            <button
              onClick={setView}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
              aria-label="Close popup"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 text-center">User Details</h3>
            <div className="grid grid-cols-1 gap-4">
              <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 pb-2">
                <span className="font-medium text-gray-600 dark:text-gray-300">Full Name</span>
                <span className="text-gray-800 dark:text-gray-100 text-right">{name}</span>
              </div>
              <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 pb-2">
                <span className="font-medium text-gray-600 dark:text-gray-300">DOB</span>
                <span className="text-gray-800 dark:text-gray-100 text-right">{dob || "N/A"}</span>
              </div>
              <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 pb-2">
                <span className="font-medium text-gray-600 dark:text-gray-300">Age</span>
                <span className="text-gray-800 dark:text-gray-100 text-right">{age !== undefined ? age : "N/A"}</span>
              </div>
              <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 pb-2">
                <span className="font-medium text-gray-600 dark:text-gray-300">Blood Group</span>
                <span className="text-gray-800 dark:text-gray-100 text-right">{bloodGroup || "N/A"}</span>
              </div>
              <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 pb-2">
                <span className="font-medium text-gray-600 dark:text-gray-300">Phone</span>
                <span className="text-gray-800 dark:text-gray-100 text-right">{phone || "N/A"}</span>
              </div>
              <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 pb-2">
                <span className="font-medium text-gray-600 dark:text-gray-300">Address</span>
                <span className="text-gray-800 dark:text-gray-100 text-right">{address || "N/A"}</span>
              </div>
            </div>
            <div className="mt-6 flex justify-center">
              <button
                onClick={setView}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AllUserTableRow;