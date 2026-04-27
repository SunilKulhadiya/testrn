import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

// Screens
import OnboardingScreen from "../screens/onboarding/OnboardingScreen";
import LoginScreen from "../screens/auth/LoginScreen";

const Stack = createStackNavigator();

export default function OnboardingStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="Onboarding"
        component={OnboardingScreen}
      />

      <Stack.Screen
        name="Login"
        component={LoginScreen}
      />

    </Stack.Navigator>
  );
}