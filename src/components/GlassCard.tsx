import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { COLORS, RADIUS, SPACING } from '../constants/theme';

interface GlassCardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  noPadding?: boolean;
}

export function GlassCard({ children, style, noPadding }: GlassCardProps) {
  return (
    <View style={[styles.card, noPadding && styles.noPadding, style]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.bg.card,
    borderWidth: 1,
    borderColor: COLORS.border.subtle,
    borderRadius: RADIUS.xl,
    padding: SPACING.lg + 2,
    marginBottom: SPACING.md + 2,
  },
  noPadding: {
    padding: 0,
  },
});
