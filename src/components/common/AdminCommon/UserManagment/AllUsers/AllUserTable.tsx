import React from "react";
import AllUserTableRow from "./AllUserTableRow";

export interface UserTableRowProps {
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

interface UserTableProps {
  users: UserTableRowProps[];
}

const UserTable: React.FC<UserTableProps> = ({ users }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-0 overflow-x-auto transition-colors duration-300">
      <table className="min-w-full text-left">
        <thead>
          <tr className="bg-gray-50 dark:bg-gray-700">
            <th className="py-2 px-4 font-medium text-gray-800 dark:text-white">Name</th>
            <th className="py-2 px-4 font-medium text-gray-800 dark:text-white">Phone</th>
            <th className="py-2 px-4 font-medium text-gray-800 dark:text-white">Blood Group</th>
            <th className="py-2 px-4 font-medium text-gray-800 dark:text-white">Age</th>
            <th className="py-2 px-4 font-medium text-gray-800 dark:text-white">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, idx) => (
            <AllUserTableRow key={idx} {...user} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;