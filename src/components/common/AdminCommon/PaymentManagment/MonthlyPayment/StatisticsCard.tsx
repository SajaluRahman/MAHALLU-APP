

const StatisticsCard: React.FC = () => (
  <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6 mt-10 max-w-xl mx-auto border dark:border-gray-800 transition duration-300 hover:shadow-lg hover:border-emerald-500 dark:hover:border-emerald-400">
    <div className="font-semibold text-xl mb-4 text-gray-800 dark:text-gray-100">
      STATISTICS CARD
    </div>
    <div className="flex items-center gap-8">
      <div className="flex flex-col gap-4 text-base">
        <div className="flex items-center text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition duration-300 cursor-pointer">
          <span className="w-4 h-4 rounded-full bg-blue-400 block mr-3"></span>
          Payable
        </div>
        <div className="flex items-center text-gray-700 dark:text-gray-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition duration-300 cursor-pointer">
          <span className="w-4 h-4 rounded-full bg-pink-400 block mr-3"></span>
          Not Payable
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center">
        <svg
          width="140"
          height="140"
          viewBox="0 0 36 36"
          className="transition-transform duration-300 hover:scale-105"
        >
          <circle
            cx="18"
            cy="18"
            r="16"
            fill="none"
            stroke="#60a5fa"
            strokeWidth="4"
            strokeDasharray="60,40"
            strokeDashoffset="0"
          />
          <circle
            cx="18"
            cy="18"
            r="16"
            fill="none"
            stroke="#f472b6"
            strokeWidth="4"
            strokeDasharray="40,60"
            strokeDashoffset="-60"
          />
          <text
            x="18"
            y="22"
            textAnchor="middle"
            fontSize="10px"
            fill="#1e293b"
            fontWeight="bold"
          >
            60%
          </text>
        </svg>
      </div>
    </div>
  </div>
);

export default StatisticsCard;
