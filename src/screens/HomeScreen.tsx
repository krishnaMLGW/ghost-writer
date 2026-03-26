import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Haptics from 'expo-haptics';
import { useNavigation } from '@react-navigation/native';
import { COLORS, RADIUS, SPACING, TYPOGRAPHY } from '../constants/theme';
import { RELATIONSHIPS, TONES, ROAST_LEVELS } from '../constants/data';
import { useAppStore } from '../store';
import { GlassCard, Chip, GhostButton, ModeToggle } from '../components';

export function HomeScreen() {
  const navigation = useNavigation<any>();
  const {
    mode,
    inputText,
    setInputText,
    imageUri,
    setImageUri,
    selectedRelationship,
    setSelectedRelationship,
    selectedTone,
    setSelectedTone,
    selectedRoastLevel,
    setSelectedRoastLevel,
  } = useAppStore();

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageBase64, setImageBase64Local] = useState<string | null>(null);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission needed', 'We need access to your photos to import screenshots.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: false,
      quality: 0.8,
      base64: true,
    });

    if (!result.canceled && result.assets[0]) {
      setImageUri(result.assets[0].uri);
      setImagePreview(result.assets[0].uri);
      setImageBase64Local(result.assets[0].base64 || null);
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  };

  const removeImage = () => {
    setImageUri(null);
    setImagePreview(null);
    setImageBase64Local(null);
  };

  const canProceed = mode === 'roast'
    ? (inputText.trim() || imageUri) && selectedRoastLevel
    : (inputText.trim() || imageUri) && selectedRelationship && selectedTone;

  const handleGenerate = () => {
    if (!canProceed) return;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    navigation.navigate('Results', { imageBase64: imageBase64 });
  };

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={90}
    >
      <ScrollView
        style={styles.flex}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <ModeToggle />

        <GlassCard>
          <Text style={styles.label}>
            {mode === 'roast'
              ? 'What are we roasting?'
              : 'Paste the message or describe the situation'}
          </Text>
          <TextInput
            style={styles.textarea}
            placeholder={
              mode === 'roast'
                ? 'Describe the photo or situation to roast...'
                : 'Paste the message you received, or describe what happened...'
            }
            placeholderTextColor={COLORS.text.ghost}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
            value={inputText}
            onChangeText={setInputText}
          />

          <View style={styles.uploadRow}>
            <TouchableOpacity activeOpacity={0.7} onPress={pickImage} style={styles.uploadBtn}>
              <Text style={styles.uploadText}>
                {imagePreview ? '📸 Change Photo' : '📸 Upload Screenshot'}
              </Text>
            </TouchableOpacity>

            {imagePreview && (
              <View style={styles.previewWrap}>
                <Image source={{ uri: imagePreview }} style={styles.preview} />
                <TouchableOpacity onPress={removeImage} style={styles.removeBtn}>
                  <Text style={styles.removeText}>✕</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </GlassCard>

        {mode === 'reply' && (
          <GlassCard>
            <Text style={styles.label}>Who are you talking to?</Text>
            <View style={styles.chipGrid}>
              {RELATIONSHIPS.map((r) => (
                <Chip
                  key={r.id}
                  emoji={r.emoji}
                  label={r.label}
                  selected={selectedRelationship === r.id}
                  onPress={() => {
                    setSelectedRelationship(r.id);
                    Haptics.selectionAsync();
                  }}
                />
              ))}
            </View>
          </GlassCard>
        )}

        <GlassCard>
          <Text style={styles.label}>
            {mode === 'roast' ? 'How hard should we roast?' : 'Pick the vibe'}
          </Text>

          {mode === 'roast' ? (
            <View style={styles.roastGrid}>
              {ROAST_LEVELS.map((r) => (
                <TouchableOpacity
                  key={r.id}
                  activeOpacity={0.7}
                  style={[
                    styles.roastCard,
                    selectedRoastLevel === r.id && styles.roastCardActive,
                  ]}
                  onPress={() => {
                    setSelectedRoastLevel(r.id);
                    Haptics.selectionAsync();
                  }}
                >
                  <Text style={styles.roastEmoji}>{r.emoji}</Text>
                  <Text style={[styles.roastLabel, selectedRoastLevel === r.id && styles.roastLabelActive]}>
                    {r.label}
                  </Text>
                  <Text style={styles.roastDesc}>{r.description}</Text>
                </TouchableOpacity>
              ))}
            </View>
          ) : (
            <View style={styles.chipGrid}>
              {TONES.map((t) => (
                <Chip
                  key={t.id}
                  emoji={t.emoji}
                  label={t.label}
                  selected={selectedTone === t.id}
                  activeColor={t.color}
                  onPress={() => {
                    setSelectedTone(t.id);
                    Haptics.selectionAsync();
                  }}
                />
              ))}
            </View>
          )}
        </GlassCard>

        <GhostButton
          label={mode === 'roast' ? 'Roast Them' : 'Ghost Write It'}
          emoji={mode === 'roast' ? '🔥' : '👻'}
          variant={mode === 'roast' ? 'roast' : 'brand'}
          disabled={!canProceed}
          onPress={handleGenerate}
        />

        <UsageIndicator />

        <View style={{ height: 30 }} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

function UsageIndicator() {
  const { dailyUsage, isPro } = useAppStore();

  if (isPro) return null;

  const remaining = Math.max(0, 3 - dailyUsage);

  return (
    <View style={styles.usageContainer}>
      <Text style={styles.usageText}>
        {remaining > 0
          ? `${remaining} free ghost writes left today`
          : 'Daily limit reached \u2014 Upgrade to Pro \u2728'}
      </Text>
      <View style={styles.usageDots}>
        {[0, 1, 2].map((i) => (
          <View key={i} style={[styles.usageDot, i < dailyUsage && styles.usageDotUsed]} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  scrollContent: { padding: SPACING.xl, paddingTop: SPACING.sm },
  label: {
    ...TYPOGRAPHY.label,
    color: COLORS.text.tertiary,
    marginBottom: SPACING.md,
  },
  textarea: {
    backgroundColor: COLORS.bg.input,
    borderWidth: 1,
    borderColor: COLORS.border.light,
    borderRadius: RADIUS.md + 2,
    paddingVertical: SPACING.md + 2,
    paddingHorizontal: SPACING.lg,
    color: COLORS.text.primary,
    ...TYPOGRAPHY.body,
    minHeight: 100,
  },
  uploadRow: { flexDirection: 'row', alignItems: 'center', gap: SPACING.md, marginTop: SPACING.md },
  uploadBtn: {
    paddingVertical: SPACING.md - 2,
    paddingHorizontal: SPACING.lg + 2,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.bg.cardHover,
    borderWidth: 1,
    borderColor: COLORS.border.medium,
  },
  uploadText: { ...TYPOGRAPHY.caption, color: COLORS.text.tertiary },
  previewWrap: {
    width: 48,
    height: 48,
    borderRadius: RADIUS.md,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLORS.brand.purpleBorder,
    position: 'relative',
  },
  preview: { width: '100%', height: '100%' },
  removeBtn: {
    position: 'absolute',
    top: -2,
    right: -2,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: COLORS.accent.red,
    alignItems: 'center',
    justifyContent: 'center',
  },
  removeText: { color: '#fff', fontSize: 10, fontWeight: '700' },
  chipGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: SPACING.sm },
  roastGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: SPACING.md - 2 },
  roastCard: {
    width: '48%',
    alignItems: 'center',
    gap: 4,
    paddingVertical: SPACING.lg,
    paddingHorizontal: SPACING.md,
    borderRadius: RADIUS.lg,
    backgroundColor: COLORS.bg.card,
    borderWidth: 1,
    borderColor: COLORS.border.subtle,
  },
  roastCardActive: { backgroundColor: COLORS.accent.redGlow, borderColor: 'rgba(239, 68, 68, 0.4)' },
  roastEmoji: { fontSize: 28 },
  roastLabel: { ...TYPOGRAPHY.caption, fontWeight: '600', color: COLORS.text.muted },
  roastLabelActive: { color: COLORS.accent.redLight },
  roastDesc: { ...TYPOGRAPHY.tiny, color: COLORS.text.ghost },
  usageContainer: { alignItems: 'center', marginTop: SPACING.lg, gap: SPACING.sm },
  usageText: { ...TYPOGRAPHY.small, color: COLORS.text.ghost },
  usageDots: { flexDirection: 'row', gap: 6 },
  usageDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.brand.purpleGlow,
    borderWidth: 1,
    borderColor: COLORS.brand.purpleBorder,
  },
  usageDotUsed: { backgroundColor: COLORS.brand.purple },
});
