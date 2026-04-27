import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

// Screens
import RegisterScreen from "../screens/auth/RegisterScreen";
import UpdateMPINScreen from "../screens/auth/UpdateMPINScreen";
import HomeScreen from "../screens/home/HomeScreen";
import MedicineScreen from "../screens/medicine/MedicineScreen";
import ReminderScreen from "../screens/reminder/ReminderScreen";
import AddReminderScreen from "../screens/reminder/AddReminderScreen";
//import ReportsScreen from "./src/screens/ReportsScreen";
import ProfileScreen from "../screens/profile/ProfileScreen";
import MoreScreen from "../screens/more/MoreScreen";
import ScanObjectScreen from "../screens/geminiAI/ScanObjectScreen";
//import GeminiAIResponseScreen from "../screens/geminiAI/GeminiAIResponseScreen";
import GeminiAIResponseScreen from "../screens/geminiAI/GeminiAIResponseScreen";
import AlarmDetailActivity from "../screens/reminder/AlarmDetailActivity";

const Stack = createStackNavigator();

export default function RootStack({ route }) {

  const rootScreen = route?.params?.RootScreen;

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>

      {rootScreen === 0 && (
        <Stack.Screen
          name="Home"
          component={HomeScreen}
        />
      )}

      {rootScreen === 1 && (
        <Stack.Screen
          name="Medications"
          component={MedicineScreen}
        />
      )}

      {rootScreen === 2 && (
        <Stack.Screen
          name="Reminders"
          component={ReminderScreen}
        />
      )}

      {rootScreen === 3 && (
        <Stack.Screen
          name="More"
          component={MoreScreen}
        />
      )}

      {/* <Stack.Screen name="Reports" component={ReportsScreen} /> */}
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
      <Stack.Screen name="UpdateMPINScreen" component={UpdateMPINScreen} />
      <Stack.Screen name="AddReminderScreen" component={AddReminderScreen} />
      <Stack.Screen name="ScanObjectScreen" component={ScanObjectScreen} />
      <Stack.Screen name="GeminiAIResponseScreen" component={GeminiAIResponseScreen} />
      <Stack.Screen name="AlarmDetail" component={AlarmDetailActivity} />

    </Stack.Navigator>
  );
}