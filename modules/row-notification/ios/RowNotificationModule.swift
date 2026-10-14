import ExpoModulesCore

public class RowNotificationModule: Module {
  public func definition() -> ModuleDefinition {
    Name("RowNotification")

    Events("onAction")

    Function("update") { (title: String, body: String, row: Int, total: Int, state: String, progressLabel: String, vibrate: Bool) in
    }

    Function("clear") {
    }
  }
}
