import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle } from 'react-native';
import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from '../constants/theme';

interface ChipProps {
  emoji: string;
  label: string;
  selected: boolean;
  onPress: () => void;
  activeColor?: string;
  style?: ViewStyle;
}

export function Chip({ emoji, label, selected, onPress, activeColor, style }: ChipProps) {
  const activeBorderColor = activeColor || COLORS.brand.purpleBorder;
  const activeGlow = activeColor ? `${activeColor}33` : COLORS.brand.purpleGlow;

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={[
        styles.chip,
        selected && {
          backgroundColor: activeColor ? `${activeColor}20` : COLORS.brand.purpleGlow,
          borderColor: activeBorderColor,
        },
        style,
      ]}
    >
      <Text style={styles.emoji}>{emoji}</Text>
      <Text style={[styles.label, selected && styles.labelActive]}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md + 2,
    borderRadius: RADIUS.xxl,
    backgroundColor: COLORS.bg.elevated,
    borderWidth: 1,
    borderColor: COLORS.border.light,
  },
  emoji: {
    fontSize: 15,
  },
  label: {
    ...TYPOGRAPHY.chip,
    color: COLORS.text.muted,
  },
  labelActive: {
    color: '#e0d5ff',
  },
});
