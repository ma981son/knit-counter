import { StyleSheet, Text, View } from 'react-native';

import { ProgressBar } from '@/src/components/ProgressBar';
import { NotificationContent } from '@/src/notifications/rowNotification';
import { fonts, useTheme } from '@/src/theme';

type Props = {
  content: NotificationContent;
};

export function NotificationPreview({ content }: Props) {
  const colors = useTheme();
  const { title, body, row, total, state } = content;

  const background =
    state === 'highlight'
      ? colors.markBackground
      : state === 'normal'
        ? colors.surface
        : colors.endBackground;

  const strong =
    state === 'highlight' ? colors.mark : state === 'normal' ? colors.accent : colors.end;

  const titleColor =
    state === 'highlight' ? colors.markText : state === 'normal' ? colors.text : colors.end;

  return (
    <View style={[styles.card, { backgroundColor: background, borderColor: colors.line }]}>
      <View style={styles.row}>
        <View style={[styles.button, { borderColor: strong }]}>
          <Text style={[styles.buttonText, { color: strong }]}>−</Text>
        </View>

        <View style={styles.middle}>
          <Text numberOfLines={1} style={[styles.title, { color: titleColor }]}>
            {title}
          </Text>
          <Text numberOfLines={2} style={[styles.body, { color: colors.muted }]}>
            {body}
          </Text>
        </View>

        <View
          style={[
            styles.button,
            { backgroundColor: strong, borderColor: strong },
            state === 'finished' && styles.disabled,
          ]}
        >
          <Text style={[styles.buttonText, { color: colors.onAccent }]}>+</Text>
        </View>
      </View>

      {total > 0 && <ProgressBar row={row} totalRows={total} />}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderRadius: 20,
    padding: 12,
    gap: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  button: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontFamily: fonts.bodyBold,
    fontSize: 22,
    lineHeight: 26,
  },
  middle: {
    flex: 1,
    gap: 2,
  },
  title: {
    fontFamily: fonts.display,
    fontSize: 16,
  },
  body: {
    fontFamily: fonts.body,
    fontSize: 14,
  },
  disabled: {
    opacity: 0.4,
  },
});
