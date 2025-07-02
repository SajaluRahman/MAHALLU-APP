import React from "react";
import PaidUserCard from "./PaidUserCard";
import { IoArrowForwardCircleOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

interface PaidUser {
  name: string;
  address: string;
  time: string;
  paymentId: string;
  imgUrl: string;
}

interface PaidUserListProps {
  users: PaidUser[];
}


const PaidUserList: React.FC<PaidUserListProps> = ({ users }) => {
  const navigate = useNavigate();

  const toPaymentTable = () => {
    navigate("/payment-table");
  };

  return (
    <div className="flex flex-row items-center gap-24 mb-6 pl-1 ">
      {users.map((user, idx) => (
        <PaidUserCard key={idx} {...user} />
      ))}
      <button onClick={toPaymentTable} className="rounded-full bg-white dark:bg-gray-900 shadow p-2 ml-2 border dark:border-gray-800 transition duration-300 hover:scale-110 hover:border-emerald-500">
        <IoArrowForwardCircleOutline className="text-3xl text-gray-700 dark:text-gray-300" />
      </button>
    </div>
  );
};

export default PaidUserList;
