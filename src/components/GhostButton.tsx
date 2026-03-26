import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, RADIUS, SPACING, TYPOGRAPHY, SHADOWS } from '../constants/theme';

interface GhostButtonProps {
  label: string;
  emoji: string;
  onPress: () => void;
  disabled?: boolean;
  variant?: 'brand' | 'roast';
}

export function GhostButton({
  label,
  emoji,
  onPress,
  disabled = false,
  variant = 'brand',
}: GhostButtonProps) {
  const gradientColors =
    variant === 'roast' ? COLORS.gradient.roast : COLORS.gradient.brand;
  const shadow = variant === 'roast' ? SHADOWS.glowRoast : SHADOWS.glow;

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      disabled={disabled}
      style={[styles.wrapper, !disabled && shadow, disabled && styles.disabled]}
    >
      <LinearGradient
        colors={gradientColors as any}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        <Text style={styles.emoji}>{emoji}</Text>
        <Text style={styles.label}>{label}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: RADIUS.lg + 2,
    marginTop: SPACING.xs,
    overflow: 'hidden',
  },
  gradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    paddingVertical: SPACING.lg + 2,
    paddingHorizontal: SPACING.xxl,
    borderRadius: RADIUS.lg + 2,
  },
  label: {
    ...TYPOGRAPHY.button,
    color: COLORS.text.primary,
  },
  emoji: {
    fontSize: 22,
  },
  disabled: {
    opacity: 0.35,
  },
});
