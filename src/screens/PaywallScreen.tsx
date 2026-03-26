import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

import { COLORS, SPACING, TYPOGRAPHY, RADIUS, SHADOWS } from '../constants/theme';
import { useAppStore } from '../store';

const FEATURES = [
  { emoji: '♾️', text: 'Unlimited ghost writes' },
  { emoji: '🔥', text: 'Unlimited roasts' },
  { emoji: '🤖', text: 'Choose Claude or GPT' },
  { emoji: '⚡', text: 'Priority generation speed' },
  { emoji: '📸', text: 'Screenshot OCR analysis' },
  { emoji: '💜', text: 'Support indie development' },
];

export function PaywallScreen() {
  const navigation = useNavigation<any>();
  const { setIsPro } = useAppStore();
  const [selectedPlan, setSelectedPlan] = useState<'weekly' | 'yearly'>('yearly');

  const handlePurchase = () => {
    // TODO: Integrate RevenueCat
    Alert.alert(
      'Purchase',
      'RevenueCat integration coming soon! For now, enabling Pro mode.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Enable Pro',
          onPress: () => {
            setIsPro(true);
            navigation.goBack();
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      {/* Close Button */}
      <TouchableOpacity
        style={styles.closeBtn}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.closeText}>✕</Text>
      </TouchableOpacity>

      {/* Hero */}
      <View style={styles.hero}>
        <Text style={styles.heroEmoji}>👻</Text>
        <Text style={styles.heroTitle}>Ghost Writer Pro</Text>
        <Text style={styles.heroSubtitle}>
          Unlock unlimited ghost writes and roasts
        </Text>
      </View>

      {/* Features */}
      <View style={styles.features}>
        {FEATURES.map((feature, i) => (
          <View key={i} style={styles.featureRow}>
            <Text style={styles.featureEmoji}>{feature.emoji}</Text>
            <Text style={styles.featureText}>{feature.text}</Text>
          </View>
        ))}
      </View>

      {/* Plan Selection */}
      <View style={styles.plans}>
        {/* Yearly */}
        <TouchableOpacity
          activeOpacity={0.8}
          style={[styles.planCard, selectedPlan === 'yearly' && styles.planCardActive]}
          onPress={() => setSelectedPlan('yearly')}
        >
          <View style={styles.planBadge}>
            <Text style={styles.planBadgeText}>BEST VALUE</Text>
          </View>
          <View style={styles.planInfo}>
            <Text style={[styles.planTitle, selectedPlan === 'yearly' && styles.planTitleActive]}>
              Yearly
            </Text>
            <Text style={styles.planPrice}>$29.99/year</Text>
          </View>
          <Text style={styles.planSaving}>Save 88%</Text>
        </TouchableOpacity>

        {/* Weekly */}
        <TouchableOpacity
          activeOpacity={0.8}
          style={[styles.planCard, selectedPlan === 'weekly' && styles.planCardActive]}
          onPress={() => setSelectedPlan('weekly')}
        >
          <View style={styles.planInfo}>
            <Text style={[styles.planTitle, selectedPlan === 'weekly' && styles.planTitleActive]}>
              Weekly
            </Text>
            <Text style={styles.planPrice}>$4.99/week</Text>
          </View>
          <Text style={styles.planTrial}>3-day free trial</Text>
        </TouchableOpacity>
      </View>

      {/* CTA */}
      <View>
        <TouchableOpacity activeOpacity={0.8} onPress={handlePurchase}>
          <LinearGradient
            colors={COLORS.gradient.brand as any}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.ctaBtn}
          >
            <Text style={styles.ctaText}>
              {selectedPlan === 'weekly' ? 'Start Free Trial' : 'Subscribe Now'}
            </Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.restoreBtn}
          onPress={() => Alert.alert('Restored', 'No previous purchases found.')}
        >
          <Text style={styles.restoreText}>Restore Purchases</Text>
        </TouchableOpacity>

        <Text style={styles.legal}>
          Payment will be charged to your App Store account. Subscription
          automatically renews unless cancelled at least 24 hours before the end
          of the current period.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg.primary,
    padding: SPACING.xxl,
    paddingTop: 60,
  },
  closeBtn: {
    position: 'absolute',
    top: 56,
    right: 20,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.bg.cardHover,
    borderWidth: 1,
    borderColor: COLORS.border.light,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  closeText: {
    color: COLORS.text.muted,
    fontSize: 16,
  },
  hero: {
    alignItems: 'center',
    marginBottom: SPACING.xxl,
  },
  heroEmoji: {
    fontSize: 56,
    marginBottom: SPACING.md,
  },
  heroTitle: {
    ...TYPOGRAPHY.h1,
    color: COLORS.text.primary,
  },
  heroSubtitle: {
    ...TYPOGRAPHY.body,
    color: COLORS.text.muted,
    marginTop: SPACING.sm,
  },
  features: {
    marginBottom: SPACING.xxl,
    gap: SPACING.md,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.md,
  },
  featureEmoji: {
    fontSize: 20,
    width: 28,
    textAlign: 'center',
  },
  featureText: {
    ...TYPOGRAPHY.body,
    color: COLORS.text.secondary,
  },
  plans: {
    gap: SPACING.md,
    marginBottom: SPACING.xxl,
  },
  planCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: SPACING.lg,
    borderRadius: RADIUS.lg,
    backgroundColor: COLORS.bg.card,
    borderWidth: 1.5,
    borderColor: COLORS.border.subtle,
    position: 'relative',
    overflow: 'hidden',
  },
  planCardActive: {
    borderColor: COLORS.brand.purpleBorder,
    backgroundColor: COLORS.brand.purpleGlow,
  },
  planBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: COLORS.brand.purple,
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderBottomLeftRadius: RADIUS.sm,
  },
  planBadgeText: {
    ...TYPOGRAPHY.tiny,
    color: '#fff',
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  planInfo: {
    gap: 2,
  },
  planTitle: {
    ...TYPOGRAPHY.bodyMedium,
    color: COLORS.text.muted,
  },
  planTitleActive: {
    color: COLORS.text.primary,
  },
  planPrice: {
    ...TYPOGRAPHY.h3,
    color: COLORS.text.primary,
  },
  planSaving: {
    ...TYPOGRAPHY.caption,
    fontWeight: '600',
    color: COLORS.accent.greenLight,
  },
  planTrial: {
    ...TYPOGRAPHY.caption,
    color: COLORS.text.muted,
  },
  ctaBtn: {
    paddingVertical: SPACING.lg + 2,
    borderRadius: RADIUS.lg + 2,
    alignItems: 'center',
    ...SHADOWS.glow,
  },
  ctaText: {
    ...TYPOGRAPHY.button,
    color: '#fff',
  },
  restoreBtn: {
    alignItems: 'center',
    paddingVertical: SPACING.md,
  },
  restoreText: {
    ...TYPOGRAPHY.caption,
    color: COLORS.text.ghost,
  },
  legal: {
    ...TYPOGRAPHY.tiny,
    color: COLORS.text.disabled,
    textAlign: 'center',
    lineHeight: 16,
    marginTop: SPACING.sm,
  },
});
