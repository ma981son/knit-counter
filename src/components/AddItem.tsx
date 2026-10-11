import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { Button } from '@/src/components/Button';
import { fonts, useTheme } from '@/src/theme';

type Props = {
  label: string;
  placeholder: string;
  onAdd: (name: string) => void;
};

export function AddItem({ label, placeholder, onAdd }: Props) {
  const colors = useTheme();
  const [isAdding, setIsAdding] = useState(false);
  const [name, setName] = useState('');

  function submit() {
    const trimmed = name.trim();
    if (trimmed === '') return;
    onAdd(trimmed);
    setName('');
    setIsAdding(false);
  }

  function cancel() {
    setName('');
    setIsAdding(false);
  }

  if (!isAdding) {
    return (
      <Pressable
        onPress={() => setIsAdding(true)}
        style={({ pressed }) => [styles.addButton, { borderColor: colors.line, opacity: pressed ? 0.7 : 1 }]}
      >
        <Text style={[styles.addText, { color: colors.accent }]}>+ {label}</Text>
      </Pressable>
    );
  }

  return (
    <View style={[styles.form, { backgroundColor: colors.surface, borderColor: colors.line }]}>
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder={placeholder}
        placeholderTextColor={colors.muted}
        autoFocus
        returnKeyType="done"
        onSubmitEditing={submit}
        style={[styles.input, { color: colors.text, borderColor: colors.line }]}
      />
      <View style={styles.buttons}>
        <Button title="Add" onPress={submit} disabled={name.trim() === ''} />
        <Button title="Cancel" variant="secondary" onPress={cancel} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  addButton: {
    borderWidth: 1,
    borderStyle: 'dashed',
    borderRadius: 18,
    paddingVertical: 16,
    alignItems: 'center',
  },
  addText: {
    fontFamily: fonts.bodySemiBold,
    fontSize: 16,
  },
  form: {
    borderWidth: 1,
    borderRadius: 18,
    padding: 14,
    gap: 10,
  },
  input: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontFamily: fonts.body,
    fontSize: 16,
  },
  buttons: {
    flexDirection: 'row',
    gap: 10,
  },
});