import {FC} from 'react';

interface NavIconProps {
  icon: string;
  alt: string;
  size: string;
}
export const NavIcon: FC<NavIconProps> = ({ icon, alt, size }) => (
  <div className="flex flex-col items-center">
    <div className="rounded-full p-2">
      <img src={icon} alt={alt} className={size} />
    </div>
  </div>
);