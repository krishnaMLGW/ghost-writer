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
import { RELATIONSHIPS, TONES, ROAST_LEVELS } from '../constants/data';
import { useAppStore } from '../store';

export function HistoryScreen() {
  const { history, clearHistory } = useAppStore();
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = async (text: string, id: string) => {
    await Clipboard.setStringAsync(text);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
  };

  const getContextLabel = (item: any) => {
    if (item.mode === 'roast') {
      const level = ROAST_LEVELS.find((r) => r.id === item.roastLevel);
      return `${level?.emoji || '🔥'} ${level?.label || 'Roast'}`;
    }
    const rel = RELATIONSHIPS.find((r) => r.id === item.relationship);
    const tone = TONES.find((t) => t.id === item.tone);
    return `${rel?.emoji || ''} ${rel?.label || ''} · ${tone?.emoji || ''} ${tone?.label || ''}`;
  };

  if (history.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyIcon}>👻</Text>
        <Text style={styles.emptyTitle}>No ghosts here yet...</Text>
        <Text style={styles.emptySubtitle}>
          Your generated replies will appear here
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
      {/* Header */}
      <View style={styles.headerRow}>
        <Text style={styles.title}>📜 History</Text>
        <TouchableOpacity onPress={clearHistory}>
          <Text style={styles.clearBtn}>Clear All</Text>
        </TouchableOpacity>
      </View>

      {history.map((item, index) => (
        <View
          key={item.id}
         
          style={styles.card}
        >
          {/* Meta Row */}
          <View style={styles.metaRow}>
            <View style={styles.metaLeft}>
              <Text style={styles.modeLabel}>
                {item.mode === 'roast' ? '🔥 Roast' : '💬 Reply'}
              </Text>
              <Text style={styles.contextLabel}>{getContextLabel(item)}</Text>
            </View>
            <Text style={styles.time}>{formatTime(item.timestamp)}</Text>
          </View>

          {/* Original Input */}
          <Text style={styles.input} numberOfLines={2}>
            "{item.input}"
          </Text>

          {/* Replies */}
          <View style={styles.replies}>
            {item.replies.map((reply, ri) => {
              const replyId = `${item.id}-${ri}`;
              return (
                <TouchableOpacity
                  key={ri}
                  activeOpacity={0.7}
                  onPress={() => handleCopy(reply, replyId)}
                  style={styles.replyRow}
                >
                  <Text style={styles.replyText} numberOfLines={2}>
                    {reply}
                  </Text>
                  <Text style={styles.replyAction}>
                    {copiedId === replyId ? '✓' : '📋'}
                  </Text>
                </TouchableOpacity>
              );
            })}
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
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  title: {
    ...TYPOGRAPHY.h2,
    color: COLORS.text.primary,
  },
  clearBtn: {
    ...TYPOGRAPHY.caption,
    color: COLORS.accent.redLight,
  },
  card: {
    backgroundColor: COLORS.bg.card,
    borderWidth: 1,
    borderColor: COLORS.border.subtle,
    borderRadius: RADIUS.lg,
    padding: SPACING.lg,
    marginBottom: SPACING.md,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: SPACING.sm,
  },
  metaLeft: {
    flex: 1,
    gap: 2,
  },
  modeLabel: {
    ...TYPOGRAPHY.small,
    fontWeight: '600',
    color: '#a78bfa',
  },
  contextLabel: {
    ...TYPOGRAPHY.tiny,
    color: COLORS.text.ghost,
  },
  time: {
    ...TYPOGRAPHY.tiny,
    color: COLORS.text.ghost,
  },
  input: {
    ...TYPOGRAPHY.caption,
    color: COLORS.text.muted,
    fontStyle: 'italic',
    marginBottom: SPACING.md - 2,
    lineHeight: 20,
  },
  replies: {
    gap: 6,
  },
  replyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.md - 2,
    paddingHorizontal: SPACING.md,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.bg.card,
    borderWidth: 1,
    borderColor: COLORS.border.subtle,
  },
  replyText: {
    ...TYPOGRAPHY.small,
    color: COLORS.text.tertiary,
    flex: 1,
    marginRight: SPACING.md,
  },
  replyAction: {
    fontSize: 14,
  },

  // Empty state
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
