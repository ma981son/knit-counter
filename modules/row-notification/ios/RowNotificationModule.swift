import ExpoModulesCore

public class RowNotificationModule: Module {
  public func definition() -> ModuleDefinition {
    Name("RowNotification")

    Events("onAction")

    Function("update") { (content: [String: Any]) in
    }

    Function("clear") {
    }
  }
}
