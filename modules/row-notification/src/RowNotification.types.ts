export type RowNotificationState = 'normal' | 'highlight' | 'last' | 'finished';

export type RowNotificationColors = {
  strongLight: string;
  strongDark: string;
  onStrongLight: string;
  onStrongDark: string;
  lineLight: string;
  lineDark: string;
};

export type RowNotificationContent = {
  title: string;
  body: string;
  row: number;
  total: number;
  state: RowNotificationState;
  progressLabel: string;
  vibrate: boolean;
  sound: boolean;
  colors: RowNotificationColors;
};

export type RowAction = 'next' | 'previous';

export type RowNotificationModuleEvents = {
  onAction: (params: ActionEventPayload) => void;
};

export type ActionEventPayload = {
  action: RowAction;
};
