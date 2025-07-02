import React, { useState } from "react";
import { FaEye } from "react-icons/fa";
import { Modal } from "../../../ui/Modal/index";
import { Calendar, User } from "lucide-react";
import Button from "../../../ui/button/Button";
import { doc, updateDoc } from "firebase/firestore";
import { firestore } from "../../../../firebase/firebaseConfig";

interface RequestTableRowProps {
  id: string;
  certificateType: string;
  name: string;
  status: "pending" | "accepted" | "rejected";
  createdAt: string;
  description: string;
}

const statusColor: Record<"pending" | "accepted" | "rejected", string> = {
  pending: "bg-yellow-100 text-yellow-700 dark:bg-yellow-200 dark:text-yellow-800",
  accepted: "bg-emerald-100 text-emerald-700 dark:bg-emerald-200 dark:text-emerald-800",
  rejected: "bg-red-100 text-red-700 dark:bg-red-200 dark:text-red-800",
};

const statusLabel: Record<"pending" | "accepted" | "rejected", string> = {
  pending: "Pending",
  accepted: "Accepted",
  rejected: "Rejected",
};

const RequestTableRow: React.FC<RequestTableRowProps> = ({
  certificateType,
  createdAt,
  status,
  name,
  description,
  id,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleRequest = async (docId: string, newStatus: "accepted" | "rejected") => {
    try {
      const ref = doc(firestore, "certificates", docId);
      await updateDoc(ref, { status: newStatus });
      closeModal();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <tr className="border-b dark:border-gray-700 last:border-b-0 transition-colors duration-300">
        <td className="py-2 px-4 font-medium text-gray-800 dark:text-gray-200 text-left">
          {certificateType}
        </td>
        <td className="py-2 px-4 text-gray-700 dark:text-gray-300">{name}</td>
        <td className="py-2 px-4">
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${statusColor[status]}`}
          >
            {statusLabel[status]}
          </span>
        </td>
        <td className="py-2 px-4 text-gray-700 dark:text-gray-300">
          {new Date(createdAt).toLocaleDateString()}
        </td>
        <td className="py-2 text-center">
          <button
            onClick={openModal}
            className="text-emerald-500 hover:text-emerald-700 dark:hover:text-emerald-400 transition"
            title="View"
          >
            <FaEye />
          </button>
        </td>
      </tr>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        isFullscreen={false}
        className="p-6 max-w-2xl mx-auto"
      >
        <div className="py-6">
          <div className="flex justify-between items-center  py-5">
            <h1 className="text-2xl font-bold">{certificateType}</h1>
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium ${statusColor[status]}`}
            >
              {statusLabel[status]}
            </span>
          </div>
          <div className="flex flex-col md:flex-row gap-10 justify-between">
            <div className="flex items-center gap-4 bg-gray-50 py-2 w-full px-2 rounded-xl">
              <User className="text-primary" />
              <div className="flex flex-col items-start">
                <h2 className="text-gray-700 ">Sender</h2>
                <p className="font-semibold text-gray-800">{name}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 bg-gray-50 py-2 w-full px-2 rounded-xl">
              <Calendar className="text-primary" />
              <div className="flex flex-col items-start">
                <h2 className="text-gray-700">Date Submitted</h2>
                <p className="font-semibold  text-gray-800">
                  {new Date(createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
          <h1 className="text-left text-lg font-semibold py-4">Description</h1>
          <div className="text-left bg-gray-50 py-2 w-full px-2 rounded-xl">
            <p
              className="leading-relaxed tracking-wide"
              style={{ wordSpacing: "0.25rem" }}
            >
              {description}
            </p>
          </div>
          <div className="flex justify-end gap-4 mt-4">
            <Button
              className="text-red-700"
              size="sm"
              variant="outline"
              onClick={() => handleRequest(id, "rejected")}
            >
              Reject
            </Button>
            <Button
              onClick={() => handleRequest(id, "accepted")}
              size="sm"
              variant="bg_lener"
            >
              Accept
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default RequestTableRow;