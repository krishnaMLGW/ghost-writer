import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import * as Clipboard from 'expo-clipboard';
import * as Haptics from 'expo-haptics';

import { COLORS, SPACING, TYPOGRAPHY, RADIUS } from '../constants/theme';
import { useAppStore } from '../store';

export function FavoritesScreen() {
  const { favorites, toggleFavorite } = useAppStore();
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopy = async (text: string, index: number) => {
    await Clipboard.setStringAsync(text);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  if (favorites.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyIcon}>💜</Text>
        <Text style={styles.emptyTitle}>No favorites saved yet</Text>
        <Text style={styles.emptySubtitle}>
          Heart your best replies to save them here
        </Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.title}>♥ Favorites</Text>
      <Text style={styles.subtitle}>{favorites.length} saved replies</Text>

      {favorites.map((fav, i) => (
        <View
          key={`${fav}-${i}`}
         
          style={styles.card}
        >
          <Text style={styles.text}>{fav}</Text>
          <View style={styles.actions}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => handleCopy(fav, i)}
              style={[styles.copyBtn, copiedIndex === i && styles.copyBtnDone]}
            >
              <Text
                style={[
                  styles.copyText,
                  copiedIndex === i && styles.copyTextDone,
                ]}
              >
                {copiedIndex === i ? '✓ Copied!' : '📋 Copy'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => {
                toggleFavorite(fav);
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
              }}
              style={styles.removeBtn}
            >
              <Text style={styles.removeIcon}>♥</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: SPACING.xl,
  },
  title: {
    ...TYPOGRAPHY.h2,
    color: COLORS.text.primary,
  },
  subtitle: {
    ...TYPOGRAPHY.caption,
    color: COLORS.text.ghost,
    marginTop: 4,
    marginBottom: SPACING.lg,
  },
  card: {
    backgroundColor: COLORS.bg.card,
    borderWidth: 1,
    borderColor: COLORS.border.light,
    borderRadius: RADIUS.lg + 2,
    padding: SPACING.lg + 2,
    marginBottom: SPACING.md,
  },
  text: {
    ...TYPOGRAPHY.body,
    color: COLORS.text.secondary,
    lineHeight: 24,
    marginBottom: SPACING.md + 2,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.sm,
  },
  copyBtn: {
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.lg + 2,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.brand.purpleGlow,
    borderWidth: 1,
    borderColor: COLORS.brand.purpleBorder,
  },
  copyBtnDone: {
    backgroundColor: COLORS.accent.greenGlow,
    borderColor: 'rgba(34, 197, 94, 0.4)',
  },
  copyText: {
    ...TYPOGRAPHY.caption,
    fontWeight: '600',
    color: COLORS.brand.purpleSoft,
  },
  copyTextDone: {
    color: COLORS.accent.greenLight,
  },
  removeBtn: {
    width: 38,
    height: 38,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.accent.pinkGlow,
    borderWidth: 1,
    borderColor: 'rgba(236, 72, 153, 0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  removeIcon: {
    fontSize: 18,
    color: COLORS.accent.pinkLight,
  },

  // Empty
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.sm,
    paddingBottom: 100,
  },
  emptyIcon: {
    fontSize: 56,
    marginBottom: SPACING.sm,
  },
  emptyTitle: {
    ...TYPOGRAPHY.h3,
    color: COLORS.text.muted,
  },
  emptySubtitle: {
    ...TYPOGRAPHY.caption,
    color: COLORS.text.ghost,
  },
});
