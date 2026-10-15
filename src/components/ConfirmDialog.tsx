import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';

import { Button } from '@/src/components/Button';
import { fonts, useTheme } from '@/src/theme';

type Props = {
  visible: boolean;
  title: string;
  message: string;
  confirmTitle: string;
  onConfirm: () => void;
  onClose: () => void;
  children?: ReactNode;
};

export function ConfirmDialog({
  visible,
  title,
  message,
  confirmTitle,
  onConfirm,
  onClose,
  children,
}: Props) {
  const colors = useTheme();
  const { t } = useTranslation();

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <Pressable style={styles.backdrop} onPress={onClose}>
        <Pressable style={[styles.sheet, { backgroundColor: colors.surface }]} onPress={() => {}}>
          {children}
          <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
          <Text style={[styles.message, { color: colors.text }]}>{message}</Text>
          <View style={styles.buttons}>
            <Button title={confirmTitle} onPress={onConfirm} />
            <Button title={t('common.cancel')} variant="secondary" onPress={onClose} />
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
  },
  sheet: {
    borderRadius: 18,
    padding: 18,
    gap: 12,
  },
  title: {
    fontFamily: fonts.display,
    fontSize: 22,
  },
  message: {
    fontFamily: fonts.body,
    fontSize: 15,
  },
  buttons: {
    gap: 10,
    marginTop: 4,
  },
});
