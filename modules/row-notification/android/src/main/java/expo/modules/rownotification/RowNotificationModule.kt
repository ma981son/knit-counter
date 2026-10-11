package expo.modules.rownotification

import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition

class RowNotificationModule : Module() {
  override fun definition() = ModuleDefinition {
    Name("RowNotification")

    Events("onChange")

    Function("hello") {
      "Hello world! 👋"
    }
  }
}
