# 👻 Ghost Writer

**Your secret weapon for every conversation.**

Ghost Writer is a mobile app that uses AI to craft the perfect reply for any social situation. Whether you need a witty comeback, a professional email response, a flirty text, or a devastating roast — Ghost Writer has you covered.

## Features

- **💬 Reply Mode** — Paste a message, pick who you're talking to and the vibe you want, get 3 perfect replies
- **🔥 Roast Mode** — Upload a photo or describe a situation, choose intensity, get savage roast captions
- **📸 Screenshot Import** — Upload conversation screenshots for context
- **📜 History** — All your past generations saved and searchable
- **♥ Favorites** — Save your best replies for reuse
- **🤖 Dual AI** — Choose between Claude (Anthropic) or GPT (OpenAI)
- **💰 Freemium** — 3 free writes/day, unlimited with Pro subscription

## Tech Stack

- **React Native** with Expo SDK 52
- **TypeScript** for type safety
- **Zustand** for state management
- **React Navigation** for navigation (bottom tabs + stack)
- **Reanimated 3** for smooth animations
- **Expo Image Picker** for photo import
- **Expo Clipboard** for one-tap copy
- **Expo Haptics** for tactile feedback
- **expo-linear-gradient** for gradient effects

## Getting Started

### Prerequisites
- Node.js 18+
- Expo CLI (`npm install -g expo-cli`)
- iOS Simulator (Mac) or Android Emulator

### Setup

1. **Clone and install:**
```bash
cd ghost-writer
npm install
```

2. **Download Outfit font files:**
Download the Outfit font family from Google Fonts (https://fonts.google.com/specimen/Outfit) and place the following files in `assets/fonts/`:
- `Outfit-Light.ttf`
- `Outfit-Regular.ttf`
- `Outfit-Medium.ttf`
- `Outfit-SemiBold.ttf`
- `Outfit-Bold.ttf`

3. **Configure API keys:**
Open `src/screens/ResultsScreen.tsx` and replace `YOUR_API_KEY_HERE` with your API key.

⚠️ **IMPORTANT:** For production, never ship API keys in the app. Set up a backend proxy instead. See the commented code in `src/services/ai.ts`.

4. **Run the app:**
```bash
npx expo start
```

Then press `i` for iOS simulator or `a` for Android emulator.

## Project Structure

```
ghost-writer/
├── App.tsx                    # Entry point, font loading
├── app.json                   # Expo config
├── assets/
│   └── fonts/                 # Outfit font files
├── src/
│   ├── components/            # Reusable UI components
│   │   ├── Chip.tsx           # Selectable pill buttons
│   │   ├── GhostButton.tsx    # Main CTA with gradient
│   │   ├── GlassCard.tsx      # Glassmorphism card
│   │   ├── LoadingScreen.tsx  # Animated ghost loader
│   │   ├── ModeToggle.tsx     # Reply/Roast switch
│   │   └── ReplyCard.tsx      # Result card with copy/fav
│   ├── constants/
│   │   ├── data.ts            # Relationships, tones, roast levels
│   │   └── theme.ts           # Colors, typography, spacing
│   ├── navigation/
│   │   ├── AppNavigator.tsx   # Tab + stack navigation
│   │   └── types.ts           # Navigation types
│   ├── screens/
│   │   ├── HomeScreen.tsx     # Main input screen
│   │   ├── ResultsScreen.tsx  # AI-generated replies
│   │   ├── HistoryScreen.tsx  # Past generations
│   │   ├── FavoritesScreen.tsx# Saved replies
│   │   ├── SettingsScreen.tsx # AI provider, stats, links
│   │   └── PaywallScreen.tsx  # Subscription upsell
│   ├── services/
│   │   ├── ai.ts              # Claude + OpenAI API calls
│   │   └── prompts.ts         # Prompt engineering
│   └── store/
│       └── useAppStore.ts     # Zustand global state
```

## Monetization Plan

- **Free tier:** 3 ghost writes per day
- **Pro weekly:** $4.99/week (3-day free trial)
- **Pro yearly:** $29.99/year (88% savings)
- Integration: RevenueCat (to be added in Week 3)

## Roadmap

### Week 1 (Current) ✅
- [x] Project structure and theming
- [x] Navigation (tabs + stack)
- [x] Home screen with input + selectors
- [x] AI service (Claude + OpenAI)
- [x] Results screen with copy/fav
- [x] History and Favorites
- [x] Settings screen
- [x] Paywall screen

### Week 2
- [ ] Screenshot OCR (Google ML Kit)
- [ ] Persistent storage (MMKV)
- [ ] Onboarding carousel
- [ ] Animation polish pass
- [ ] Error handling improvements

### Week 3
- [ ] RevenueCat subscription integration
- [ ] Backend proxy for API keys
- [ ] App icon and splash screen
- [ ] App Store screenshots
- [ ] TestFlight + Internal Testing
- [ ] Submit to App Store + Play Store

## License

Proprietary — All rights reserved.
