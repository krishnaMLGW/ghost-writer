// Ghost Writer Design System
// Dark futuristic glassmorphism theme

export const COLORS = {
  // Backgrounds
  bg: {
    primary: '#0a0a0f',
    secondary: '#12101f',
    tertiary: '#0d0b18',
    card: 'rgba(255, 255, 255, 0.03)',
    cardHover: 'rgba(255, 255, 255, 0.06)',
    elevated: 'rgba(255, 255, 255, 0.04)',
    input: 'rgba(255, 255, 255, 0.04)',
  },

  // Text
  text: {
    primary: '#ffffff',
    secondary: 'rgba(255, 255, 255, 0.85)',
    tertiary: 'rgba(255, 255, 255, 0.6)',
    muted: 'rgba(255, 255, 255, 0.4)',
    ghost: 'rgba(255, 255, 255, 0.25)',
    disabled: 'rgba(255, 255, 255, 0.15)',
  },

  // Brand
  brand: {
    purple: '#7c3aed',
    purpleLight: '#a855f7',
    purpleSoft: '#c4b5fd',
    purpleGlow: 'rgba(139, 92, 246, 0.15)',
    purpleBorder: 'rgba(139, 92, 246, 0.4)',
  },

  // Accent
  accent: {
    pink: '#ec4899',
    pinkLight: '#f472b6',
    pinkGlow: 'rgba(236, 72, 153, 0.15)',
    blue: '#3b82f6',
    blueLight: '#93c5fd',
    blueGlow: 'rgba(59, 130, 246, 0.1)',
    green: '#22c55e',
    greenLight: '#86efac',
    greenGlow: 'rgba(34, 197, 94, 0.2)',
    red: '#ef4444',
    redLight: '#fca5a5',
    redGlow: 'rgba(239, 68, 68, 0.15)',
    orange: '#f97316',
    orangeLight: '#ffb86c',
    yellow: '#ffd93d',
  },

  // Borders
  border: {
    subtle: 'rgba(255, 255, 255, 0.06)',
    light: 'rgba(255, 255, 255, 0.08)',
    medium: 'rgba(255, 255, 255, 0.1)',
    brand: 'rgba(139, 92, 246, 0.3)',
    brandStrong: 'rgba(139, 92, 246, 0.5)',
  },

  // Gradients (as arrays for LinearGradient)
  gradient: {
    brand: ['#7c3aed', '#a855f7'],
    brandExtended: ['#7c3aed', '#a855f7', '#7c3aed'],
    roast: ['#dc2626', '#f97316'],
    roastExtended: ['#dc2626', '#f97316', '#dc2626'],
    title: ['#ffffff', '#c4b5fd', '#a78bfa'],
    bgMain: ['#0a0a0f', '#12101f', '#0d0b18'],
  },
} as const;

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
} as const;

export const RADIUS = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  full: 999,
} as const;

export const FONTS = {
  // We'll load these via expo-font
  light: 'Outfit_300Light',
  regular: 'Outfit_400Regular',
  medium: 'Outfit_500Medium',
  semibold: 'Outfit_600SemiBold',
  bold: 'Outfit_700Bold',
} as const;

export const TYPOGRAPHY = {
  hero: {
    fontFamily: FONTS.bold,
    fontSize: 32,
    lineHeight: 38,
    letterSpacing: -0.5,
  },
  h1: {
    fontFamily: FONTS.bold,
    fontSize: 28,
    lineHeight: 34,
    letterSpacing: -0.5,
  },
  h2: {
    fontFamily: FONTS.bold,
    fontSize: 22,
    lineHeight: 28,
  },
  h3: {
    fontFamily: FONTS.semibold,
    fontSize: 18,
    lineHeight: 24,
  },
  body: {
    fontFamily: FONTS.regular,
    fontSize: 15,
    lineHeight: 22,
  },
  bodyMedium: {
    fontFamily: FONTS.medium,
    fontSize: 15,
    lineHeight: 22,
  },
  caption: {
    fontFamily: FONTS.medium,
    fontSize: 13,
    lineHeight: 18,
  },
  small: {
    fontFamily: FONTS.regular,
    fontSize: 12,
    lineHeight: 16,
  },
  tiny: {
    fontFamily: FONTS.medium,
    fontSize: 11,
    lineHeight: 14,
  },
  label: {
    fontFamily: FONTS.semibold,
    fontSize: 13,
    lineHeight: 18,
    letterSpacing: 0.3,
    textTransform: 'uppercase' as const,
  },
  button: {
    fontFamily: FONTS.bold,
    fontSize: 17,
    lineHeight: 22,
    letterSpacing: 0.3,
  },
  chip: {
    fontFamily: FONTS.medium,
    fontSize: 13,
    lineHeight: 18,
  },
} as const;

export const SHADOWS = {
  glow: {
    shadowColor: COLORS.brand.purple,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 8,
  },
  glowRoast: {
    shadowColor: COLORS.accent.red,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 8,
  },
  card: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  subtle: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
} as const;
