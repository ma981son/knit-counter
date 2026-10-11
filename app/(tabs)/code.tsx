import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

import { Button } from '@/src/components/Button';
import { CodeCheatSheet } from '@/src/components/CodeCheatSheet';
import { useCurrentPattern } from '@/src/hooks/useCurrentPattern';
import { useStore } from '@/src/store/store';
import { fonts, useTheme } from '@/src/theme';


export default function CodeScreen() {
  const colors = useTheme();
  const { pattern, parsed, warnings, stitchCounts } = useCurrentPattern();
  const updateCode = useStore((state) => state.updateCode);

  const savedCode = pattern?.code ?? '';
  const [draft, setDraft] = useState(savedCode);

  useEffect(() => {
    setDraft(savedCode);
  }, [savedCode]);

  const hasChanges = draft !== savedCode;

  if (!pattern) {
    return (
      <View style={[styles.center, { backgroundColor: colors.background }]}>
        <Text style={[styles.message, { color: colors.muted }]}>Loading…</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={{ backgroundColor: colors.background }}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
    >
      <TextInput
        value={draft}
        onChangeText={setDraft}
        multiline
        autoCapitalize="none"
        autoCorrect={false}
        spellCheck={false}
        textAlignVertical="top"
        placeholder={'1-6: K1, P1\n7+: Knit | Purl'}
        placeholderTextColor={colors.muted}
        style={[
          styles.editor,
          { backgroundColor: colors.surface, borderColor: colors.line, color: colors.text },
        ]}
      />

        <View style={styles.buttons}>
        <Button title="Save code" onPress={() => updateCode(pattern.id, draft)} disabled={!hasChanges} />
        {hasChanges && (
          <Button title="Discard changes" variant="secondary" onPress={() => setDraft(savedCode)} />
        )}
      </View>
      <CodeCheatSheet />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  message: {
    fontFamily: fonts.body,
    fontSize: 16,
  },
  content: {
    padding: 16,
    gap: 12,
  },
  editor: {
    minHeight: 260,
    borderWidth: 1,
    borderRadius: 14,
    padding: 12,
    fontFamily: 'monospace',
    fontSize: 15,
    lineHeight: 22,
  },
  buttons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
});