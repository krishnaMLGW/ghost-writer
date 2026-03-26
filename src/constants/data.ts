// All the selection options for Ghost Writer

export interface Relationship {
  id: string;
  label: string;
  emoji: string;
  description: string;
}

export interface Tone {
  id: string;
  label: string;
  emoji: string;
  color: string;
  description: string;
}

export interface RoastLevel {
  id: string;
  label: string;
  emoji: string;
  description: string;
  intensity: number; // 1-4
}

export const RELATIONSHIPS: Relationship[] = [
  { id: 'friend', label: 'Friend', emoji: '👋', description: 'Your buddy' },
  { id: 'bestfriend', label: 'Best Friend', emoji: '🤙', description: 'Your ride or die' },
  { id: 'family', label: 'Family', emoji: '🏠', description: 'Mom, dad, siblings' },
  { id: 'crush', label: 'Crush', emoji: '💝', description: 'You know the feeling' },
  { id: 'partner', label: 'Partner', emoji: '💍', description: 'Your other half' },
  { id: 'date', label: 'Date', emoji: '🌹', description: 'New flame' },
  { id: 'ex', label: 'Ex', emoji: '💀', description: 'Tread carefully...' },
  { id: 'boss', label: 'Boss', emoji: '💼', description: 'Keep it professional' },
  { id: 'colleague', label: 'Colleague', emoji: '🤝', description: 'Work buddy' },
  { id: 'acquaintance', label: 'Acquaintance', emoji: '👤', description: 'Barely know them' },
  { id: 'stranger', label: 'Stranger', emoji: '👻', description: 'Who dis?' },
  { id: 'teacher', label: 'Teacher', emoji: '📚', description: 'Respectful vibes' },
];

export const TONES: Tone[] = [
  { id: 'funny', label: 'Funny', emoji: '😂', color: '#FFD93D', description: 'Make them laugh' },
  { id: 'polite', label: 'Polite', emoji: '🤗', color: '#6BCB77', description: 'Kind and warm' },
  { id: 'savage', label: 'Savage Roast', emoji: '🔥', color: '#FF6B6B', description: 'No mercy' },
  { id: 'professional', label: 'Professional', emoji: '📊', color: '#4D96FF', description: 'All business' },
  { id: 'flirty', label: 'Flirty', emoji: '😏', color: '#FF78C4', description: 'Smooth operator' },
  { id: 'sarcastic', label: 'Sarcastic', emoji: '🙄', color: '#C59CF7', description: 'Eye roll energy' },
  { id: 'supportive', label: 'Supportive', emoji: '🫂', color: '#45D9A8', description: 'Lift them up' },
  { id: 'pullleg', label: 'Pull Leg', emoji: '🤪', color: '#FF922B', description: 'Playful teasing' },
  { id: 'genz', label: 'Gen-Z', emoji: '💅', color: '#E599F7', description: 'No cap fr fr' },
  { id: 'rizz', label: 'Max Rizz', emoji: '🗿', color: '#FFB86C', description: 'Ultimate charm' },
  { id: 'witty', label: 'Witty', emoji: '🧠', color: '#74C0FC', description: 'Clever comeback' },
  { id: 'chill', label: 'Chill', emoji: '😎', color: '#69DB7C', description: 'Cool and casual' },
];

export const ROAST_LEVELS: RoastLevel[] = [
  { id: 'light', label: 'Light Tease', emoji: '😄', description: 'Friendly banter', intensity: 1 },
  { id: 'medium', label: 'Medium Roast', emoji: '😈', description: 'Getting spicy', intensity: 2 },
  { id: 'heavy', label: 'Well Done', emoji: '🔥', description: 'No mercy', intensity: 3 },
  { id: 'destroyed', label: 'Obliterated', emoji: '💀', description: 'Seek therapy after', intensity: 4 },
];

export const AI_PROVIDERS = [
  { id: 'claude', label: 'Claude', emoji: '🟣', description: 'By Anthropic' },
  { id: 'openai', label: 'GPT', emoji: '🟢', description: 'By OpenAI' },
] as const;

export type AIProvider = 'claude' | 'openai';

export const FREE_DAILY_LIMIT = 3;

export const SUBSCRIPTION_PLANS = {
  weekly: {
    id: 'ghost_writer_weekly',
    price: '$4.99',
    period: 'week',
    trialDays: 3,
  },
  yearly: {
    id: 'ghost_writer_yearly',
    price: '$29.99',
    period: 'year',
    savings: '88%',
  },
} as const;
