import { FC } from "react";
import { useNavigate } from "react-router-dom";
import QrSvg from "../../../assets/icons/QR_Code_Example.svg";
import RazorpaySvg from "../../../assets/icons/razorpay-icon.svg";
import  AppNavbar from "../../../Layout/user/AppNavbar";

import HeaderBar from "../../../Layout/user/HeaderBar";

// You can replace with a dedicated BackButton component if you have one


const PaymentOption: FC<{
  onClick?: () => void;
  icon: string;
  title: string;
  subtitle: string;
}> = ({ icon, title, subtitle, onClick }) => (
  <div onClick={onClick} className="flex items-center gap-3 bg-white rounded-xl shadow px-4 py-6 mb-4">
    <img src={icon} alt={title} className="w-14 h-14" />
    <div>
      <div className="font-semibold text-teal-700">{title}</div>
      <div className="text-xs text-gray-500">{subtitle}</div>
    </div>
  </div>
);

export const MonthlyPayment: FC = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-dvh bg-gray-100 pb-20">
      {/* Custom header for this screen */}
      <HeaderBar title="Monthly Payment" bgClassName="bg-primary" />

      {/* Main content */}

      <main className="px-4 pt-6 max-w-sm mx-auto">
        <div className="rounded-xl shadow-md bg-gradient-to-br from-[#0f766e] to-[#059669] px-6  py-12 mb-7 flex flex-col items-center text-white">
          <div className="text-base mb-1 opacity-90">Amount Due</div>
          <div className="text-3xl font-bold mb-1">₹200</div>
          <div className="text-sm font-semibold opacity-90">Due: June 15, 2025</div>
        </div>

        <PaymentOption
          onClick={() => navigate("/qr-code-payment")}
          icon={QrSvg}
          title="QR Code"
          subtitle="Scan & Pay instantly"
        />
        <PaymentOption
          onClick={() => navigate("/upi-payment")}

          icon={RazorpaySvg}
          title="Razorpay"
          subtitle="UPI, Cards, Net Banking"
        />
        {/* 
        <div className=" mx-auto border-2 border-black h-64 w-64 my-10">
            <img src={QrSvg} alt="" />
           
        </div> */}


      </main>

      <AppNavbar />
    </div>
  )
};

export default MonthlyPayment;