import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import * as Haptics from 'expo-haptics';
import { useNavigation, useRoute } from '@react-navigation/native';
import { COLORS, SPACING, TYPOGRAPHY, RADIUS } from '../constants/theme';
import { useAppStore } from '../store';
import { generateReplies } from '../services/ai';
import { ReplyCard, LoadingScreen } from '../components';


export function ResultsScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const imageBase64 = route.params?.imageBase64 || null;
  const [error, setError] = useState<string | null>(null);
  const {
    mode,
    inputText,
    imageUri,
    selectedRelationship,
    selectedTone,
    selectedRoastLevel,
    replies,
    setReplies,
    isLoading,
    setIsLoading,
    aiProvider,
    addToHistory,
    resetSession,
  } = useAppStore();

  const fetchReplies = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await generateReplies({
        mode,
        inputText,
        relationship: selectedRelationship || undefined,
        tone: selectedTone || undefined,
        roastLevel: selectedRoastLevel || undefined,
        hasImage: !!imageUri,
        imageBase64: imageBase64 || undefined,
        provider: aiProvider,
      });

      setReplies(result);

      addToHistory({
        mode,
        input: inputText,
        imageUri: imageUri || undefined,
        relationship: selectedRelationship || undefined,
        tone: selectedTone || undefined,
        roastLevel: selectedRoastLevel || undefined,
        replies: result,
        aiProvider,
      });
    } catch (err: any) {
      console.error('Generation error:', err);
      const code = err?.message?.match(/\d+/)?.[0];
      if (code === '401') {
        setError('Invalid API key. Check your settings.');
      } else if (code === '429') {
        setError('Rate limit hit. Wait a moment and try again.');
      } else if (code === '500' || code === '503') {
        setError('AI service is temporarily down. Try again in a moment.');
      } else {
        setError('Something went wrong. Check your connection and try again.');
      }
      setReplies([]);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchReplies();
  }, []);

  const handleRegenerate = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    fetchReplies();
  };

  const handleChangeVibe = () => {
    navigation.goBack();
  };

  const handleNewMessage = () => {
    resetSession();
    navigation.goBack();
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <LoadingScreen />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorEmoji}>😅</Text>
        <Text style={styles.errorTitle}>Oops!</Text>
        <Text style={styles.errorMessage}>{error}</Text>
        <TouchableOpacity style={styles.retryBtnLarge} onPress={handleRegenerate}>
          <Text style={styles.retryBtnLargeText}>🔄 Try Again</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.backBtn} onPress={handleChangeVibe}>
          <Text style={styles.backBtnText}>← Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <Text style={styles.title}>
          {mode === 'roast' ? '🔥 Choose Your Weapon' : '👻 Pick Your Reply'}
        </Text>
        <Text style={styles.subtitle}>Tap to copy, then paste it in your chat</Text>
        <View style={styles.providerBadge}>
          <Text style={styles.providerText}>
            {aiProvider === 'claude' ? '🟣 Claude' : '🟢 GPT'}
          </Text>
        </View>
      </View>

      {replies.map((reply, i) => (
        <ReplyCard key={`${reply}-${i}`} text={reply} index={i} />
      ))}

      <View style={styles.actions}>
        <TouchableOpacity activeOpacity={0.7} onPress={handleRegenerate} style={styles.actionBtn}>
          <Text style={styles.actionText}>🔄 Regenerate</Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.7} onPress={handleChangeVibe} style={[styles.actionBtn, styles.actionBtnBrand]}>
          <Text style={[styles.actionText, styles.actionTextBrand]}>🎨 Change Vibe</Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.7} onPress={handleNewMessage} style={[styles.actionBtn, styles.actionBtnBlue]}>
          <Text style={[styles.actionText, styles.actionTextBlue]}>✨ New</Text>
        </TouchableOpacity>
      </View>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  loadingContainer: { flex: 1 },
  content: { padding: SPACING.xl },
  header: { alignItems: 'center', marginBottom: SPACING.xl },
  title: { ...TYPOGRAPHY.h2, color: COLORS.text.primary },
  subtitle: { ...TYPOGRAPHY.caption, color: COLORS.text.muted, marginTop: 6 },
  providerBadge: {
    marginTop: 10, paddingVertical: 4, paddingHorizontal: 12,
    borderRadius: RADIUS.full, backgroundColor: COLORS.bg.elevated,
    borderWidth: 1, borderColor: COLORS.border.light,
  },
  providerText: { ...TYPOGRAPHY.tiny, color: COLORS.text.muted },
  actions: { flexDirection: 'row', gap: SPACING.sm, marginTop: SPACING.sm },
  actionBtn: {
    flex: 1, paddingVertical: SPACING.md + 1, paddingHorizontal: SPACING.md,
    borderRadius: RADIUS.md + 2, backgroundColor: COLORS.bg.cardHover,
    borderWidth: 1, borderColor: COLORS.border.light, alignItems: 'center',
  },
  actionBtnBrand: { backgroundColor: COLORS.brand.purpleGlow, borderColor: 'rgba(139, 92, 246, 0.25)' },
  actionBtnBlue: { backgroundColor: COLORS.accent.blueGlow, borderColor: 'rgba(59, 130, 246, 0.25)' },
  actionText: { ...TYPOGRAPHY.caption, fontWeight: '600', color: COLORS.text.tertiary },
  actionTextBrand: { color: COLORS.brand.purpleSoft },
  actionTextBlue: { color: COLORS.accent.blueLight },
  errorContainer: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: SPACING.xxl, gap: 12 },
  errorEmoji: { fontSize: 56 },
  errorTitle: { ...TYPOGRAPHY.h2, color: COLORS.text.primary },
  errorMessage: { ...TYPOGRAPHY.body, color: COLORS.text.muted, textAlign: 'center', lineHeight: 22 },
  retryBtnLarge: {
    marginTop: 12, paddingVertical: 14, paddingHorizontal: 32,
    borderRadius: RADIUS.lg, backgroundColor: COLORS.brand.purpleGlow,
    borderWidth: 1, borderColor: COLORS.brand.purpleBorder,
  },
  retryBtnLargeText: { ...TYPOGRAPHY.bodyMedium, color: COLORS.brand.purpleSoft },
  backBtn: { paddingVertical: 10 },
  backBtnText: { ...TYPOGRAPHY.caption, color: COLORS.text.ghost },
});
