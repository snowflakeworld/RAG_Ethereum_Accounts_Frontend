import { type FC } from "react";
import { Header, Main } from "../layout";

const RagUI: FC = () => {
  const onNewClick = () => {};

  return (
    <div className="flex flex-col h-screen">
      <Header onNewClick={onNewClick} />
      <Main />
    </div>
  );
};

export default RagUI;
