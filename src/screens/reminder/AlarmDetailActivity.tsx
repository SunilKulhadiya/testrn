import React, { useEffect } from 'react';
import { View, Text, NativeModules } from 'react-native';

const { AlarmModule } = NativeModules;

const AlarmDetailActivity = ({ route, navigation }) => {
  const { title, medicineName, dosage, time } = route.params || {};

  useEffect(() => {
    // Stop the alarm service when this screen opens
    AlarmModule.stopAlarmService?.();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 20 }}>Reminder: {title}</Text>
      <Text>Medicine: {medicineName}</Text>
      <Text>Dosage: {dosage}</Text>
      <Text>Time: {time}</Text>
    </View>
  );
};

export default AlarmDetailActivity;
