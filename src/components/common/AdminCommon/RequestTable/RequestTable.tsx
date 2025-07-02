import { useEffect, useState, type FC } from "react";
import RequestTableRow from "./RequestTableRow";
import { collection, onSnapshot, QuerySnapshot, type DocumentData } from "firebase/firestore";
import { firestore } from "../../../../firebase/firebaseConfig";

type RequestData = {
  id: string;
  certificateType: string;
  name: string;
  status: "pending" | "accepted" | "rejected";
  createdAt: string | null;
  description: string | null;
};

const RequestTable: FC = () => {
  const [requestData, setRequestData] = useState<RequestData[]>([]);
  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(firestore, "certificates"),
      (querySnapshot: QuerySnapshot<DocumentData>) => {
        const data: RequestData[] = querySnapshot.docs.map((doc) => {
          const rawData = doc.data();
          return {
            id: doc.id,
            certificateType: rawData.certificateType || "Unknown",
            name: rawData.name || "Unknown",
            description: rawData.description || "",
            status: rawData.status || "pending",
            createdAt: rawData.createdAt?.toDate?.().toISOString() || null,
          };
        });

        // Custom sort: Pending first, then by most recent
        const sorted = data.sort((a, b) => {
          if (a.status !== b.status) {
            if (a.status === "pending") return -1;
            if (b.status === "pending") return 1;
            if (a.status === "accepted") return -1;
            if (b.status === "accepted") return 1;
          }
          const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
          const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
          return dateB - dateA;
        });

        setRequestData(sorted);
      },
      (error) => {
        console.error("Real-time listener error:", error);
      }
    );

    return () => unsubscribe();
  }, []);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-0 overflow-x-auto transition-colors duration-300">
      <table className="min-w-full text-center">
        <thead>
          <tr className="bg-gray-50 dark:bg-gray-700 transition-colors duration-300">
            <th className="py-2 px-4 font-medium text-gray-700 dark:text-gray-200 text-left">
              Request Type
            </th>
            <th className="py-2 px-4 font-medium text-gray-700 dark:text-gray-200">
              User
            </th>
            <th className="py-2 px-4 font-medium text-gray-700 dark:text-gray-200">
              Status
            </th>
            <th className="py-2 px-4 font-medium text-gray-700 dark:text-gray-200">
              Date
            </th>
            <th className="py-2 px-4 font-medium text-gray-700 dark:text-gray-200">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {requestData.map((req) => (
            <RequestTableRow key={req.id} {...req} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RequestTable;