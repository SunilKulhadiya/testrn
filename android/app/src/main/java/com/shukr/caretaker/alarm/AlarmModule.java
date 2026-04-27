package com.shukr.caretaker.alarm;

import android.app.AlarmManager;
import android.app.PendingIntent;
import android.content.Intent;
import android.content.Context;
import android.os.SystemClock;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class AlarmModule extends ReactContextBaseJavaModule {
    private final ReactApplicationContext reactContext;

    public AlarmModule(ReactApplicationContext context) {
        super(context);
        this.reactContext = context;
    }

    @NonNull
    @Override
    public String getName() {
        return "AlarmModule";
    }

    @ReactMethod
    public void scheduleAlarm(int id, double timestamp, String title) {
        Context context = getReactApplicationContext();
        AlarmManager alarmManager = (AlarmManager) context.getSystemService(Context.ALARM_SERVICE);

        Intent intent = new Intent(context, AlarmReceiver.class);
        intent.putExtra("id", id);
        intent.putExtra("title", title);
        intent.putExtra("repeat", "ONCE");

        PendingIntent pendingIntent = PendingIntent.getBroadcast(
                context,
                id,
                intent,
                PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE
        );

        alarmManager.setExactAndAllowWhileIdle(
                AlarmManager.RTC_WAKEUP,
                (long) timestamp,
                pendingIntent
        );
    }

    // @ReactMethod
    // public void scheduleAlarm(int id, double timestamp, String title, String medicineName, String dosage, String time) {
    //     Context context = getReactApplicationContext();
    //     AlarmManager alarmManager = (AlarmManager) context.getSystemService(Context.ALARM_SERVICE);

    //     Intent intent = new Intent(context, AlarmReceiver.class);
    //     intent.putExtra("id", id);
    //     intent.putExtra("title", title);
    //     intent.putExtra("medicineName", medicineName);
    //     intent.putExtra("dosage", dosage);
    //     intent.putExtra("time", time);

    //     PendingIntent pendingIntent = PendingIntent.getBroadcast(
    //             context,
    //             id,
    //             intent,
    //             PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE
    //     );

    //     alarmManager.setExactAndAllowWhileIdle(
    //             AlarmManager.RTC_WAKEUP,
    //             (long) timestamp,
    //             pendingIntent
    //     );
    // }


    @ReactMethod
    public void cancelAlarm(int id) {
        Context context = getReactApplicationContext();
        Intent intent = new Intent(context, AlarmReceiver.class);
        PendingIntent pendingIntent = PendingIntent.getBroadcast(
                context,
                id,
                intent,
                PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE
        );

        AlarmManager alarmManager = (AlarmManager) context.getSystemService(Context.ALARM_SERVICE);
        alarmManager.cancel(pendingIntent);
    }

    @ReactMethod
    public void stopAlarmService() {
        Context context = getReactApplicationContext();
        Intent intent = new Intent(context, AlarmTTSService.class);
        context.stopService(intent);
    }


}
