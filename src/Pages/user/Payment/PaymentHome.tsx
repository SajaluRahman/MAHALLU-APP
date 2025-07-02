import { FC } from "react";
import CardSvg from "../../../assets/icons/card-svgrepo-com.svg";
import { useNavigate } from "react-router-dom";
import MessSvg from "../../../assets/icons/plate-knife-fork-icon.svg";

interface PaymentCardProps {
  icon: string;
  title: string;
  description: string;
  alt: string;
  onClick?: () => void;
}

const PaymentCard: FC<PaymentCardProps> = ({ icon, title, description, alt, onClick }) => (
  <div
    className="bg-white rounded-xl shadow-md flex items-center gap-4 px-5 py-8 mb-6 cursor-pointer"
    onClick={onClick}
    role={onClick ? "button" : undefined}
    tabIndex={onClick ? 0 : undefined}
    style={onClick ? { userSelect: "none" } : undefined}
  >
    <div className="flex-shrink-0 w-20 h-20 rounded-full bg-teal-600 flex items-center justify-center">
      <img src={icon} alt={alt} className="w-14 h-14" />
    </div>
    <div>
      <div className="text-teal-700 font-semibold text-lg leading-tight">{title}</div>
      <div className="text-gray-500 text-sm">{description}</div>
    </div>
  </div>
);

export const PaymentHome: FC = () => {
  const navigate = useNavigate();

  return (
    <div className="relativebg-gray-100 pb-20">

      <main className="px-4 pt-8 pb-2 max-w-sm mx-auto">
        <PaymentCard
          onClick={() => navigate("/monthly-payment")}
          icon={CardSvg}
          alt="Monthly Payment"
          title="Monthly Payment"
          description="Regular monthly dues"
        />
        <PaymentCard
          icon={MessSvg}
          alt="Mess Payment"
          title="Mess Payment"
          description="Meal Plan Payment"
        />
      </main>

    </div>
  );
};

export default PaymentHome;