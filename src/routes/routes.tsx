import Food from "../screens/Food";
import Step from "../screens/Step";
import Vita from "../screens/Vita";
import Water from "../screens/Water";
import Awards from "../screens/Awards";
import { Feather, FontAwesome } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

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
            tabBarLabel: () => null,
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
            tabBarLabel: () => null,
          }}
        />
        <Tab.Screen
          name="Registro de Alimentação"
          component={Food}
          options={{
            tabBarIcon: ({ color }) => (
              <FontAwesome name="lemon-o" size={24} color={color} />
            ),
            tabBarLabel: () => null,
          }}
        />
        <Tab.Screen
          name="Contador de Passos"
          component={Step}
          options={{
            tabBarIcon: ({ color }) => (
              <Feather name="activity" size={24} color={color} />
            ),
            tabBarLabel: () => null,
          }}
        />
        <Tab.Screen
          name="Conquistas"
          component={Awards}
          options={{
            tabBarIcon: ({ color }) => (
              <Feather name="award" size={24} color={color} />
            ),
            tabBarLabel: () => null,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
