import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Share,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS, SPACING, TYPOGRAPHY, RADIUS } from '../constants/theme';
import { AI_PROVIDERS, type AIProvider } from '../constants/data';
import { useAppStore } from '../store';

export function SettingsScreen() {
  const { aiProvider, setAIProvider, isPro, setIsPro, dailyUsage, history } =
    useAppStore();

  const handleShare = async () => {
    try {
      await Share.share({
        message: 'Check out Ghost Writer - it writes the perfect reply for any conversation! Download it now.',
      });
    } catch (e) {}
  };

  const handleResetStorage = () => {
    Alert.alert(
      'Reset App Data',
      'This will clear all history, favorites, and settings. Are you sure?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reset',
          style: 'destructive',
          onPress: async () => {
            await AsyncStorage.clear();
            Alert.alert('Done', 'App data cleared. Restart the app to see changes.');
          },
        },
      ]
    );
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.title}>Settings</Text>

      <View style={styles.card}>
        <View style={styles.proHeader}>
          <Text style={styles.proTitle}>
            {isPro ? 'Ghost Writer Pro' : 'Free Plan'}
          </Text>
          {!isPro && (
            <TouchableOpacity style={styles.upgradeBtn}>
              <Text style={styles.upgradeBtnText}>Upgrade</Text>
            </TouchableOpacity>
          )}
        </View>
        <Text style={styles.proDesc}>
          {isPro
            ? 'Unlimited ghost writes. You are a legend.'
            : `${Math.max(0, 3 - dailyUsage)} free writes left today`}
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>AI Provider</Text>
        <Text style={styles.sectionDesc}>
          Choose which AI powers your replies
        </Text>
        <View style={styles.providerGrid}>
          {AI_PROVIDERS.map((provider) => (
            <TouchableOpacity
              key={provider.id}
              activeOpacity={0.7}
              style={[
                styles.providerCard,
                aiProvider === provider.id && styles.providerCardActive,
              ]}
              onPress={() => setAIProvider(provider.id as AIProvider)}
            >
              <Text style={styles.providerEmoji}>{provider.emoji}</Text>
              <Text
                style={[
                  styles.providerLabel,
                  aiProvider === provider.id && styles.providerLabelActive,
                ]}
              >
                {provider.label}
              </Text>
              <Text style={styles.providerDesc}>{provider.description}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Your Stats</Text>
        <View style={styles.statsGrid}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{history.length}</Text>
            <Text style={styles.statLabel}>Total Writes</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{dailyUsage}</Text>
            <Text style={styles.statLabel}>Today</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>
              {history.filter((h) => h.mode === 'roast').length}
            </Text>
            <Text style={styles.statLabel}>Roasts</Text>
          </View>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>About</Text>
        {[
          { label: 'Share with Friends', action: handleShare },
          { label: 'Privacy Policy', action: () => {} },
          { label: 'Terms of Service', action: () => {} },
          {
            label: 'Restore Purchases',
            action: () => Alert.alert('Restore', 'No previous purchases found.'),
          },
          {
            label: 'Reset App Data',
            action: handleResetStorage,
          },
        ].map((link, i) => (
          <TouchableOpacity
            key={i}
            activeOpacity={0.7}
            style={styles.linkRow}
            onPress={link.action}
          >
            <Text style={[
              styles.linkText,
              link.label === 'Reset App Data' && { color: COLORS.accent.redLight }
            ]}>{link.label}</Text>
            <Text style={styles.linkArrow}>&rsaquo;</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.version}>Ghost Writer v1.0.0</Text>
      <Text style={styles.credit}>Made with love and coffee</Text>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: SPACING.xl },
  title: { ...TYPOGRAPHY.h2, color: COLORS.text.primary, marginBottom: SPACING.lg },
  card: {
    backgroundColor: COLORS.bg.card, borderWidth: 1, borderColor: COLORS.border.subtle,
    borderRadius: RADIUS.xl, padding: SPACING.lg + 2, marginBottom: SPACING.md + 2,
  },
  proHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: SPACING.sm },
  proTitle: { ...TYPOGRAPHY.h3, color: COLORS.text.primary },
  upgradeBtn: {
    paddingVertical: SPACING.sm - 2, paddingHorizontal: SPACING.md + 2,
    borderRadius: RADIUS.full, backgroundColor: COLORS.brand.purpleGlow,
    borderWidth: 1, borderColor: COLORS.brand.purpleBorder,
  },
  upgradeBtnText: { ...TYPOGRAPHY.caption, fontWeight: '600', color: COLORS.brand.purpleSoft },
  proDesc: { ...TYPOGRAPHY.caption, color: COLORS.text.muted },
  sectionTitle: { ...TYPOGRAPHY.h3, color: COLORS.text.primary, marginBottom: 4 },
  sectionDesc: { ...TYPOGRAPHY.caption, color: COLORS.text.ghost, marginBottom: SPACING.md },
  providerGrid: { flexDirection: 'row', gap: SPACING.md },
  providerCard: {
    flex: 1, alignItems: 'center', gap: 4, paddingVertical: SPACING.lg,
    borderRadius: RADIUS.lg, backgroundColor: COLORS.bg.elevated,
    borderWidth: 1, borderColor: COLORS.border.subtle,
  },
  providerCardActive: { backgroundColor: COLORS.brand.purpleGlow, borderColor: COLORS.brand.purpleBorder },
  providerEmoji: { fontSize: 24 },
  providerLabel: { ...TYPOGRAPHY.bodyMedium, color: COLORS.text.muted },
  providerLabelActive: { color: COLORS.brand.purpleSoft },
  providerDesc: { ...TYPOGRAPHY.tiny, color: COLORS.text.ghost },
  statsGrid: { flexDirection: 'row', marginTop: SPACING.md },
  statItem: { flex: 1, alignItems: 'center', gap: 4 },
  statNumber: { ...TYPOGRAPHY.h2, color: COLORS.brand.purpleSoft },
  statLabel: { ...TYPOGRAPHY.tiny, color: COLORS.text.ghost },
  linkRow: {
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    paddingVertical: SPACING.md, borderBottomWidth: 1, borderBottomColor: COLORS.border.subtle,
  },
  linkText: { ...TYPOGRAPHY.body, color: COLORS.text.tertiary },
  linkArrow: { fontSize: 20, color: COLORS.text.ghost },
  version: { ...TYPOGRAPHY.small, color: COLORS.text.ghost, textAlign: 'center', marginTop: SPACING.xl },
  credit: { ...TYPOGRAPHY.small, color: COLORS.text.disabled, textAlign: 'center', marginTop: SPACING.xs },
});
