import  { useState } from "react";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import { Modal } from "../../../ui/Modal";

interface Member {
  name: string;
  phone: string;
  email: string;
  bloodGroup: string;
  aadhar: string;
  pan: string;
  joinDate: string;
  payment: string;
  address: string;
}

interface UserTableRowProps {
  houseNumber: string;
  address: string;
  members: Member[];
}

const UserTableRow: React.FC<UserTableRowProps> = ({
  houseNumber,
  address,
  members,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <tr className="border-b border-gray-200 dark:border-gray-700 last:border-b-0 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
        <td className="py-3 px-4 text-gray-800 dark:text-gray-100 text-sm">{houseNumber}</td>
        <td className="py-3 px-4 text-gray-800 dark:text-gray-100 text-sm">{address || "N/A"}</td>
        <td className="py-3 px-4 flex items-center gap-4">
          <button
            onClick={() => setIsOpen(true)}
            className="text-emerald-500 hover:text-emerald-600 transition-colors"
            title="View"
            aria-label="View family details"
          >
            <FaEye className="w-5 h-5" />
          </button>
          <button
            className="text-[#26A489] hover:text-emerald-400 transition-colors"
            title="Edit"
            aria-label="Edit family"
          >
            <FaEdit className="w-5 h-5" />
          </button>
          <button
            className="text-red-500 hover:text-red-600 transition-colors"
            title="Delete"
            aria-label="Delete family"
          >
            <FaTrash className="w-5 h-5" />
          </button>
        </td>
      </tr>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} className="max-w-lg mx-auto py-6 px-4 ">
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 overflow-y-scroll max-h-[80vh]">
        <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 text-center">Family Details</h3>
        <div className="grid grid-cols-1 gap-4">
          <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 pb-2">
            <span className="font-medium text-gray-600 dark:text-gray-300">House Number</span>
            <span className="text-gray-800 dark:text-gray-100 text-right">{houseNumber}</span>
          </div>
          <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 pb-2">
            <span className="font-medium text-gray-600 dark:text-gray-300">Address</span>
            <span className="text-gray-800 dark:text-gray-100 text-right">{address || "N/A"}</span>
          </div>
          <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
            <h4 className="font-medium text-gray-600 dark:text-gray-300 mb-2">Members</h4>
            {members.length > 0 ? (
              members.map((member, idx) => (
                <div key={idx} className="mb-4 p-3 bg-gray-50 dark:bg-gray-800 rounded">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-600 dark:text-gray-300">Name</span>
                    <span className="text-gray-800 dark:text-gray-100">{member.name}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-600 dark:text-gray-300">Phone</span>
                    <span className="text-gray-800 dark:text-gray-100">{member.phone || "N/A"}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-600 dark:text-gray-300">Email</span>
                    <span className="text-gray-800 dark:text-gray-100">{member.email || "N/A"}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-600 dark:text-gray-300">Blood Group</span>
                    <span className="text-gray-800 dark:text-gray-100">{member.bloodGroup || "N/A"}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-600 dark:text-gray-300">Aadhar</span>
                    <span className="text-gray-800 dark:text-gray-100">{member.aadhar || "N/A"}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-600 dark:text-gray-300">PAN</span>
                    <span className="text-gray-800 dark:text-gray-100">{member.pan || "N/A"}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-600 dark:text-gray-300">Join Date</span>
                    <span className="text-gray-800 dark:text-gray-100">{member.joinDate || "N/A"}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-600 dark:text-gray-300">Payment</span>
                    <span className="text-gray-800 dark:text-gray-100">{member.payment || "N/A"}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-600 dark:text-gray-300">Address</span>
                    <span className="text-gray-800 dark:text-gray-100">{member.address || "N/A"}</span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-600 dark:text-gray-300">No members found.</p>
            )}
          </div>
        </div>
        <div className="mt-6 flex justify-center">
          <button
            onClick={() => setIsOpen(false)}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200"
          >
            Close
          </button>
        </div>
        </div>
      </Modal>
    </>
  );
};

export default UserTableRow;