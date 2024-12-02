import { Routes } from "./src/routes/routes";
import { NativeBaseProvider } from "native-base";
import { GoalProvider } from "./src/contexts/GoalContext";

export default function App() {
  return (
    <GoalProvider>
      <NativeBaseProvider>
        <Routes />
      </NativeBaseProvider>
    </GoalProvider>
  );
}
