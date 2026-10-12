export type RowNotificationState = 'normal' | 'highlight' | 'last' | 'finished';

export type RowAction = 'next' | 'previous';

export type RowNotificationModuleEvents = {
  onAction: (params: ActionEventPayload) => void;
};

export type ActionEventPayload = {
  action: RowAction;
};
