package com.shukr.caretaker.alarm;

import com.shukr.caretaker.R;
import android.app.AlarmManager;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.os.Build;
import android.speech.tts.TextToSpeech;
import android.util.Log;
import android.app.Notification; // add this import
import androidx.core.app.NotificationCompat;

import java.util.Locale;

public class AlarmReceiver extends BroadcastReceiver {
    private TextToSpeech tts;

    @Override
    public void onReceive(Context context, Intent intent) {
        int id = intent.getIntExtra("id", 0);
        String title = intent.getStringExtra("title");
        String repeat = intent.getStringExtra("repeat");

        // Ensure channel exists
        String channelId = "medicine-reminder-channel-v7";
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            NotificationChannel channel = new NotificationChannel(
                channelId,
                "Medicine Reminders",
                NotificationManager.IMPORTANCE_HIGH
            );
            NotificationManager manager = context.getSystemService(NotificationManager.class);
            manager.createNotificationChannel(channel);
        }

        // Show notification
        Notification notification = new NotificationCompat.Builder(context, channelId)
            .setContentTitle(title != null ? title : "Reminder")
            .setContentText("Time to take your medicine")
            .setSmallIcon(R.mipmap.ic_launcher)
            .setAutoCancel(true)
            .build();

        NotificationManager manager = (NotificationManager) context.getSystemService(Context.NOTIFICATION_SERVICE);
        manager.notify(id, notification);

        // 🔹 Start TTS service (handles voice)
        Intent serviceIntent = new Intent(context, AlarmTTSService.class);
        serviceIntent.putExtra("title", title);
        serviceIntent.putExtra("repeat", repeat);
        context.startForegroundService(serviceIntent);

        // 🔹 Reschedule next occurrence
        AlarmManager alarmManager = (AlarmManager) context.getSystemService(Context.ALARM_SERVICE);
        long nextTrigger;

        if ("DAILY".equals(repeat)) {
            nextTrigger = System.currentTimeMillis() + AlarmManager.INTERVAL_DAY;
        } else if ("WEEKLY".equals(repeat)) {
            nextTrigger = System.currentTimeMillis() + AlarmManager.INTERVAL_DAY * 7;
        } else {
            return; // one-time reminder, no reschedule
        }

        Intent nextIntent = new Intent(context, AlarmReceiver.class);
        nextIntent.putExtra("id", id);
        nextIntent.putExtra("title", title);
        nextIntent.putExtra("repeat", repeat);

        PendingIntent nextPending = PendingIntent.getBroadcast(
            context,
            id,
            nextIntent,
            PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE
        );

        alarmManager.setExactAndAllowWhileIdle(
            AlarmManager.RTC_WAKEUP,
            nextTrigger,
            nextPending
        );
    }

}
