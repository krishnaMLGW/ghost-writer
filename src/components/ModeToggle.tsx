import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from '../constants/theme';
import { useAppStore } from '../store';

export function ModeToggle() {
  const { mode, setMode } = useAppStore();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.7}
        style={[styles.btn, mode === 'reply' && styles.btnActiveReply]}
        onPress={() => setMode('reply')}
      >
        <Text style={styles.emoji}>💬</Text>
        <Text style={[styles.label, mode === 'reply' && styles.labelActiveReply]}>
          Reply Mode
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.7}
        style={[styles.btn, mode === 'roast' && styles.btnActiveRoast]}
        onPress={() => setMode('roast')}
      >
        <Text style={styles.emoji}>🔥</Text>
        <Text style={[styles.label, mode === 'roast' && styles.labelActiveRoast]}>
          Roast Mode
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: SPACING.lg,
  },
  btn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: SPACING.md + 2,
    paddingHorizontal: SPACING.lg,
    borderRadius: RADIUS.lg,
    backgroundColor: COLORS.bg.elevated,
    borderWidth: 1,
    borderColor: COLORS.border.subtle,
  },
  btnActiveReply: {
    backgroundColor: COLORS.brand.purpleGlow,
    borderColor: COLORS.brand.purpleBorder,
  },
  btnActiveRoast: {
    backgroundColor: COLORS.accent.redGlow,
    borderColor: 'rgba(239, 68, 68, 0.4)',
  },
  emoji: {
    fontSize: 18,
  },
  label: {
    ...TYPOGRAPHY.bodyMedium,
    color: COLORS.text.muted,
  },
  labelActiveReply: {
    color: COLORS.brand.purpleSoft,
  },
  labelActiveRoast: {
    color: COLORS.accent.redLight,
  },
});
