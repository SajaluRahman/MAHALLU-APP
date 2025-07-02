
interface StatCardProps {
  label: string;
  value: string | number | React.ReactNode;
  icon: React.ReactNode;
  iconColor?: string;
}

const StatCard: React.FC<StatCardProps> = ({ label, value, icon, iconColor }) => (
  <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6 gap-5 flex flex-col items-center min-w-[420px] border dark:border-gray-800 transition duration-300 hover:scale-105 hover:shadow-lg hover:border-emerald-500">
    <span className="text-gray-700 dark:text-gray-300 text-base mb-1">{label}</span>
    <span className="text-2xl font-semibold mb-3 text-gray-800 dark:text-gray-100">{value}</span>
    <span className={iconColor}>{icon}</span>
  </div>
);

export default StatCard;
