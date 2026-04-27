package com.shukr.caretaker

import android.content.Intent
import android.os.Bundle
import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate

class MainActivity : ReactActivity() {

  override fun getMainComponentName(): String = "caretaker"

  override fun createReactActivityDelegate(): ReactActivityDelegate {
    return object : DefaultReactActivityDelegate(this, mainComponentName, fabricEnabled) {
      override fun getLaunchOptions(): Bundle? {
        val initialProps = Bundle()
        val intent: Intent? = this@MainActivity.intent
        if (intent != null && intent.hasExtra("screen")) {
          initialProps.putString("screen", intent.getStringExtra("screen"))
          initialProps.putString("title", intent.getStringExtra("title"))
        }
        return initialProps
      }
    }
  }
}
