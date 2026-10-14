import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Modal, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { Button } from '@/src/components/Button';
import { fonts, useTheme } from '@/src/theme';

type Props = {
  visible: boolean;
  kind: 'project' | 'pattern';
  initialName: string;
  deleteMessage: string;
  onRename: (name: string) => void;
  onDelete: () => void;
  onClose: () => void;
};

export function EditItemSheet({
  visible,
  kind,
  initialName,
  deleteMessage,
  onRename,
  onDelete,
  onClose,
}: Props) {
  const colors = useTheme();
  const { t } = useTranslation();
  const [name, setName] = useState(initialName);
  const [confirmingDelete, setConfirmingDelete] = useState(false);

  useEffect(() => {
    if (visible) {
      setName(initialName);
      setConfirmingDelete(false);
    }
  }, [visible, initialName]);

  const trimmed = name.trim();

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <Pressable style={styles.backdrop} onPress={onClose}>
        <Pressable style={[styles.sheet, { backgroundColor: colors.surface }]} onPress={() => {}}>
          <Text style={[styles.title, { color: colors.text }]}>{t(`editSheet.title.${kind}`)}</Text>

          <TextInput
            value={name}
            onChangeText={setName}
            returnKeyType="done"
            style={[styles.input, { color: colors.text, borderColor: colors.line }]}
          />
          <Button
            title={t('editSheet.saveName')}
            disabled={trimmed === '' || trimmed === initialName}
            onPress={() => {
              onRename(trimmed);
              onClose();
            }}
          />

          <View style={[styles.divider, { backgroundColor: colors.line }]} />

          {confirmingDelete ? (
            <View style={styles.confirm}>
              <Text style={[styles.message, { color: colors.text }]}>{deleteMessage}</Text>
              <View style={styles.row}>
                <Button
                  title={t(`editSheet.delete.${kind}`)}
                  variant="danger"
                  onPress={() => {
                    onDelete();
                    onClose();
                  }}
                />
                <Button
                  title={t('editSheet.keep')}
                  variant="secondary"
                  onPress={() => setConfirmingDelete(false)}
                />
              </View>
            </View>
          ) : (
            <Button
              title={t(`editSheet.askDelete.${kind}`)}
              variant="secondary"
              onPress={() => setConfirmingDelete(true)}
            />
          )}
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
  input: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontFamily: fonts.body,
    fontSize: 16,
  },
  divider: {
    height: 1,
    marginVertical: 4,
  },
  confirm: {
    gap: 10,
  },
  message: {
    fontFamily: fonts.body,
    fontSize: 15,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
});
