package expo.modules.appicon

import android.content.ComponentName
import android.content.Context
import android.content.pm.ActivityInfo
import android.content.pm.PackageManager
import android.os.Build
import expo.modules.kotlin.exception.Exceptions
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition

class AppIconModule : Module() {
  companion object {
    const val KILL_APP = 0
  }

  private data class Icon(val name: String, val component: ComponentName, val enabledByDefault: Boolean)

  private val context: Context
    get() = appContext.reactContext ?: throw Exceptions.ReactContextLost()

  override fun definition() = ModuleDefinition {
    Name("AppIcon")

    Function("getIcon") {
      icons().firstOrNull { isEnabled(it) }?.name
    }

    Function("setIcon") { name: String ->
      val icons = icons()
      val target = icons.firstOrNull { it.name == name } ?: return@Function
      if (isEnabled(target)) return@Function
      val others = icons.filter { it != target }
      setState(target, PackageManager.COMPONENT_ENABLED_STATE_ENABLED, PackageManager.DONT_KILL_APP)
      others.forEachIndexed { index, other ->
        val flags = if (index == others.lastIndex) KILL_APP else PackageManager.DONT_KILL_APP
        setState(other, PackageManager.COMPONENT_ENABLED_STATE_DISABLED, flags)
      }
    }
  }

  private fun icons(): List<Icon> {
    val prefix = "${context.packageName}.MainActivity"
    return activities()
      .filter { it.targetActivity != null && it.name.startsWith(prefix) }
      .map { Icon(it.name.removePrefix(prefix), ComponentName(context.packageName, it.name), it.enabled) }
  }

  private fun activities(): Array<ActivityInfo> {
    val packageManager = context.packageManager
    val flags = PackageManager.GET_ACTIVITIES or PackageManager.MATCH_DISABLED_COMPONENTS
    val info = if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
      packageManager.getPackageInfo(context.packageName, PackageManager.PackageInfoFlags.of(flags.toLong()))
    } else {
      @Suppress("DEPRECATION")
      packageManager.getPackageInfo(context.packageName, flags)
    }
    return info.activities ?: emptyArray()
  }

  private fun isEnabled(icon: Icon): Boolean =
    when (context.packageManager.getComponentEnabledSetting(icon.component)) {
      PackageManager.COMPONENT_ENABLED_STATE_ENABLED -> true
      PackageManager.COMPONENT_ENABLED_STATE_DISABLED -> false
      else -> icon.enabledByDefault
    }

  private fun setState(icon: Icon, state: Int, flags: Int) {
    context.packageManager.setComponentEnabledSetting(icon.component, state, flags)
  }
}
