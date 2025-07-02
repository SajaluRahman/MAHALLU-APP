import type { FC } from "react";
import {ScaleLoader} from "react-spinners"


const Loading: FC = () => {
  return <div className="flex min-h-dvh items-center justify-center"> <ScaleLoader color="#0F766E" height={65} width={5} /></div> ;
};

export default Loading;
