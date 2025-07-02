

const QuickStats: React.FC = () => (
  <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md transition-colors duration-300">
    <div className="text-base font-semibold mb-4 text-gray-800 dark:text-white">Quick Stats</div>
    <div className="space-y-2">
      <div className="flex justify-between text-gray-700 dark:text-gray-300">
        <span>Marriage Certificates</span>
        <span className="text-green-500 font-medium">45</span>
      </div>
      <div className="flex justify-between text-gray-700 dark:text-gray-300">
        <span>Mahallu Certificates</span>
        <span className="text-green-500 font-medium">32</span>
      </div>
      <div className="flex justify-between text-gray-700 dark:text-gray-300">
        <span>Pending Payments</span>
        <span className="text-red-500 font-semibold">₹45,000</span>
      </div>
    </div>
  </div>
);

export default QuickStats;
