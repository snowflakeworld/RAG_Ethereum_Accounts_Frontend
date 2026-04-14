import React, { useState } from "react";
import RagUI from "./pages";

export default function App(): React.ReactElement {
  return (
    <div className="h-screen bg-gray-50 overflow-hidden">
      <RagUI />
    </div>
  );
}
