import { FC } from "react";
import Bell from "../../assets/icons/bell-svgrepo-com.svg";

export const Header: FC = () => (
  <div className="bg-primary  py-4">
         <div className=" mx-auto container px-5 flex justify-between items-center">

    <h1 className="text-white  text-xl font-bold">LOGO</h1>
    <img src={Bell} alt="Notification Bell" className="w-6 h-6 cursor-pointer" />
    </div>
  </div>
);