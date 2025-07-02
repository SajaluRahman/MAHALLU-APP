
import StatCard from "./StatCard";
import { HiOutlineUsers, HiOutlineDocumentText } from "react-icons/hi2";
import { LuIndianRupee } from "react-icons/lu";
import { FaCheckCircle } from "react-icons/fa";
import { BsArrowDownLeft } from "react-icons/bs";

const StatGrid: React.FC = () => (
  <div className="flex flex-col gap-10">
    <div className="flex flex-wrap gap-10 mb-2">
      <StatCard
        label="Total Users"
        value="1,234"
        icon={<HiOutlineUsers size={32} />}
        iconColor="text-emerald-600"
      />
      <StatCard
        label="Completed Users"
        value="1,000"
        icon={<FaCheckCircle size={28} />}
        iconColor="text-cyan-400"
      />
    </div>
    <div className="flex flex-wrap gap-10 mb-2">
      <StatCard
        label="Pending Users"
        value={<span className="text-red-500">234</span>}
        icon={<HiOutlineDocumentText size={30} />}
        iconColor="text-red-500"
      />
      <StatCard
        label="Total Money Received"
        value="₹2,45,000"
        icon={<LuIndianRupee size={30} />}
        iconColor="text-green-500"
      />
    </div>
    <div className="flex flex-wrap gap-10">
      <StatCard
        label="Pending Money"
        value="1,43,000"
        icon={<BsArrowDownLeft size={28} />}
        iconColor="text-blue-500"
      />
    </div>
  </div>
);

export default StatGrid;
