import React, { useState, useEffect, type FC } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../../../firebase/firebaseConfig";
import { useUserAuth } from "../../../../src/context/user/userAuthContext";
import { AppNavbar } from "../../../Layout/user/AppNavbar";
import HeaderBar from "../../../Layout/user/HeaderBar";

// Define Member interface based on the data structure
interface Member {
  id: string;
  name: string;
  relation: string;
  email?: string;
  phone?: string;
  bloodGroup?: string;
  education?: string;
  dob?: string;
}

// Calculate age from dob
const calculateAge = (dob: string | undefined): number | null => {
  if (!dob) return null;
  const [year, month, day] = dob.split('-').map(Number);
  if (isNaN(year) || isNaN(month) || isNaN(day)) return null;
  const birthDate = new Date(year, month - 1, day);
  const currentDate = new Date(2025, 6, 2); // Example date: July 2, 2025
  const age = currentDate.getFullYear() - birthDate.getFullYear();
  const m = currentDate.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && currentDate.getDate() < birthDate.getDate())) {
    return age - 1;
  }
  return age;
};

// Generic info row
const InfoRow: FC<{ label: string; value: string; bold?: boolean }> = ({
  label,
  value,
  bold,
}) => (
  <div className="mb-3">
    <div className="text-xs text-gray-500">{label}</div>
    <div className={`bg-gray-100 rounded-lg px-4 py-3 mt-1 text-base ${bold ? "font-semibold" : ""}`}>
      {value}
    </div>
  </div>
);

// For side-by-side info
const InfoGrid: FC<{ items: { label: string; value: string }[] }> = ({ items }) => (
  <div className="flex gap-3 mb-4">
    {items.map((item) => (
      <div key={item.label} className="flex-1">
        <div className="text-xs text-gray-500">{item.label}</div>
        <div className="bg-gray-100 rounded-lg px-4 py-2 mt-1 font-semibold text-base">{item.value}</div>
      </div>
    ))}
  </div>
);

const FamilyMemberDetails: FC = () => {
  const { id: memberId } = useParams<{ id: string }>(); // Get member ID from URL
  const { familyId } = useUserAuth(); // Get family ID from context
  const [member, setMember] = useState<Member | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch member data when component mounts or IDs change
  useEffect(() => {
    const fetchMember = async () => {
      if (!familyId || !memberId) {
        setError("Invalid family or member ID");
        setLoading(false);
        return;
      }
      setLoading(true);
      setError(null);
      try {
        const memberDocRef = doc(firestore, "families", familyId, "members", memberId);
        const snap = await getDoc(memberDocRef);
        if (snap.exists()) {
          setMember({ id: snap.id, ...snap.data() } as Member);
        } else {
          setError("Member not found");
        }
      } catch (err) {
        console.error("Error fetching member:", err);
        setError("Failed to fetch member details");
      } finally {
        setLoading(false);
      }
    };
    fetchMember();
  }, [familyId, memberId]);

  // Render loading state
  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  // Render error state or if member is not found
  if (error || !member) {
    return <div className="text-center py-10 text-red-600">{error || "Member not found"}</div>;
  }

  // Calculate age from dob
  const age = calculateAge(member.dob);

  return (
    <div className="min-h-dvh bg-white pb-16">
      {/* Header */}
      <HeaderBar title="Family Member Details" />

      <main className="px-4 pt-6 mx-auto">
        <div className="text-center mb-3">
          <div className="text-lg font-bold text-gray-900">{member.name}</div>
          <div className="text-teal-700 text-sm font-medium">{member.relation}</div>
        </div>

        <InfoGrid
          items={[
            { label: "Age", value: age !== null ? `${age} years` : "N/A" },
            { label: "Blood Group", value: member.bloodGroup || "N/A" },
          ]}
        />
        {member.education && <InfoRow label="Education" value={member.education} />}
        {member.phone && <InfoRow label="Phone number" value={member.phone} />}
        {member.email && <InfoRow label="Email" value={member.email} />}
        {member.dob && <InfoRow label="Date of Birth" value={member.dob} />}
      </main>
      <AppNavbar />
    </div>
  );
};

export default FamilyMemberDetails;