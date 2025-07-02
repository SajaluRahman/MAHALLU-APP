import React, { useState, useEffect, type FC } from "react";
import { useUserAuth } from "../../../../src/context/user/userAuthContext";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../../../firebase/firebaseConfig";
import { useNavigate } from "react-router-dom";
import { AppNavbar } from "../../../Layout/user/AppNavbar";

// Info icons for address, members, phone
const InfoIcon: FC<{ type: "location" | "members" | "phone" }> = ({ type }) => {
  switch (type) {
    case "location":
      return (
        <svg className="w-5 h-5 text-teal-700" fill="none" viewBox="0 0 24 24">
          <path d="M12 21s-6-5.686-6-10A6 6 0 1112 21z" stroke="currentColor" strokeWidth={1.7}/>
          <circle cx="12" cy="11" r="2.5" stroke="currentColor" strokeWidth={1.7}/>
        </svg>
      );
    case "members":
      return (
        <svg className="w-5 h-5 text-teal-700" fill="none" viewBox="0 0 24 24">
          <path d="M16 19v-2a4 4 0 00-8 0v2" stroke="currentColor" strokeWidth={1.7}/>
          <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth={1.7}/>
        </svg>
      );
    case "phone":
      return (
        <svg className="w-5 h-5 text-teal-700" fill="none" viewBox="0 0 24 24">
          <path d="M22 16.92V21a1 1 0 01-1.1 1A19.72 19.72 0 013 5.1 1 1 0 014 4h4.09a1 1 0 011 .75l1.09 4.36a1 1 0 01-.29 1L8.21 11.79a16 16 0 006 6l1.7-1.7a1 1 0 011-.29l4.36 1.09a1 1 0 01.75 1V16.92z" stroke="currentColor" strokeWidth={1.7}/>
        </svg>
      );
    default:
      return null;
  }
};

// Edit icon for card
const EditIcon: FC = () => (
  <svg className="w-5 h-5 text-teal-700" fill="none" viewBox="0 0 24 24">
    <path d="M16.862 3.487a2.13 2.13 0 113.015 3.015l-11.27 11.27-3.42.38.38-3.42 11.295-11.245z" stroke="currentColor" strokeWidth={1.7} strokeLinejoin="round"/>
  </svg>
);

// Define Member interface based on CreateFamily data structure
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
  const currentDate = new Date(2025, 6, 2); // July 2, 2025, as per system date
  const age = currentDate.getFullYear() - birthDate.getFullYear();
  const m = currentDate.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && currentDate.getDate() < birthDate.getDate())) {
    return age - 1;
  }
  return age;
};

// Updated FamilyMemberCard to use dob and calculate age
const FamilyMemberCard: FC<{ name: string; relation: string; dob?: string; onClick?: () => void }> = ({ name, relation, dob, onClick }) => {
  const age = calculateAge(dob);
  return (
    <div onClick={onClick} className="border-l-6 border-primary bg-white rounded-xl shadow px-4 py-5 mb-4 mx-2 cursor-pointer">
      <div className="pl-4">
        <div className="font-semibold text-lg text-gray-900">{name}</div>
        <div className="text-sm text-gray-600">
          {`Age: ${age !== null ? age : 'N/A'} - ${relation}`}
        </div>
      </div>
    </div>
  );
};

const FamilyInformation: FC = () => {
  const { familyId } = useUserAuth();
  const [members, setMembers] = useState<Member[]>([]);
  const [familyPhone, setFamilyPhone] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMembers = async () => {
      if (!familyId) {
        setError("Please log in as a family");
        setLoading(false);
        return;
      }
      setLoading(true);
      setError(null);
      try {
        const membersCol = collection(firestore, "families", familyId, "members");
        const snap = await getDocs(membersCol);
        const membersData = snap.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        })) as Member[];
        setMembers(membersData);
        // Set family phone: prefer Guardian's phone, else first member's phone
        const guardian = membersData.find(m => m.relation.toLowerCase() === "guardian");
        setFamilyPhone(guardian?.phone || membersData[0]?.phone || null);
      } catch (err) {
        console.error("Error fetching members:", err);
        setError("Failed to fetch family members");
      } finally {
        setLoading(false);
      }
    };
    fetchMembers();
  }, [familyId]);

  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-600">{error}</div>;
  }

  if (!familyId) {
    return <div className="text-center py-10">Please log in as a family</div>;
  }

  return (
    <div className="bg-gray-100 pb-20 relative">
      {/* Header */}
      <h2 className="text-slate-900 text-center py-4 text-2xl font-extrabold">Family Information</h2>

      <main className="px-4 max-w-md mx-auto">
        {/* Family Info Card */}
        <div className="relative bg-white rounded-2xl shadow px-5 py-6 mb-6">
          <div className="flex justify-between items-start">
            <div>
              <div className="font-bold text-lg text-gray-900 mb-1">{familyId}</div>
              {/* Address omitted as it's not in the database */}
              <div className="flex items-center text-sm text-gray-600 mb-1">
                <InfoIcon type="members" />
                <span className="ml-2">{`${members.length} Member${members.length !== 1 ? 's' : ''}`}</span>
              </div>
              {familyPhone && (
                <div className="flex items-center text-sm text-gray-600">
                  <InfoIcon type="phone" />
                  <span className="ml-2">{familyPhone}</span>
                </div>
              )}
            </div>
            <button
              className="rounded-full p-1.5 bg-teal-50 hover:bg-teal-100 shadow"
              aria-label="Edit"
              type="button"
              // Edit functionality not implemented
            >
              <EditIcon />
            </button>
          </div>
        </div>

        {/* Family Members */}
        <div className="flex items-center gap-2 mb-3 mt-2 px-2">
          <svg className="w-6 h-6 text-teal-700" fill="none" viewBox="0 0 24 24">
            <path d="M16 19v-2a4 4 0 00-8 0v2" stroke="currentColor" strokeWidth={1.7}/>
            <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth={1.7}/>
            <circle cx="6" cy="17" r="4" stroke="currentColor" strokeWidth={1.7}/>
            <circle cx="18" cy="17" r="4" stroke="currentColor" strokeWidth={1.7}/>
          </svg>
          <span className="font-bold text-lg text-teal-800">Family Members</span>
        </div>
        <div className="bg-teal-100 rounded-2xl py-4 mb-20 shadow-inner">
          {members.length > 0 ? (
            members.map((member) => (
              <FamilyMemberCard
                key={member.id}
                name={member.name}
                relation={member.relation}
                dob={member.dob}
                onClick={() => navigate(`/family-member/${member.id}`)}
              />
            ))
          ) : (
            <div className="text-center text-gray-600 py-4">No members found</div>
          )}

        </div>
      </main>
      <AppNavbar />
    </div>
  );
};

export default FamilyInformation;