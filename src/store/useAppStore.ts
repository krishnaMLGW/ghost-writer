import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { AIProvider } from '../constants/data';

export interface HistoryItem {
  id: string;
  mode: 'reply' | 'roast';
  input: string;
  imageUri?: string;
  relationship?: string;
  tone?: string;
  roastLevel?: string;
  replies: string[];
  timestamp: number;
  aiProvider: AIProvider;
}

interface AppState {
  mode: 'reply' | 'roast';
  inputText: string;
  imageUri: string | null;
  imageBase64: string | null;
  selectedRelationship: string | null;
  selectedTone: string | null;
  selectedRoastLevel: string | null;
  replies: string[];
  isLoading: boolean;

  aiProvider: AIProvider;
  dailyUsage: number;
  lastUsageDate: string;
  isPro: boolean;

  history: HistoryItem[];
  favorites: string[];

  setMode: (mode: 'reply' | 'roast') => void;
  setInputText: (text: string) => void;
  setImageUri: (uri: string | null) => void;
  setImageBase64: (base64: string | null) => void;
  setSelectedRelationship: (id: string | null) => void;
  setSelectedTone: (id: string | null) => void;
  setSelectedRoastLevel: (id: string | null) => void;
  setReplies: (replies: string[]) => void;
  setIsLoading: (loading: boolean) => void;
  resetSession: () => void;

  setAIProvider: (provider: AIProvider) => void;
  setIsPro: (isPro: boolean) => void;
  incrementUsage: () => boolean;
  canGenerate: () => boolean;

  addToHistory: (item: Omit<HistoryItem, 'id' | 'timestamp'>) => void;
  clearHistory: () => void;
  toggleFavorite: (text: string) => void;
  isFavorite: (text: string) => boolean;
}

const getToday = () => new Date().toISOString().split('T')[0];

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      mode: 'reply',
      inputText: '',
      imageUri: null,
      imageBase64: null,
      selectedRelationship: null,
      selectedTone: null,
      selectedRoastLevel: null,
      replies: [],
      isLoading: false,

      aiProvider: 'claude',
      dailyUsage: 0,
      lastUsageDate: getToday(),
      isPro: true,

      history: [],
      favorites: [],

      setMode: (mode) => set({ mode }),
      setInputText: (inputText) => set({ inputText }),
      setImageUri: (imageUri) => set({ imageUri }),
      setImageBase64: (imageBase64) => set({ imageBase64 }),
      setSelectedRelationship: (selectedRelationship) => set({ selectedRelationship }),
      setSelectedTone: (selectedTone) => set({ selectedTone }),
      setSelectedRoastLevel: (selectedRoastLevel) => set({ selectedRoastLevel }),
      setReplies: (replies) => set({ replies }),
      setIsLoading: (isLoading) => set({ isLoading }),

      resetSession: () =>
        set({
          inputText: '',
          imageUri: null,
      imageBase64: null,
          selectedRelationship: null,
          selectedTone: null,
          selectedRoastLevel: null,
          replies: [],
          isLoading: false,
        }),

      setAIProvider: (aiProvider) => set({ aiProvider }),
      setIsPro: (isPro) => set({ isPro }),

      incrementUsage: () => {
        const state = get();
        const today = getToday();
        if (state.lastUsageDate !== today) {
          set({ dailyUsage: 1, lastUsageDate: today });
          return true;
        }
        if (state.isPro) {
          set({ dailyUsage: state.dailyUsage + 1 });
          return true;
        }
        if (state.dailyUsage >= 3) {
          return false;
        }
        set({ dailyUsage: state.dailyUsage + 1 });
        return true;
      },

      canGenerate: () => {
        const state = get();
        if (state.isPro) return true;
        const today = getToday();
        if (state.lastUsageDate !== today) return true;
        return state.dailyUsage < 3;
      },

      addToHistory: (item) =>
        set((state) => ({
          history: [
            { ...item, id: Date.now().toString(), timestamp: Date.now() },
            ...state.history,
          ].slice(0, 100),
        })),

      clearHistory: () => set({ history: [] }),

      toggleFavorite: (text) =>
        set((state) => ({
          favorites: state.favorites.includes(text)
            ? state.favorites.filter((f) => f !== text)
            : [...state.favorites, text],
        })),

      isFavorite: (text) => get().favorites.includes(text),
    }),
    {
      name: 'ghost-writer-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        aiProvider: state.aiProvider,
        dailyUsage: state.dailyUsage,
        lastUsageDate: state.lastUsageDate,
        isPro: state.isPro,
        history: state.history,
        favorites: state.favorites,
      }),
    }
  )
);
