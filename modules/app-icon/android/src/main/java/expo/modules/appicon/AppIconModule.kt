package expo.modules.appicon

import android.content.ComponentName
import android.content.Context
import android.content.pm.PackageManager
import expo.modules.kotlin.exception.Exceptions
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition

class AppIconModule : Module() {
  companion object {
    val ICONS = listOf("Rosadito", "RosaditoLight", "Jarrito", "JarritoLight")
    val DEFAULT_ICON = ICONS.first()
    const val KILL_APP = 0
  }

  private val context: Context
    get() = appContext.reactContext ?: throw Exceptions.ReactContextLost()

  override fun definition() = ModuleDefinition {
    Name("AppIcon")

    Function("getIcon") {
      currentIcon()
    }

    Function("setIcon") { icon: String ->
      if (icon !in ICONS || icon == currentIcon()) return@Function
      val others = ICONS.filter { it != icon }
      setState(icon, PackageManager.COMPONENT_ENABLED_STATE_ENABLED, PackageManager.DONT_KILL_APP)
      others.forEachIndexed { index, other ->
        val flags = if (index == others.lastIndex) KILL_APP else PackageManager.DONT_KILL_APP
        setState(other, PackageManager.COMPONENT_ENABLED_STATE_DISABLED, flags)
      }
    }
  }

  private fun currentIcon(): String = ICONS.firstOrNull { isEnabled(it) } ?: DEFAULT_ICON

  private fun componentFor(icon: String): ComponentName =
    ComponentName(context.packageName, "${context.packageName}.MainActivity$icon")

  private fun isEnabled(icon: String): Boolean =
    when (context.packageManager.getComponentEnabledSetting(componentFor(icon))) {
      PackageManager.COMPONENT_ENABLED_STATE_ENABLED -> true
      PackageManager.COMPONENT_ENABLED_STATE_DISABLED -> false
      else -> icon == DEFAULT_ICON
    }

  private fun setState(icon: String, state: Int, flags: Int) {
    context.packageManager.setComponentEnabledSetting(componentFor(icon), state, flags)
  }
}
