import { StatusBar } from "expo-status-bar";
import Dashboard from "./src/screens/Dashboard";
import { NativeBaseProvider } from "native-base";
import { StyleSheet, Text, View } from "react-native";

export default function App() {
  return (
    <NativeBaseProvider>
      <View style={styles.container}>
        <StatusBar style="auto" />
        <Dashboard />
      </View>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
