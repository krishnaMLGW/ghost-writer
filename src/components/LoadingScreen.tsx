import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Animated, Easing } from 'react-native';
import { COLORS, TYPOGRAPHY } from '../constants/theme';
import { useAppStore } from '../store';

const REPLY_MESSAGES = ['Reading the room...', 'Crafting the perfect reply...', 'Adding a touch of magic...', 'Almost there...'];
const ROAST_MESSAGES = ['Sharpening the roast knives...', 'Finding their weak spots...', 'Channeling pure savagery...', 'This is gonna hurt...'];

export function LoadingScreen() {
  const { mode } = useAppStore();
  const messages = mode === 'roast' ? ROAST_MESSAGES : REPLY_MESSAGES;
  const [msgIndex, setMsgIndex] = useState(0);
  const floatAnim = React.useRef(new Animated.Value(0)).current;
  const pulseAnim = React.useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, { toValue: -15, duration: 1200, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
        Animated.timing(floatAnim, { toValue: 0, duration: 1200, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
      ])
    ).start();
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, { toValue: 1.3, duration: 1500, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
        Animated.timing(pulseAnim, { toValue: 1, duration: 1500, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
      ])
    ).start();
    const interval = setInterval(() => { setMsgIndex((i) => (i + 1) % messages.length); }, 1800);
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.pulse, { transform: [{ scale: pulseAnim }] }]} />
      <Animated.Text style={[styles.ghost, { transform: [{ translateY: floatAnim }] }]}>👻</Animated.Text>
      <Text style={styles.message}>{messages[msgIndex]}</Text>
      <View style={styles.dots}>
        <View style={styles.dot} />
        <View style={styles.dot} />
        <View style={styles.dot} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 20, paddingBottom: 100 },
  ghost: { fontSize: 72 },
  pulse: { position: 'absolute', width: 100, height: 100, borderRadius: 50, backgroundColor: COLORS.brand.purpleGlow },
  message: { ...TYPOGRAPHY.body, color: COLORS.text.tertiary, textAlign: 'center', minHeight: 24 },
  dots: { flexDirection: 'row', gap: 8 },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#a78bfa' },
});
