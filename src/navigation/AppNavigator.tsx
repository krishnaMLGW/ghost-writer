import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { COLORS, TYPOGRAPHY } from '../constants/theme';
import {
  HomeScreen,
  ResultsScreen,
  HistoryScreen,
  FavoritesScreen,
  SettingsScreen,
  PaywallScreen,
} from '../screens';
import type { RootStackParamList, TabParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

const MyTheme = {
  ...DefaultTheme,
  dark: true,
  colors: {
    ...DefaultTheme.colors,
    primary: COLORS.brand.purple,
    background: COLORS.bg.primary,
    card: COLORS.bg.primary,
    text: COLORS.text.primary,
    border: COLORS.border.subtle,
    notification: COLORS.accent.red,
  },
};

function TabIcon({ emoji, focused }: { emoji: string; focused: boolean }) {
  return (
    <View style={[styles.tabIcon, focused && styles.tabIconActive]}>
      <Text style={{ fontSize: 20 }}>{emoji}</Text>
    </View>
  );
}

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: COLORS.bg.primary,
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTitle: () => (
          <View style={styles.headerTitle}>
            <Text style={{ fontSize: 22 }}>👻</Text>
            <Text style={styles.headerTitleText}>Ghost Writer</Text>
          </View>
        ),
        tabBarStyle: {
          backgroundColor: 'rgba(10, 10, 15, 0.95)',
          borderTopWidth: 1,
          borderTopColor: COLORS.border.subtle,
          height: Platform.OS === 'ios' ? 88 : 68,
          paddingBottom: Platform.OS === 'ios' ? 28 : 10,
          paddingTop: 8,
        },
        tabBarActiveTintColor: COLORS.brand.purpleSoft,
        tabBarInactiveTintColor: COLORS.text.ghost,
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarIcon: ({ focused }) => <TabIcon emoji="👻" focused={focused} /> }} />
      <Tab.Screen name="History" component={HistoryScreen} options={{ tabBarIcon: ({ focused }) => <TabIcon emoji="📜" focused={focused} /> }} />
      <Tab.Screen name="Favorites" component={FavoritesScreen} options={{ tabBarIcon: ({ focused }) => <TabIcon emoji="♥" focused={focused} /> }} />
      <Tab.Screen name="Settings" component={SettingsScreen} options={{ tabBarIcon: ({ focused }) => <TabIcon emoji="⚙️" focused={focused} /> }} />
    </Tab.Navigator>
  );
}

export function AppNavigator() {
  return (
    <NavigationContainer theme={MyTheme}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: COLORS.bg.primary },
          animation: 'slide_from_right',
        }}
      >
        <Stack.Screen name="MainTabs" component={MainTabs} />
        <Stack.Screen
          name="Results"
          component={ResultsScreen}
          options={{
            headerShown: true,
            headerTitle: '',
            headerBackTitle: 'Back',
            headerStyle: { backgroundColor: COLORS.bg.primary },
            headerTintColor: COLORS.brand.purpleSoft,
          }}
        />
        <Stack.Screen
          name="Paywall"
          component={PaywallScreen}
          options={{
            presentation: 'modal',
            animation: 'slide_from_bottom',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  headerTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerTitleText: {
    ...TYPOGRAPHY.h3,
    color: COLORS.text.primary,
    letterSpacing: -0.3,
  },
  tabIcon: {
    width: 36,
    height: 36,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabIconActive: {
    backgroundColor: COLORS.brand.purpleGlow,
  },
});
