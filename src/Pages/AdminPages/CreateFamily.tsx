import  { useState } from "react";
import { initSecondaryAuth, firestore } from "../../firebase/firebaseConfig";
import {
  createUserWithEmailAndPassword,
  type Auth as FirebaseAuth,
} from "firebase/auth";
import {
  collection,
  doc,
  setDoc,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";
import { useUserAuth } from "../../context/user/userAuthContext";

const EMAIL_DOMAIN = "mahallu-app.local";

const BLOOD_GROUPS = [
  "",
  "A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-",
  "A1+", "A1-", "A2+", "A2-",
  "A1B+", "A1B-", "A2B+", "A2B-",
  "Bombay Blood Group",
];

interface Member {
  name: string;
  relation: string;
  email?: string;
  phone?: string; // Added phone field
  bloodGroup?: string;
  education?: string;
  dob?: string;
}

const CreateFamily: React.FC = () => {
  const { user: adminUser, role } = useUserAuth();
  const [houseNumber, setHouseNumber] = useState("");
  const [password, setPassword] = useState("");
  const [members, setMembers] = useState<Member[]>([
    { name: "", relation: "" },
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleMemberChange = (idx: number, field: keyof Member, value: string) => {
    setMembers((prev) => {
      const copy = [...prev];
      copy[idx] = { ...copy[idx], [field]: value };
      return copy;
    });
  };

  const addMemberField = () => {
    setMembers((prev) => [
      ...prev,
      { name: "", relation: "" },
    ]);
  };
  const removeMemberField = (idx: number) => {
    setMembers((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);

    if (!adminUser || role !== "admin") {
      setError("Unauthorized");
      return;
    }
    if (!houseNumber.trim() || !password) {
      setError("House number and password are required");
      return;
    }
    setLoading(true);
    try {
      const familiesCol = collection(firestore, "families");
      const familyDocRef = doc(firestore, "families", houseNumber);
      const snap = await getDoc(familyDocRef);
      if (snap.exists()) {
        throw new Error("House number already exists");
      }

      const { auth: secondaryAuth, delete: deleteSecondary } = initSecondaryAuth();
      const email = `${houseNumber}@${EMAIL_DOMAIN}`;
      let userCredential;
      try {
        userCredential = await createUserWithEmailAndPassword(
          secondaryAuth,
          email,
          password
        );
      } catch (err: any) {
        throw new Error(`Failed to create auth user: ${err.message}`);
      } finally {
        await deleteSecondary();
      }
      const familyUid = userCredential.user.uid;

      const familyData = {
        houseNumber,
        createdBy: adminUser.uid,
        createdAt: serverTimestamp(),
      };
      await setDoc(familyDocRef, familyData);

      const membersColRef = collection(familyDocRef, "members");
      for (const member of members) {
        if (member.name.trim()) {
          const memberDocRef = doc(membersColRef);
          const { name, relation, email, phone, bloodGroup, education, dob } = member;
          await setDoc(memberDocRef, {
            name: name.trim(),
            relation: relation.trim(),
            email: email?.trim() || "",
            phone: phone?.trim() || "", // Save phone number
            bloodGroup: bloodGroup || "",
            education: education?.trim() || "",
            dob: dob || "",
            createdAt: serverTimestamp(),
          });
        }
      }

      const userDocRef = doc(firestore, "users", familyUid);
      await setDoc(userDocRef, {
        role: "family",
        familyId: houseNumber,
        createdAt: serverTimestamp(),
      });

      setSuccessMsg("Family created successfully");
      setHouseNumber("");
      setPassword("");
      setMembers([{ name: "", relation: "" }]);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to create family");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 border rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Create New Family</h2>
      {error && <p className="text-red-600 mb-2">{error}</p>}
      {successMsg && <p className="text-green-600 mb-2">{successMsg}</p>}
      <form onSubmit={handleSubmit}>
        <label className="block mb-1">House Number</label>
        <input
          type="text"
          value={houseNumber}
          onChange={(e) => setHouseNumber(e.target.value)}
          className="w-full mb-3 p-2 border rounded"
          required
        />
        <label className="block mb-1">Password for Family Login</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-3 p-2 border rounded"
          required
        />

        <div className="mb-4">
          <h3 className="font-medium">Family Members</h3>
          {members.map((m, idx) => (
            <div key={idx} className="border rounded p-3 mb-3">
              <div className="flex space-x-2 items-center mb-2">
                <input
                  type="text"
                  placeholder="Name"
                  value={m.name}
                  onChange={(e) => handleMemberChange(idx, "name", e.target.value)}
                  className="flex-1 p-2 border rounded"
                  required
                />
                <input
                  type="text"
                  placeholder="Relation"
                  value={m.relation}
                  onChange={(e) => handleMemberChange(idx, "relation", e.target.value)}
                  className="flex-1 p-2 border rounded"
                  required
                />
                {members.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeMemberField(idx)}
                    className="text-red-600"
                  >
                    Remove
                  </button>
                )}
              </div>
              <div className="flex flex-wrap gap-2 mb-2">
                <input
                  type="email"
                  placeholder="Email (optional)"
                  value={m.email || ""}
                  onChange={(e) => handleMemberChange(idx, "email", e.target.value)}
                  className="flex-1 p-2 border rounded"
                />
                <input
                  type="tel"
                  placeholder="Phone (optional)"
                  value={m.phone || ""}
                  onChange={(e) => handleMemberChange(idx, "phone", e.target.value)}
                  className="flex-1 p-2 border rounded"
                />
                <select
                  value={m.bloodGroup || ""}
                  onChange={(e) => handleMemberChange(idx, "bloodGroup", e.target.value)}
                  className="flex-1 p-2 border rounded"
                >
                  {BLOOD_GROUPS.map((bg) => (
                    <option value={bg} key={bg}>
                      {bg ? bg : "Select Blood Group (optional)"}
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  placeholder="Education (optional)"
                  value={m.education || ""}
                  onChange={(e) => handleMemberChange(idx, "education", e.target.value)}
                  className="flex-1 p-2 border rounded"
                />
                <input
                  type="date"
                  placeholder="DOB (optional)"
                  value={m.dob || ""}
                  onChange={(e) => handleMemberChange(idx, "dob", e.target.value)}
                  className="flex-1 p-2 border rounded"
                  max={new Date().toISOString().slice(0, 10)}
                />
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={addMemberField}
            className="mt-2 text-blue-500"
          >
            + Add Member
          </button>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-green-500 text-white rounded"
        >
          {loading ? "Creating..." : "Create Family"}
        </button>
      </form>
    </div>
  );
};

export default CreateFamily;