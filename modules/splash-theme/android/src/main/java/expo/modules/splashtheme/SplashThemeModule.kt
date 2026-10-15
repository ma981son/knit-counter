package expo.modules.splashtheme

import android.app.Activity
import android.content.res.Resources
import android.os.Build
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition

class SplashThemeModule : Module() {
  companion object {
    const val BASE_THEME = "Theme.App.SplashScreen"
  }

  override fun definition() = ModuleDefinition {
    Name("SplashTheme")

    Function("setTheme") { name: String? ->
      if (Build.VERSION.SDK_INT < Build.VERSION_CODES.TIRAMISU) return@Function false
      val activity = appContext.currentActivity ?: return@Function false
      val themeId = if (name == null) Resources.ID_NULL else themeIdFor(activity, "$BASE_THEME.$name")
      if (name != null && themeId == Resources.ID_NULL) return@Function false
      activity.splashScreen.setSplashScreenTheme(themeId)
      true
    }
  }

  private fun themeIdFor(activity: Activity, styleName: String): Int {
    val resources = activity.resources
    val withDots = resources.getIdentifier(styleName, "style", activity.packageName)
    if (withDots != Resources.ID_NULL) return withDots
    return resources.getIdentifier(styleName.replace('.', '_'), "style", activity.packageName)
  }
}
