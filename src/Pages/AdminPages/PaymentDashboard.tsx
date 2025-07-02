import React, { useState } from "react";
import PaymentTabs from "../../components/common/AdminCommon/PaymentManagment/MonthlyPayment/PaymentTabs";
import PaidUserList from "../../components/common/AdminCommon/PaymentManagment/MonthlyPayment/PaidUserList";
import StatGrid from "../../components/common/AdminCommon/PaymentManagment/MonthlyPayment/StatGrid";
import StatisticsCard from "../../components/common/AdminCommon/PaymentManagment/MonthlyPayment/StatisticsCard";

// Place avatar1.png, avatar2.png, avatar3.png in your /public folder
const usersPaid = [
  {
    name: "MUHAMMAD",
    address: "TESSORAMANNI HOUSE",
    time: "Time: 2:04 PM",
    paymentId: "PAYMENT ID",
    imgUrl: "/avatar1.png",
  },
  {
    name: "MUKASSID",
    address: "MEEZHATHUKARAN HOUSE",
    time: "Time: 2:01 PM",
    paymentId: "PAYMENT ID",
    imgUrl: "/avatar2.png",
  },
  {
    name: "IRSHAD SIR",
    address: "NEDUVATH HOUSE",
    time: "Time: 2:01 PM",
    paymentId: "PAYMENT ID",
    imgUrl: "/avatar3.png",
  },
];

const PaymentDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState("monthly");

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-8 transition-colors duration-300">
      <div className="max-w-6xl ml-20">
        <PaymentTabs activeTab={activeTab} setActiveTab={setActiveTab} />

        <div className="mt-3 mb-2 text-lg font-semibold px-1 text-gray-800 dark:text-gray-100">
          LAST PAID :-
        </div>
        <PaidUserList users={usersPaid} />

        <div className="mt-6 mb-2 text-lg font-semibold px-1 text-gray-800 dark:text-gray-100">
          DETAILS :-
        </div>
        <StatGrid />

        <StatisticsCard />
      </div>
    </div>
  );
};

export default PaymentDashboard;
