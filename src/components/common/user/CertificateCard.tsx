import type { FC } from "react";

export type StatusType = "pending" | "accepted" | "rejected";

const statusStyles: Record<StatusType, string> = {
  accepted: "bg-green-50 text-green-700",
  pending: "bg-yellow-50 text-yellow-800",
  rejected: "bg-red-50 text-red-700",
};

function truncateText(text: string, maxLength: number): string {
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
}

const CertificateCard: FC<{
  status: StatusType;
  title: string;
  desc: string;
  issuedOrReq: string;
  date: string;
  onClick?: () => void;
}> = ({ status, title, desc, issuedOrReq, date, onClick }) => (
  <div
    onClick={onClick}
    className="cursor-pointer border-l-6 border-primary bg-white rounded-xl shadow-md px-4 py-6 mb-4 transition hover:bg-gray-50"
    tabIndex={0}
    role={onClick ? "button" : undefined}
    aria-pressed={false}
  >
    <div className="pl-3">
      <div className="flex items-center justify-between">
        <div className="font-semibold text-gray-800">{title}</div>
        <span className={`px-3 py-0.5 rounded-full text-xs font-semibold ml-2 ${statusStyles[status]}`}>
          {issuedOrReq}
        </span>
      </div>
      <div className="text-sm text-gray-500">
        {truncateText(desc, 80)}
      </div>
      <div className="text-xs text-gray-400 mt-1">
        {status === "accepted" ? "Issued" : "Requested"}: {date}
      </div>
    </div>
  </div>
);

export default CertificateCard;