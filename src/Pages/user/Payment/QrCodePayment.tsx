import { FC } from "react";

// You can substitute this with your actual QR SVG path or data URI
import QrImage from "../../../assets/icons/QR_Code_Example.svg";
import HeaderBar from "../../../Layout/user/HeaderBar";



const AmountCard: FC = () => (
  <div className="w-full rounded-xl shadow-md bg-gradient-to-br from-[#0f766e] to-[#059669] px-6  py-12 mb-7 flex flex-col items-center text-white">
        <div className="text-base mb-1 opacity-90">Amount Due</div>
        <div className="text-3xl font-bold mb-1">₹200</div>
        <div className="text-sm font-semibold opacity-90">Due: June 15, 2025</div>
      </div>
);

const QrCodePayment: FC = () => (
  <div className="relative min-h-dvh bg-gray-100 pb-20">
    {/* Header */}
    <HeaderBar title="Qr Code Payment" />

    <main className="px-4 pt-6 max-w-sm mx-auto flex flex-col items-center">
      <AmountCard />

      <div className="bg-white rounded-xl shadow flex flex-col items-center p-4 my-12 mb-6 border">
        <img
          src={QrImage}
          alt="QR Code"
          className="w-64  h-64 object-contain"
        />
      </div>
      <div className="text-center text-teal-700 text-sm font-medium">Scan with any UPI app</div>
    </main>
  </div>
);

export default QrCodePayment;