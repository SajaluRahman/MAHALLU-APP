import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import UserTable from "../../components/common/AdminCommon/UserManagment/UserTable";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../../../src/firebase/firebaseConfig";

interface Family {
  houseNumber: string;
  address: string;
  members: { name: string; phone: string; email: string; bloodGroup: string; aadhar: string; pan: string; joinDate: string; payment: string; address: string }[];
}

export default function UsersPage() {
  const [families, setFamilies] = useState<Family[]>([]);
  const [filteredFamilies, setFilteredFamilies] = useState<Family[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchFamilies = async () => {
      try {
        const familiesCol = collection(firestore, "families");
        const familiesSnapshot = await getDocs(familiesCol);
        const familiesData: Family[] = [];

        for (const familyDoc of familiesSnapshot.docs) {
          const familyData = familyDoc.data();
          const membersCol = collection(firestore, `families/${familyDoc.id}/members`);
          const membersSnapshot = await getDocs(membersCol);
          const membersData = membersSnapshot.docs.map((doc) => {
            const d = doc.data();
            return {
              name: d.name || "",
              phone: d.phone || "",
              email: d.email || "",
              bloodGroup: d.bloodGroup || "",
              aadhar: d.aadhar || "",
              pan: d.pan || "",
              joinDate: d.createdAt?.toDate().toISOString().slice(0, 10) || "",
              payment: d.payment || "",
              address: d.address || "",
            };
          });

          familiesData.push({
            houseNumber: familyData.houseNumber || familyDoc.id,
            address: familyData.address || "",
            members: membersData,
          });
        }

        setFamilies(familiesData);
        setFilteredFamilies(familiesData);
      } catch (err) {
        console.error("Error fetching families:", err);
      }
    };
    fetchFamilies();
  }, []);

  useEffect(() => {
    if (search.trim()) {
      const s = search.toLowerCase();
      setFilteredFamilies(
        families.filter((f) => f.houseNumber.toLowerCase().includes(s))
      );
    } else {
      setFilteredFamilies(families);
    }
  }, [search, families]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4 md:p-8 transition-colors duration-300">
      <div className="max-w-3xl mx-auto">
        <div className="mb-4">
          <div className="relative">
            <input
              type="text"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:border-emerald-400 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400 transition-colors duration-300"
              placeholder="Search by house number..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-300" />
          </div>
        </div>
        <UserTable families={filteredFamilies} />
      </div>
    </div>
  );
}