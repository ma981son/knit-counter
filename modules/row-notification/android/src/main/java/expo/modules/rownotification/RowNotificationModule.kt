package expo.modules.rownotification

import android.content.Intent
import android.util.Log
import androidx.core.content.ContextCompat
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition

class RowNotificationModule : Module() {
  companion object {
    private var current: RowNotificationModule? = null

    fun sendAction(action: String): Boolean {
      val module = current ?: return false
      module.sendEvent("onAction", mapOf("action" to action))
      return true
    }
  }

  private var title: String? = null
  private var body: String = ""
  private var row: Int = 0
  private var total: Int = 0
  private var state: String = "normal"
  private var progressLabel: String = ""
  private var vibrate: Boolean = true
  private var sound: Boolean = true

  override fun definition() = ModuleDefinition {
    Name("RowNotification")

    Events("onAction")

    OnCreate {
      current = this@RowNotificationModule
    }

    OnDestroy {
      if (current === this@RowNotificationModule) current = null
      stopService()
    }

    Function("update") { newTitle: String, newBody: String, newRow: Int, newTotal: Int, newState: String, newProgressLabel: String, newVibrate: Boolean, newSound: Boolean ->
      title = newTitle
      body = newBody
      row = newRow
      total = newTotal
      state = newState
      progressLabel = newProgressLabel
      vibrate = newVibrate
      sound = newSound
      refresh()
    }

    Function("clear") {
      title = null
      stopService()
    }

    OnActivityEntersForeground {
      refresh()
    }

    OnActivityDestroys {
      stopService()
    }
  }

  private fun refresh() {
    val currentTitle = title ?: return

    val running = RowNotificationService.instance
    if (running != null) {
      running.show(currentTitle, body, row, total, state, progressLabel, vibrate, sound)
      return
    }

    val context = appContext.reactContext ?: return
    val intent = Intent(context, RowNotificationService::class.java)
      .putExtra(RowNotificationService.EXTRA_TITLE, currentTitle)
      .putExtra(RowNotificationService.EXTRA_BODY, body)
      .putExtra(RowNotificationService.EXTRA_ROW, row)
      .putExtra(RowNotificationService.EXTRA_TOTAL, total)
      .putExtra(RowNotificationService.EXTRA_STATE, state)
      .putExtra(RowNotificationService.EXTRA_PROGRESS_LABEL, progressLabel)
      .putExtra(RowNotificationService.EXTRA_VIBRATE, vibrate)
      .putExtra(RowNotificationService.EXTRA_SOUND, sound)

    try {
      ContextCompat.startForegroundService(context, intent)
    } catch (error: Exception) {
      Log.w("RowNotification", "Could not start service", error)
    }
  }

  private fun stopService() {
    val context = appContext.reactContext ?: return
    context.stopService(Intent(context, RowNotificationService::class.java))
  }
}
