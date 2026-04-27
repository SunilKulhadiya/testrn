import 'react-native-get-random-values';
import React, { useEffect } from "react";
import { Provider, useSelector} from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
// import notifee, {
//   AndroidImportance,
// } from '@notifee/react-native';
import { Platform, NativeModules } from 'react-native';


import { store, persistor } from "./src/redux/store";

import { ThemeProvider } from "./src/theme/ThemeProvider";
import "./src/i18n/i18n";
import RootNavigator from "./src/navigation/RootNavigator"
import { navigationRef } from './src/navigation/navigationRef';

// Notification service
import {
  requestNotificationPermission,
  requestExactAlarmPermission,
  configureNotifications,
  createReminderChannel,
  rescheduleReminders
} from "./src/notifications/notificationService1";


  const { SettingsModule } = NativeModules;
  const { AlarmModule } = NativeModules;

export default function App({ screen, title }) {

  useEffect(() => {
    if (screen === 'AlarmDetail') {
      navigationRef.current?.reset({
        index: 1,
        routes: [
          { name: 'Home' },
          { name: 'AlarmDetail', params: { title } },
        ],
      });
    }
  }, [screen, title]);

  useEffect(() => {
    (async () => {
      //await requestNotificationPermission();
      const granted = await requestNotificationPermission();
      await requestExactAlarmPermission();

      if (Platform.OS === 'android' && Platform.Version >= 31) {
        try {
          const allowed = await SettingsModule.canScheduleExactAlarms();
          if (!allowed) {
            SettingsModule.openExactAlarmSettings();
          }
        } catch (e) {
          console.log("Exact alarm check failed:", e);
        }
      }

      // Request permission first
      await configureNotifications();

      // Then create channel once
      await createReminderChannel();

      // Finally reschedule reminders
      await rescheduleReminders();

      // Step 4: 🔹 Test alarm only
      if (granted) {
        // const triggerTime = Date.now() + 30000; // 30 seconds later
        // AlarmModule.scheduleAlarm(1, triggerTime, "Oisi Reminder");

      }

    })();
  }, []);


  return ( 
    <Provider store={store}> 
      <PersistGate
          loading={null}
          persistor={persistor}> 
          <ThemeProvider>
            <RootNavigator />
          </ThemeProvider>  
      </PersistGate>
    </Provider>
  );
}
