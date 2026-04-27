import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

// Screens
import RegisterScreen from "./src/screens/auth/RegisterScreen";
import UpdateMPINScreen from "./src/screens/auth/UpdateMPINScreen";
import HomeScreen from "./src/screens/home/HomeScreen";
import MedicineScreen from "./src/screens/medicine/MedicineScreen";
import ReminderScreen from "./src/screens/reminder/ReminderScreen";
import AddReminderScreen from "./src/screens/reminder/AddReminderScreen";
//import ReportsScreen from "./src/screens/ReportsScreen";
import ProfileScreen from "./src/screens/profile/ProfileScreen";
import MoreScreen from "./src/screens/more/MoreScreen"


const Stack = createStackNavigator();

export default function AuthStack() {

  return (

    <Stack.Navigator
      screenOptions={{ headerShown: false }}
    >

          <Stack.Screen
            name="Home"
            component={HomeScreen}
          />

          <Stack.Screen
            name="Medications"
            component={MedicineScreen}
          />

          <Stack.Screen
            name="Reminders"
            component={ReminderScreen}
          />

          <Stack.Screen
            name="Reports"
            component={ReportsScreen}
          />

          <Stack.Screen
            name="Profile"
            component={ProfileScreen}
          />

          <Stack.Screen
            name="More"
            component={MoreScreen}
          />

          <Stack.Screen
            name="RegisterScreen"
            component={RegisterScreen}
          />

          <Stack.Screen
            name="UpdateMPINScreen"
            component={UpdateMPINScreen}
          />

          <Stack.Screen
            name="AddReminderScreen"
            component={AddReminderScreen}
          />

    </Stack.Navigator>
  );
}