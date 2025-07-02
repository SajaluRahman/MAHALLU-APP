import { FC } from "react";
import HeaderBar from "../../../Layout/user/HeaderBar";


const AmountSummary: FC = () => (
  <div className="bg-white rounded-xl shadow-lg px-6 py-8 mt-6 mb-12 w-full mx-auto">
    <div className="flex justify-between items-center py-3 border-b">
      <span className="text-gray-600">Monthly Payment</span>
      <span className="font-medium text-gray-800">₹200</span>
    </div>
    <div className="flex justify-between items-center py-3 border-b">
      <span className="text-gray-600">Convenience Fee</span>
      <span className="font-medium text-gray-800">₹0</span>
    </div>
    <div className="flex justify-between items-center pt-3">
      <span className="font-semibold text-gray-700">Total Amount</span>
      <span className="font-bold text-gray-900">₹200</span>
    </div>
  </div>
);

const UpiPayment: FC = () => (
  <div className="relative min-h-dvh bg-gray-100 pb-8">
    {/* Header */}
   <HeaderBar title="UPI Payment" />

    <main className="px-4 max-w-sm mx-auto flex flex-col items-center min-h-[85dvh] ">
      <AmountSummary />
      <button
        className="w-full mt-auto bg-gradient-to-br from-primary to-secondary hover:from-teal-800 hover:to-teal-600 text-white font-bold py-3 rounded-lg shadow-md transition-colors duration-150"
        type="button"
      >
        Pay Amount
      </button>
    </main>
  </div>
);

export default UpiPayment;