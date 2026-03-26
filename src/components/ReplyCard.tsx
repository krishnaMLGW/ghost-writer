import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import * as Clipboard from 'expo-clipboard';
import * as Haptics from 'expo-haptics';
import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from '../constants/theme';
import { useAppStore } from '../store';
import { shareReply } from '../utils/share';

interface ReplyCardProps {
  text: string;
  index: number;
}

export function ReplyCard({ text, index }: ReplyCardProps) {
  const [copied, setCopied] = useState(false);
  const { toggleFavorite, isFavorite, mode } = useAppStore();
  const favorite = isFavorite(text);

  const handleCopy = async () => {
    await Clipboard.setStringAsync(text);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFavorite = () => {
    toggleFavorite(text);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const handleShare = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    shareReply(text, mode);
  };

  return (
    <View style={styles.card}>
      <Text style={styles.badge}>Option {index + 1}</Text>
      <Text style={styles.text}>{text}</Text>
      <View style={styles.actions}>
        <TouchableOpacity activeOpacity={0.7} onPress={handleCopy} style={[styles.copyBtn, copied && styles.copyBtnDone]}>
          <Text style={[styles.copyText, copied && styles.copyTextDone]}>{copied ? '✓ Copied!' : '📋 Copy'}</Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.7} onPress={handleShare} style={styles.shareBtn}>
          <Text style={styles.shareIcon}>📤</Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.7} onPress={handleFavorite} style={[styles.favBtn, favorite && styles.favBtnActive]}>
          <Text style={[styles.favIcon, favorite && styles.favIconActive]}>{favorite ? '♥' : '♡'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.bg.card,
    borderWidth: 1,
    borderColor: COLORS.border.light,
    borderRadius: RADIUS.lg + 2,
    padding: SPACING.lg + 2,
    marginBottom: SPACING.md,
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: 12,
    right: 14,
    ...TYPOGRAPHY.tiny,
    color: COLORS.text.ghost,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  text: {
    ...TYPOGRAPHY.body,
    color: COLORS.text.secondary,
    marginBottom: SPACING.md + 2,
    paddingRight: 60,
    lineHeight: 24,
  },
  actions: { flexDirection: 'row', alignItems: 'center', gap: SPACING.sm },
  copyBtn: {
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.lg + 2,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.brand.purpleGlow,
    borderWidth: 1,
    borderColor: COLORS.brand.purpleBorder,
  },
  copyBtnDone: { backgroundColor: COLORS.accent.greenGlow, borderColor: 'rgba(34, 197, 94, 0.4)' },
  copyText: { ...TYPOGRAPHY.caption, fontWeight: '600', color: COLORS.brand.purpleSoft },
  copyTextDone: { color: COLORS.accent.greenLight },
  shareBtn: {
    width: 38, height: 38, borderRadius: RADIUS.md,
    backgroundColor: COLORS.bg.elevated, borderWidth: 1, borderColor: COLORS.border.light,
    alignItems: 'center', justifyContent: 'center',
  },
  shareIcon: { fontSize: 16 },
  favBtn: {
    width: 38, height: 38, borderRadius: RADIUS.md,
    backgroundColor: COLORS.bg.elevated, borderWidth: 1, borderColor: COLORS.border.light,
    alignItems: 'center', justifyContent: 'center',
  },
  favBtnActive: { backgroundColor: COLORS.accent.pinkGlow, borderColor: 'rgba(236, 72, 153, 0.4)' },
  favIcon: { fontSize: 18, color: COLORS.text.ghost },
  favIconActive: { color: COLORS.accent.pinkLight },
});
