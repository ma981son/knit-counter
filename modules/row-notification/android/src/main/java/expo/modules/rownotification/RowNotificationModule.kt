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

  private var content: NotificationContent? = null

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

    Function("update") { newContent: NotificationContent ->
      content = newContent
      refresh()
    }

    Function("clear") {
      content = null
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
    val current = content ?: return

    val running = RowNotificationService.instance
    if (running != null) {
      running.show(
        current.title,
        current.body,
        current.row,
        current.total,
        current.state,
        current.progressLabel,
        current.vibrate,
        current.sound,
        current.colors
      )
      return
    }

    val context = appContext.reactContext ?: return
    val intent = Intent(context, RowNotificationService::class.java)
      .putExtra(RowNotificationService.EXTRA_TITLE, current.title)
      .putExtra(RowNotificationService.EXTRA_BODY, current.body)
      .putExtra(RowNotificationService.EXTRA_ROW, current.row)
      .putExtra(RowNotificationService.EXTRA_TOTAL, current.total)
      .putExtra(RowNotificationService.EXTRA_STATE, current.state)
      .putExtra(RowNotificationService.EXTRA_PROGRESS_LABEL, current.progressLabel)
      .putExtra(RowNotificationService.EXTRA_VIBRATE, current.vibrate)
      .putExtra(RowNotificationService.EXTRA_SOUND, current.sound)

    for ((key, value) in current.colors) {
      intent.putExtra(RowNotificationService.EXTRA_COLOR_PREFIX + key, value)
    }

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
