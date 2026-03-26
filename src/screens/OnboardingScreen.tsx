import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS, SPACING, TYPOGRAPHY, RADIUS } from '../constants/theme';

const { width } = Dimensions.get('window');

const SLIDES = [
  {
    id: '1',
    emoji: '👻',
    title: 'Never Get Stuck\non a Reply Again',
    subtitle: 'Ghost Writer crafts the perfect response for any conversation — friends, family, crushes, coworkers, or exes.',
  },
  {
    id: '2',
    emoji: '🎭',
    title: 'Pick Your Vibe,\nGet 3 Options',
    subtitle: 'Choose who you are talking to and the tone you want — funny, savage, flirty, professional, Gen-Z — and get replies ready to send.',
  },
  {
    id: '3',
    emoji: '🔥',
    title: 'Roast Mode\nfor Group Chats',
    subtitle: 'Upload a photo or describe a situation and get hilarious roast captions from light tease to total obliteration.',
  },
];

interface OnboardingScreenProps {
  onComplete: () => void;
}

export function OnboardingScreen({ onComplete }: OnboardingScreenProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const handleNext = () => {
    if (activeIndex < SLIDES.length - 1) {
      flatListRef.current?.scrollToIndex({ index: activeIndex + 1 });
      setActiveIndex(activeIndex + 1);
    } else {
      onComplete();
    }
  };

  const handleSkip = () => {
    onComplete();
  };

  const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      setActiveIndex(viewableItems[0].index);
    }
  }).current;

  const viewabilityConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const renderSlide = ({ item }: { item: typeof SLIDES[0] }) => (
    <View style={styles.slide}>
      <Text style={styles.slideEmoji}>{item.emoji}</Text>
      <Text style={styles.slideTitle}>{item.title}</Text>
      <Text style={styles.slideSubtitle}>{item.subtitle}</Text>
    </View>
  );

  const isLast = activeIndex === SLIDES.length - 1;

  return (
    <View style={styles.container}>
      {/* Skip button */}
      {!isLast && (
        <TouchableOpacity style={styles.skipBtn} onPress={handleSkip}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      )}

      {/* Slides */}
      <FlatList
        ref={flatListRef}
        data={SLIDES}
        renderItem={renderSlide}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        style={styles.flatList}
      />

      {/* Dots */}
      <View style={styles.dots}>
        {SLIDES.map((_, i) => (
          <View
            key={i}
            style={[
              styles.dot,
              i === activeIndex && styles.dotActive,
            ]}
          />
        ))}
      </View>

      {/* CTA Button */}
      <TouchableOpacity activeOpacity={0.8} onPress={handleNext}>
        <LinearGradient
          colors={COLORS.gradient.brand as any}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.ctaBtn}
        >
          <Text style={styles.ctaText}>
            {isLast ? "Let's Go 👻" : 'Next'}
          </Text>
        </LinearGradient>
      </TouchableOpacity>

      <View style={{ height: Platform.OS === 'ios' ? 40 : 20 }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg.primary,
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
  },
  skipBtn: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 60 : 40,
    right: 24,
    zIndex: 10,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  skipText: {
    ...TYPOGRAPHY.caption,
    color: COLORS.text.muted,
  },
  flatList: {
    flex: 1,
  },
  slide: {
    width,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  slideEmoji: {
    fontSize: 80,
    marginBottom: 32,
  },
  slideTitle: {
    ...TYPOGRAPHY.h1,
    color: COLORS.text.primary,
    textAlign: 'center',
    lineHeight: 36,
    marginBottom: 16,
  },
  slideSubtitle: {
    ...TYPOGRAPHY.body,
    color: COLORS.text.muted,
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 10,
  },
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 32,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.border.medium,
  },
  dotActive: {
    width: 24,
    backgroundColor: COLORS.brand.purple,
  },
  ctaBtn: {
    marginHorizontal: 24,
    paddingVertical: 18,
    borderRadius: RADIUS.lg + 2,
    alignItems: 'center',
  },
  ctaText: {
    ...TYPOGRAPHY.button,
    color: '#fff',
  },
});
