import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useTranslation } from "react-i18next";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";

import RootStack from "../navigation/RootStack";
// import MedicineScreen from "../screens/medicine/MedicineScreen";
// import ReminderScreen from "../screens/reminder/ReminderScreen";
// import MoreScreen from "../screens/more/MoreScreen";


const Tab = createBottomTabNavigator();

export default function MainTabNavigator({ navigation }) {

  const { t, i18n } = useTranslation();

  const isRTL = i18n.language === "ar";

  const tabs = [
    {
      name: "HomeTab",
      component: RootStack,
      params: { RootScreen: 0 },
      icon: "home",
      label: t("home.home")
    },
    {
      name: "MedicinesTab",
      component: RootStack,
      params: { RootScreen: 1 },
      icon: "pill",
      label: t("home.view")
    },
    {
      name: "RemindersTab",
      component: RootStack,
      params: { RootScreen: 2 },
      icon: "reminder",
      label: t("home.reminders")
    },
    {
      name: "MoreTab",
      component: RootStack,
      params: { RootScreen: 3 },
      icon: "dots-horizontal-circle-outline",
      label: t("more.title")
    }
  ];

  const orderedTabs = isRTL ? [...tabs].reverse() : tabs;

  return (

<Tab.Navigator
screenOptions={({ route }) => {

    const routeName = getFocusedRouteNameFromRoute(route) ?? "";

  const hiddenScreens = [
    "ScanObjectScreen",
    "GeminiAIResponseScreen",
    "AlarmDetail",
    "AddReminderScreen"
  ];

  const hideTabBar = hiddenScreens.includes(routeName);

  return {
    headerShown: false,

    tabBarActiveTintColor: "#34c9fb",
    tabBarInactiveTintColor: "#9E9E9E",

    tabBarStyle: {
      height: 65,
      paddingBottom: 6,
      display: hideTabBar ? "none" : "flex"
    },

    tabBarLabelPosition: "below-icon",

    tabBarItemStyle: {
      justifyContent: "center",
      alignItems: "center",
    },

    tabBarIconStyle: {
      marginBottom: 2,
    },

    tabBarLabelStyle: {
      fontSize: 12,
      textAlign: "center",
    },
  };
}}>
      {orderedTabs.map((tab) => (
        <Tab.Screen
          key={tab.name}
          name={tab.name}
          component={tab.component}
          initialParams={tab.params}
          options={{
            tabBarLabel: tab.label,
            tabBarIcon: ({ color }) => (
              <Icon name={tab.icon} size={24} color={color} />
            )
          }}
        />
      ))}

    </Tab.Navigator>

  );

}