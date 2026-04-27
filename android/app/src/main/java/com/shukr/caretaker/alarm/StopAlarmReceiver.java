package com.shukr.caretaker.alarm;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;

public class StopAlarmReceiver extends BroadcastReceiver {
    @Override
    public void onReceive(Context context, Intent intent) {
        // 🔹 Stop the TTS service
        context.stopService(new Intent(context, AlarmTTSService.class));
    }
}
