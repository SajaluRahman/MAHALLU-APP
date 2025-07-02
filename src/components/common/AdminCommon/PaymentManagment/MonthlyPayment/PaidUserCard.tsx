
import imageurl from "../../../../../assets/images/pexels-justin-shaifer-501272-1222271.jpg";
interface PaidUserCardProps {
  name: string;
  address: string;
  time: string;
  paymentId: string;
  imgUrl: string;
}

const PaidUserCard: React.FC<PaidUserCardProps> = ({
  name,
  address,
  time,
  paymentId,
  imgUrl,
}) => (
  <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-2 py-8 flex flex-col items-center w-[300px] border dark:border-gray-800 transition duration-300 hover:shadow-lg hover:scale-105 hover:border-emerald-500 dark:hover:border-emerald-400">
    <img
      src={ imageurl||imgUrl }
      alt={name}
      className="w-16 h-16 rounded-full object-cover mb-2 border border-gray-300"
    />
    <div className="text-base font-bold text-center text-gray-800 dark:text-gray-100">{name}</div>
    <div className="text-xs text-gray-600 dark:text-gray-400 text-center">{address}</div>
    <div className="text-xs text-gray-600 dark:text-gray-400 text-center">{time}</div>
    <div className="text-xs text-gray-600 dark:text-gray-400 text-center">{paymentId}</div>
  </div>
);

export default PaidUserCard;
