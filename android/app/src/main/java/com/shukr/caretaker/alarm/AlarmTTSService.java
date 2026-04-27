package com.shukr.caretaker.alarm;

import com.shukr.caretaker.MainActivity;
import com.shukr.caretaker.R;
import android.app.Service;
import android.content.Intent;
import android.os.IBinder;
import android.speech.tts.TextToSpeech;
import android.util.Log;
import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.os.Build;
import android.os.Bundle;

import androidx.core.app.NotificationCompat;
import android.speech.tts.UtteranceProgressListener;

import java.util.Locale;

public class AlarmTTSService extends Service {
    private TextToSpeech tts;
    private int repeatCount = 0, currentPartIndex = 0;
    private String[] speechParts;
    private static final int MAX_REPEAT = 5; // 🔹 change this to control repeats

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        final String spokenText = intent.getStringExtra("title") != null
                ? intent.getStringExtra("title")
                : "Shukr Reminder this time to take care";

        // 🔥 Split long text safely (max ~3500 chars per chunk)
        speechParts = splitText(spokenText, 3500);
        currentPartIndex = 0;
        repeatCount = 0;

        // Foreground notification setup
        String channelId = "tts-service-channel";
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {

            NotificationChannel channel = new NotificationChannel(
                channelId,
                "TTS Service",
                NotificationManager.IMPORTANCE_LOW
            );

            NotificationManager manager = getSystemService(NotificationManager.class);
            manager.createNotificationChannel(channel);
        }

        final String title = intent.getStringExtra("title");
        final String medicineName = intent.getStringExtra("medicineName");
        final String dosage = intent.getStringExtra("dosage");
        final String time = intent.getStringExtra("time");

        Intent detailIntent = new Intent(this, MainActivity.class); // RN entry point
        detailIntent.putExtra("screen", "AlarmDetail");
        detailIntent.putExtra("title", title);
        detailIntent.putExtra("medicineName", medicineName);
        detailIntent.putExtra("dosage", dosage);
        detailIntent.putExtra("time", time);
        detailIntent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TOP);

        PendingIntent detailPendingIntent = PendingIntent.getActivity(
                this,
                1,
                detailIntent,
                PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE
        );

        Notification notification = new NotificationCompat.Builder(this, channelId)
            .setContentTitle("Speaking Reminder")
            .setContentText(spokenText)
            .setSmallIcon(R.mipmap.ic_launcher)
            .setContentIntent(detailPendingIntent)
            .setAutoCancel(true)
            .build();

        startForeground(1, notification);

        // Initialize TTS
        tts = new TextToSpeech(this, status -> {
            if (status == TextToSpeech.SUCCESS) {

                tts.setLanguage(Locale.US);

                tts.setOnUtteranceProgressListener(new UtteranceProgressListener() {
                    @Override
                    public void onStart(String utteranceId) {}

                    @Override
                    public void onDone(String utteranceId) {

                        if (currentPartIndex < speechParts.length - 1) {

                            currentPartIndex++;

                            Bundle params = new Bundle();

                            String nextId = "AlarmTTS_" + currentPartIndex + "_" + repeatCount;
                            params.putString(TextToSpeech.Engine.KEY_PARAM_UTTERANCE_ID, nextId);

                            tts.speak(
                                speechParts[currentPartIndex],
                                TextToSpeech.QUEUE_ADD,
                                params,
                                nextId
                            );

                        } else {

                            if (repeatCount < MAX_REPEAT) {

                                repeatCount++;
                                currentPartIndex = 0;

                                Bundle params = new Bundle();

                                String repeatId = "AlarmTTS_" + currentPartIndex + "_" + repeatCount;
                                params.putString(TextToSpeech.Engine.KEY_PARAM_UTTERANCE_ID, repeatId);

                                tts.speak(
                                    speechParts[currentPartIndex],
                                    TextToSpeech.QUEUE_FLUSH,
                                    params,
                                    repeatId
                                );

                            } else {
                                Log.d("AlarmTTSService", "Completed all repeats");
                                stopSelf();
                            }
                        }
                    }

                    @Override
                    public void onError(String utteranceId) {
                        Log.e("AlarmTTSService", "TTS error");
                    }
                });

                // 🔥 Start first chunk
                Bundle params = new Bundle();
                String utteranceId = "AlarmTTS_" + currentPartIndex + "_" + repeatCount;

                params.putString(TextToSpeech.Engine.KEY_PARAM_UTTERANCE_ID, utteranceId);

                tts.speak(
                    speechParts[currentPartIndex],
                    TextToSpeech.QUEUE_FLUSH,
                    params,
                    utteranceId
                );
            }
        });

        return START_NOT_STICKY;
    }

    private String[] splitText(String text, int maxLength) {

        int length = text.length();
        int parts = (int) Math.ceil((double) length / maxLength);

        String[] result = new String[parts];

        int start = 0;

        for (int i = 0; i < parts; i++) {
            int end = Math.min(start + maxLength, length);
            result[i] = text.substring(start, end);
            start = end;
        }

        return result;
    }

    @Override
    public void onDestroy() {
        if (tts != null) {
            tts.stop();
            tts.shutdown();
        }
        super.onDestroy();
    }

    @Override
    public IBinder onBind(Intent intent) {
        return null;
    }
}
