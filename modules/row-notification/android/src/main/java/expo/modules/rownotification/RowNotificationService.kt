package expo.modules.rownotification

import android.app.NotificationChannel
import android.app.NotificationManager
import android.app.PendingIntent
import android.app.Service
import android.content.Intent
import android.content.pm.ServiceInfo
import android.os.Build
import android.os.IBinder
import androidx.core.app.NotificationCompat
import androidx.core.app.ServiceCompat

class RowNotificationService : Service() {
  companion object {
    const val CHANNEL_ID = "row-counter"
    const val NOTIFICATION_ID = 1
    const val ACTION_NEXT = "expo.modules.rownotification.NEXT"
    const val ACTION_PREVIOUS = "expo.modules.rownotification.PREVIOUS"
    const val EXTRA_TITLE = "title"
    const val EXTRA_BODY = "body"

    var instance: RowNotificationService? = null
      private set
  }

  override fun onCreate() {
    super.onCreate()
    instance = this
  }

  override fun onDestroy() {
    instance = null
    super.onDestroy()
  }

  override fun onBind(intent: Intent?): IBinder? = null

  override fun onStartCommand(intent: Intent?, flags: Int, startId: Int): Int {
    when (intent?.action) {
      ACTION_NEXT -> if (!RowNotificationModule.sendAction("next")) stopSelf()
      ACTION_PREVIOUS -> if (!RowNotificationModule.sendAction("previous")) stopSelf()
      else -> show(
        intent?.getStringExtra(EXTRA_TITLE) ?: "",
        intent?.getStringExtra(EXTRA_BODY) ?: ""
      )
    }
    return START_NOT_STICKY
  }

  override fun onTaskRemoved(rootIntent: Intent?) {
    stopSelf()
    super.onTaskRemoved(rootIntent)
  }

  fun show(title: String, body: String) {
    createChannel()

    val notification = NotificationCompat.Builder(this, CHANNEL_ID)
      .setSmallIcon(R.drawable.ic_row_notification)
      .setContentTitle(title)
      .setContentText(body)
      .setContentIntent(openAppIntent())
      .addAction(0, "−1", actionIntent(ACTION_PREVIOUS, 1))
      .addAction(0, "+1", actionIntent(ACTION_NEXT, 2))
      .setOngoing(true)
      .setSilent(true)
      .build()

    val type = if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.UPSIDE_DOWN_CAKE) {
      ServiceInfo.FOREGROUND_SERVICE_TYPE_SPECIAL_USE
    } else {
      0
    }

    ServiceCompat.startForeground(this, NOTIFICATION_ID, notification, type)
  }

  private fun createChannel() {
    if (Build.VERSION.SDK_INT < Build.VERSION_CODES.O) return
    val channel = NotificationChannel(CHANNEL_ID, "Row counter", NotificationManager.IMPORTANCE_LOW)
    getSystemService(NotificationManager::class.java).createNotificationChannel(channel)
  }

  private fun actionIntent(action: String, requestCode: Int): PendingIntent {
    val intent = Intent(this, RowNotificationService::class.java).setAction(action)
    return PendingIntent.getService(
      this,
      requestCode,
      intent,
      PendingIntent.FLAG_IMMUTABLE or PendingIntent.FLAG_UPDATE_CURRENT
    )
  }

  private fun openAppIntent(): PendingIntent? {
    val intent = packageManager.getLaunchIntentForPackage(packageName) ?: return null
    return PendingIntent.getActivity(this, 0, intent, PendingIntent.FLAG_IMMUTABLE)
  }
}