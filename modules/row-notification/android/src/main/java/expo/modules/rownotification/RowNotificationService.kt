package expo.modules.rownotification

import android.app.NotificationChannel
import android.app.NotificationManager
import android.app.PendingIntent
import android.app.Service
import android.content.Intent
import android.content.pm.ServiceInfo
import android.content.res.ColorStateList
import android.content.res.Configuration
import android.graphics.Color
import android.os.Build
import android.os.IBinder
import android.os.VibrationEffect
import android.os.Vibrator
import android.os.VibratorManager
import android.view.View
import android.widget.RemoteViews
import androidx.core.app.NotificationCompat
import androidx.core.app.ServiceCompat
import androidx.core.content.ContextCompat
import kotlin.math.roundToInt

class RowNotificationService : Service() {
  companion object {
    const val CHANNEL_ID = "row-counter-alert"
    const val OLD_CHANNEL_ID = "row-counter"
    const val NOTIFICATION_ID = 1
    const val ACTION_NEXT = "expo.modules.rownotification.NEXT"
    const val ACTION_PREVIOUS = "expo.modules.rownotification.PREVIOUS"
    const val EXTRA_TITLE = "title"
    const val EXTRA_BODY = "body"
    const val EXTRA_ROW = "row"
    const val EXTRA_TOTAL = "total"
    const val EXTRA_STATE = "state"
    const val EXTRA_PROGRESS_LABEL = "progressLabel"
    const val EXTRA_VIBRATE = "vibrate"
    const val EXTRA_SOUND = "sound"
    const val EXTRA_COLOR_PREFIX = "color_"
    val COLOR_KEYS = listOf("strongLight", "strongDark", "onStrongLight", "onStrongDark", "lineLight", "lineDark")
    val VIBRATION_PATTERN = longArrayOf(0, 80, 50, 80, 50, 80)
    val TICK_PATTERN = longArrayOf(0, 20)

    var instance: RowNotificationService? = null
      private set
  }

  private data class DayNight(val light: Int, val dark: Int)

  private var nextFromNotification = false
  private var shownRow = -1

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
      ACTION_NEXT -> {
        nextFromNotification = true
        if (!RowNotificationModule.sendAction("next")) stopSelf()
      }
      ACTION_PREVIOUS -> if (!RowNotificationModule.sendAction("previous")) stopSelf()
      else -> show(
        intent?.getStringExtra(EXTRA_TITLE) ?: "",
        intent?.getStringExtra(EXTRA_BODY) ?: "",
        intent?.getIntExtra(EXTRA_ROW, 0) ?: 0,
        intent?.getIntExtra(EXTRA_TOTAL, 0) ?: 0,
        intent?.getStringExtra(EXTRA_STATE) ?: "normal",
        intent?.getStringExtra(EXTRA_PROGRESS_LABEL) ?: "",
        intent?.getBooleanExtra(EXTRA_VIBRATE, true) ?: true,
        intent?.getBooleanExtra(EXTRA_SOUND, true) ?: true,
        COLOR_KEYS.mapNotNull { key -> intent?.getStringExtra(EXTRA_COLOR_PREFIX + key)?.let { key to it } }.toMap()
      )
    }
    return START_NOT_STICKY
  }

  override fun onTaskRemoved(rootIntent: Intent?) {
    stopSelf()
    super.onTaskRemoved(rootIntent)
  }

  fun show(
    title: String,
    body: String,
    row: Int,
    total: Int,
    state: String,
    progressLabel: String,
    vibrate: Boolean,
    sound: Boolean,
    colors: Map<String, String>
  ) {
    createChannel()

    if (vibrate && nextFromNotification && row != shownRow) {
      vibrate(if (state == "highlight" || state == "last") VIBRATION_PATTERN else TICK_PATTERN)
    }
    nextFromNotification = false
    shownRow = row

    val strong = dayNight(colors, "strong")
    val onStrong = dayNight(colors, "onStrong")
    val line = dayNight(colors, "line")

    val color = strong?.let { if (isNight()) it.dark else it.light }
      ?: ContextCompat.getColor(this, colorFor(state))
    val collapsed = buildViews(R.layout.row_notification_collapsed, title, body, state, color, strong, onStrong)
    val expanded = buildViews(R.layout.row_notification_expanded, title, body, state, color, strong, onStrong)
    addProgress(expanded, row, total, progressLabel, color, strong, line)

    val builder = NotificationCompat.Builder(this, CHANNEL_ID)
      .setSmallIcon(R.drawable.ic_row_notification)
      .setColor(color)
      .setContentTitle(title)
      .setContentText(body)
      .setStyle(NotificationCompat.DecoratedCustomViewStyle())
      .setCustomContentView(collapsed)
      .setCustomBigContentView(expanded)
      .setContentIntent(openAppIntent())
      .setOngoing(true)
      .setOnlyAlertOnce(true)
      .setSilent(!sound)

    val type = if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.UPSIDE_DOWN_CAKE) {
      ServiceInfo.FOREGROUND_SERVICE_TYPE_SPECIAL_USE
    } else {
      0
    }

    ServiceCompat.startForeground(this, NOTIFICATION_ID, builder.build(), type)
  }

  private fun dayNight(colors: Map<String, String>, name: String): DayNight? {
    val light = colors["${name}Light"] ?: return null
    val dark = colors["${name}Dark"] ?: return null
    return try {
      DayNight(Color.parseColor(light), Color.parseColor(dark))
    } catch (error: IllegalArgumentException) {
      null
    }
  }

  private fun isNight(): Boolean =
    (resources.configuration.uiMode and Configuration.UI_MODE_NIGHT_MASK) == Configuration.UI_MODE_NIGHT_YES

  private fun colorFor(state: String): Int = when (state) {
    "highlight" -> R.color.row_notification_mark
    "last", "finished" -> R.color.row_notification_end
    else -> R.color.row_notification_accent
  }

  private fun minusFor(state: String): Int = when (state) {
    "highlight" -> R.drawable.row_notification_minus_highlight
    "last", "finished" -> R.drawable.row_notification_minus_end
    else -> R.drawable.row_notification_minus_normal
  }

  private fun plusFor(state: String): Int = when (state) {
    "highlight" -> R.drawable.row_notification_plus_highlight
    "last", "finished" -> R.drawable.row_notification_plus_end
    else -> R.drawable.row_notification_plus_normal
  }

  private fun buildViews(
    layout: Int,
    title: String,
    body: String,
    state: String,
    color: Int,
    strong: DayNight?,
    onStrong: DayNight?
  ): RemoteViews {
    val views = RemoteViews(packageName, layout)
    views.setTextViewText(R.id.row_notification_title, title)
    views.setTextViewText(R.id.row_notification_body, body)
    views.setTextColor(R.id.row_notification_minus, color)
    views.setInt(R.id.row_notification_minus, "setBackgroundResource", minusFor(state))
    views.setInt(R.id.row_notification_plus, "setBackgroundResource", plusFor(state))
    views.setOnClickPendingIntent(R.id.row_notification_minus, actionIntent(ACTION_PREVIOUS, 1))
    views.setOnClickPendingIntent(R.id.row_notification_plus, actionIntent(ACTION_NEXT, 2))

    if (state != "normal") {
      views.setTextColor(R.id.row_notification_title, color)
    }

    if (state == "finished") {
      views.setFloat(R.id.row_notification_plus, "setAlpha", 0.4f)
    }

    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {
      if (strong != null) {
        views.setColorInt(R.id.row_notification_minus, "setTextColor", strong.light, strong.dark)
        views.setColorStateList(
          R.id.row_notification_minus,
          "setBackgroundTintList",
          ColorStateList.valueOf(strong.light),
          ColorStateList.valueOf(strong.dark)
        )
        views.setColorStateList(
          R.id.row_notification_plus,
          "setBackgroundTintList",
          ColorStateList.valueOf(strong.light),
          ColorStateList.valueOf(strong.dark)
        )
        if (state != "normal") {
          views.setColorInt(R.id.row_notification_title, "setTextColor", strong.light, strong.dark)
        }
      }
      if (onStrong != null) {
        views.setColorInt(R.id.row_notification_plus, "setTextColor", onStrong.light, onStrong.dark)
      }
    }

    return views
  }

  private fun addProgress(
    views: RemoteViews,
    row: Int,
    total: Int,
    label: String,
    color: Int,
    strong: DayNight?,
    line: DayNight?
  ) {
    if (total <= 0) {
      views.setViewVisibility(R.id.row_notification_progress_section, View.GONE)
      return
    }

    val rowsDone = (row - 1).coerceIn(0, total)
    val percent = (rowsDone * 100f / total).roundToInt()
    views.setTextViewText(R.id.row_notification_progress_label, label)
    views.setTextViewText(R.id.row_notification_progress_percent, "$percent%")
    views.setProgressBar(R.id.row_notification_progress, total, rowsDone, false)

    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {
      if (strong != null) {
        views.setColorStateList(
          R.id.row_notification_progress,
          "setProgressTintList",
          ColorStateList.valueOf(strong.light),
          ColorStateList.valueOf(strong.dark)
        )
      } else {
        views.setColorStateList(R.id.row_notification_progress, "setProgressTintList", ColorStateList.valueOf(color))
      }
      if (line != null) {
        views.setColorStateList(
          R.id.row_notification_progress,
          "setProgressBackgroundTintList",
          ColorStateList.valueOf(line.light),
          ColorStateList.valueOf(line.dark)
        )
      }
    }
  }

  private fun vibrate(pattern: LongArray) {
    val vibrator = if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {
      getSystemService(VibratorManager::class.java).defaultVibrator
    } else {
      getSystemService(Vibrator::class.java)
    }

    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
      vibrator.vibrate(VibrationEffect.createWaveform(pattern, -1))
    } else {
      @Suppress("DEPRECATION")
      vibrator.vibrate(pattern, -1)
    }
  }

  private fun createChannel() {
    if (Build.VERSION.SDK_INT < Build.VERSION_CODES.O) return
    val manager = getSystemService(NotificationManager::class.java)
    manager.deleteNotificationChannel(OLD_CHANNEL_ID)
    val channel = NotificationChannel(CHANNEL_ID, getString(R.string.row_notification_channel_name), NotificationManager.IMPORTANCE_DEFAULT)
    manager.createNotificationChannel(channel)
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
