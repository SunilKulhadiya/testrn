package com.shukr.caretaker.alarm;

import android.app.Activity;
import android.os.Bundle;
import android.widget.TextView;

public class AlarmDetailActivity extends Activity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        String title = getIntent().getStringExtra("title");

        TextView tv = new TextView(this);
        tv.setText("Alarm Details: " + title);
        setContentView(tv);
    }
}
