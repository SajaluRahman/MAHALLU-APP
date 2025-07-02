// import  LargeScreenUi  from "../../components/common/LargeScreenUi";
// import  useIsSmallScreen  from "../../hooks/useIsSmallScreen";
import CardSvg from "../../assets/icons/card-svgrepo-com.svg";
import MessSvg from "../../assets/icons/kitchen-cooker-utensils-svgrepo-com.svg";
import NOCSvg from "../../assets/icons/memo-svgrepo-com.svg";
import ComplaintsSvg from "../../assets/icons/comment-2-svgrepo-com.svg";
import { ServiceCard } from "../../components/common/ServiceCard";
import { useNavigate } from "react-router-dom";
import type { FC } from "react";
export const UserHome: FC = () => {
  // const isSmallScreen = useIsSmallScreen();
  const navigate = useNavigate();
  // if (isSmallScreen) {
  //   return <LargeScreenUi />;
  // }

  return (
    <div className="bg-white min-h-dvh mx-auto container max-w-2xl">
      
      <div className="p-4">
        <div className="bg-black rounded-2xl overflow-hidden h-48">
          <img
            src="https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=400&h=300&fit=crop"
            alt="Mosque at night"
            className="w-full h-full object-cover animate-pulse
            transition duration-500 ease-in-out transform hover:scale-105"
          />
        </div>
      </div>
      <div className="px-5 pt-4 ">
        <div className="grid grid-cols-2 gap-6">
          <ServiceCard
          onClick={() => navigate("/payment")}
            icon={CardSvg}
            labelLines={["Monthly", "Payment"]}
          />
          <ServiceCard
            icon={MessSvg}
            labelLines={["MESS", "Payment"]}
          />
          <ServiceCard
          onClick={() => navigate("/my-certificates")}
            icon={NOCSvg}
            labelLines={["NOC", "Request"]}
          />
          <ServiceCard
            icon={ComplaintsSvg}
               onClick={() => navigate("/complaints-box")}
            labelLines={["Complaints /", "Suggestions"]}
          />
        </div>
      </div>
     
    </div>
  );
};

export default UserHome;