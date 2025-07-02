import { FC } from "react";
import { useNavigate } from "react-router-dom";

interface HeaderBarProps {
  title: string;
  onBack?: () => void;
  bgClassName?: string; // e.g. "bg-primary"
}

const BackButton: FC<{ onClick?: () => void }> = ({ onClick }) => {
  const navigate = useNavigate();
  return (
    <button
      aria-label="Go back"
      onClick={onClick ?? (() => navigate(-1))}
      className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 backdrop-blur-md text-white border border-white/30 shadow-md hover:bg-white/20 transition duration-300"
      tabIndex={0}
      type="button"
    >
      <svg width={24} height={24} fill="none" viewBox="0 0 24 24">
        <path d="M15 18l-6-6 6-6" stroke="#fff" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </button>
  );
};

export const HeaderBar: FC<HeaderBarProps> = ({ title, onBack, bgClassName = "bg-primary" }) => (
  <div className={`w-full px-4 py-4 ${bgClassName}`}>
    <div className="flex items-center justify-between relative">
      <BackButton onClick={onBack} />
      <h1 className="absolute left-1/2 transform -translate-x-1/2 text-white text-lg font-bold">
        {title}
      </h1>
      <span className="w-10 h-10" /> {/* Spacer to balance the BackButton */}
    </div>
  </div>
);

export default HeaderBar;