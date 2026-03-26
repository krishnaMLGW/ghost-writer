import React, { useCallback, useState, useEffect } from 'react';
import { StyleSheet, StatusBar } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from 'expo-font';
import {
  Outfit_300Light,
  Outfit_400Regular,
  Outfit_500Medium,
  Outfit_600SemiBold,
  Outfit_700Bold,
} from '@expo-google-fonts/outfit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppNavigator } from './src/navigation';
import { OnboardingScreen } from './src/screens';
import { COLORS } from './src/constants/theme';

SplashScreen.preventAutoHideAsync();

const ONBOARDING_KEY = 'ghost_writer_onboarded';

export default function App() {
  const [fontsLoaded] = useFonts({
    Outfit_300Light,
    Outfit_400Regular,
    Outfit_500Medium,
    Outfit_600SemiBold,
    Outfit_700Bold,
  });

  const [showOnboarding, setShowOnboarding] = useState<boolean | null>(null);

  useEffect(() => {
    AsyncStorage.getItem(ONBOARDING_KEY).then((value) => {
      setShowOnboarding(value !== 'true');
    });
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded && showOnboarding !== null) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, showOnboarding]);

  if (!fontsLoaded || showOnboarding === null) {
    return null;
  }

  const handleOnboardingComplete = async () => {
    await AsyncStorage.setItem(ONBOARDING_KEY, 'true');
    setShowOnboarding(false);
  };

  if (showOnboarding) {
    return (
      <SafeAreaProvider style={styles.root} onLayout={onLayoutRootView}>
        <StatusBar barStyle="light-content" backgroundColor={COLORS.bg.primary} />
        <OnboardingScreen onComplete={handleOnboardingComplete} />
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider style={styles.root} onLayout={onLayoutRootView}>
      <StatusBar barStyle="light-content" backgroundColor={COLORS.bg.primary} />
      <AppNavigator />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: COLORS.bg.primary,
  },
});
