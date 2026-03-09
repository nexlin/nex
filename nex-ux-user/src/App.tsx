import React from "react";
import NexApp from "./NexApp";
import { configStore, adminStore } from "store/NexConfigStore";

function App() {
  return <NexApp configStore={configStore} adminStore={adminStore} />;
}

export default App;
