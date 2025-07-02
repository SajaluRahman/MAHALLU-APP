
import UserTableRow from "./UserTableRow";

interface Family {
  houseNumber: string;
  address: string;
  members: { name: string; phone: string; email: string; bloodGroup: string; aadhar: string; pan: string; joinDate: string; payment: string; address: string }[];
}

interface UserTableProps {
  families: Family[];
}

const UserTable: React.FC<UserTableProps> = ({ families }) => (
  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-0 overflow-x-auto transition-colors duration-300">
    <table className="min-w-full text-left">
      <thead>
        <tr className="bg-gray-50 dark:bg-gray-700">
          <th className="py-2 px-4 font-medium text-gray-800 dark:text-white">House Number</th>
          <th className="py-2 px-4 font-medium text-gray-800 dark:text-white">Address</th>
          <th className="py-2 px-4 font-medium text-gray-800 dark:text-white">Actions</th>
        </tr>
      </thead>
      <tbody>
        {families.map((family, idx) => (
          <UserTableRow key={idx} {...family} />
        ))}
      </tbody>
    </table>
  </div>
);

export default UserTable;