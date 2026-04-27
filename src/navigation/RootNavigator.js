import React from "react";
import { useSelector } from "react-redux";

import { NavigationContainer } from "@react-navigation/native";

import OnboardingStack from "./OnboardingStack"
import MainTabNavigator from "./MainTabNavigator"
import AuthStack from "./AuthStack"
import { navigationRef } from "./navigationRef";

export default function RootNavigator() {

  const hasSeenOnboarding = useSelector(
    state => state.app.hasSeenOnboarding
  );

  const isLoggedIn = useSelector(
    state => state.auth.isLoggedIn
  );

  return (
    <NavigationContainer ref={navigationRef}>

      {!hasSeenOnboarding && <OnboardingStack />}

      {hasSeenOnboarding && !isLoggedIn && <AuthStack />}

      {hasSeenOnboarding && isLoggedIn && <MainTabNavigator />}

    </NavigationContainer>
  );
}