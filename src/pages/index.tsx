import { type FC } from "react";
import { Header, Main } from "../layout";

const RagUI: FC = () => {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <Main />
    </div>
  );
};

export default RagUI;
