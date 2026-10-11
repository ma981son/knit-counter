import ExpoModulesCore

public class RowNotificationModule: Module {
  public func definition() -> ModuleDefinition {
    Name("RowNotification")

    Events("onChange")

    Function("hello") {
      return "Hello world! 👋"
    }
  }
}
