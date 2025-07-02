  import { useEffect, useState, type FC } from "react";
  import HeaderBar from "../../../Layout/user/HeaderBar";
  import { useUserAuth } from "../../../context/user/userAuthContext";
  import { collection, query, where, onSnapshot, type DocumentData } from "firebase/firestore";
  import { firestore } from "../../../firebase/firebaseConfig";
  import CertificateCard from "../../../../src/components/common/user/CertificateCard";

  // Example emoji icon, replace with your SVG if needed
  const CertificateIcon = () => (
    <span role="img" aria-label="certificate" className="text-xl mr-2">
      📜
    </span>
  );

   export type StatusType = "pending" | "accepted" | "rejected";


  const statusLabel: Record<StatusType, string> = {
    accepted: "Accepted",
    pending: "Pending",
    rejected: "Rejected"
  };

  interface CertificateRequest {
    id: string;
    certificateType: string;
    name: string;
    status: StatusType;
    createdAt: string | null;
    description: string;
  }

  const RequestHistory: FC = () => {
    const { familyId } = useUserAuth();
    const [certRequests, setCertRequests] = useState<CertificateRequest[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      if (!familyId) return;
      setLoading(true);
      const q = query(
        collection(firestore, "certificates"),
        where("familyId", "==", familyId)
      );
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const data: CertificateRequest[] = querySnapshot.docs.map(doc => {
          const d = doc.data() as DocumentData;
          return {
            id: doc.id,
            certificateType: d.certificateType || "Unknown",
            name: d.name || "",
            status: (d.status as StatusType) || "pending",
            createdAt: d.createdAt?.toDate?.().toLocaleDateString() || "",
            description: d.description || ""
          };
        }).sort((a, b) => {
          // Show pending > accepted > rejected, then newest first
          const order: StatusType[] = ["pending", "accepted", "rejected"];
          if (a.status !== b.status) {
            return order.indexOf(a.status) - order.indexOf(b.status);
          }
          return (b.createdAt || "").localeCompare(a.createdAt || "");
        });
      
        
        setCertRequests(data);
        setLoading(false);
      });
      return () => unsubscribe();
    }, [familyId]);

    return (
      <div className="relative min-h-dvh bg-gray-100 pb-8">
        <HeaderBar title="Request History" />
        <main className="px-4 pt-4 max-w-sm mx-auto">
          <div className="flex items-center font-semibold text-base text-gray-700 mb-8">
            <CertificateIcon />
          Request History
          </div>
          {loading && <div className="text-center text-gray-400 py-10">Loading...</div>}
          {!loading && certRequests.length === 0 && (
            <div className="text-center text-gray-400 py-10">No certificate requests found.</div>
          )}
          {certRequests.map(req => (
            <CertificateCard
              key={req.id}
              status={req.status}
              title={req.certificateType}
              desc={req.description}
              issuedOrReq={statusLabel[req.status]}
              date={req.createdAt || ""}
            />
          ))}
        </main>
      </div>
    );
  };

  export default RequestHistory;