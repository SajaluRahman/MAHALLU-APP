import { type FC } from "react";

interface ServiceCardProps {
  icon: string;
  labelLines: [string, string];
  onClick?: () => void;
}

export const ServiceCard: FC<ServiceCardProps> = ({ icon, labelLines,onClick }) => (
  <div onClick={onClick} className="bg-gray-50 rounded-2xl p-6 flex flex-col items-center text-center shadow-lg">
    <div className="rounded-lg mb-3">
      <img src={icon} alt={labelLines.join(" ")} className="w-12 h-12" />
    </div>
    {labelLines.map((label, i) => (
      <span key={i} className="text-gray-800 font-medium text-sm">
        {label}
      </span>
    ))}
  </div>
);