package expo.modules.rownotification

import expo.modules.kotlin.records.Field
import expo.modules.kotlin.records.Record

class NotificationContent : Record {
  @Field
  val title: String = ""

  @Field
  val body: String = ""

  @Field
  val row: Int = 0

  @Field
  val total: Int = 0

  @Field
  val state: String = "normal"

  @Field
  val progressLabel: String = ""

  @Field
  val vibrate: Boolean = true

  @Field
  val sound: Boolean = true

  @Field
  val colors: Map<String, String> = emptyMap()
}
