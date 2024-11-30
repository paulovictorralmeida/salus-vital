import Food from "../screens/Food";
import Step from "../screens/Step";
import Vita from "../screens/Vita";
import Water from "../screens/Water";
import Awards from "../screens/Awards";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, Text } from "native-base";
import { NavigationContainer } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

export function Routes() {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{ tabBarActiveTintColor: "#4682B4" }}>
        <Tab.Screen
          name="Vita"
          component={Vita}
          options={{
            tabBarIcon: ({ color }) => (
              <Feather name="home" size={24} color={color} />
            ),
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="Registro de água"
          component={Water}
          options={{
            tabBarIcon: ({ color }) => (
              <Feather name="droplet" size={24} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Registro de Alimentação"
          component={Food}
          options={{
            tabBarIcon: ({ color }) => (
              <Feather name="menu" size={24} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Contador de Passos"
          component={Step}
          options={{
            tabBarIcon: ({ color }) => (
              <Feather name="activity" size={24} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Conquistas"
          component={Awards}
          options={{
            tabBarIcon: ({ color }) => (
              <Feather name="star" size={24} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
