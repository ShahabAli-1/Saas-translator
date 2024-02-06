// this is an alternative of redux

import { create } from "zustand";
import { Subscription } from "@/lib/types/Subscription";

export type LanguagesSupported =
  | "en"
  | "de"
  | "fr"
  | "es"
  | "ur"
  | "pa"
  | "ar"
  | "zh"
  | "ru"
  | "la"
  | "ja";

export const LanguageSupportedMap: Record<LanguagesSupported, string> = {
  en: "English",
  de: "German",
  fr: "French",
  es: "Spanish",
  ur: "Urdu",
  pa: "Punjabi",
  ja: "Japanese",
  la: "Latin",
  ru: "Russian",
  zh: "Mandarin",
  ar: "Arabic",
};

const LANGUAGES_IN_FREE = 5;

interface LanguageState {
  language: LanguagesSupported;
  setLanguage: (language: LanguagesSupported) => void;
  getLanguages: (isPro: boolean) => LanguagesSupported[];
  getNotSupportedLanguages: (isPro: boolean) => LanguagesSupported[];
}

export const useLanguageStore = create<LanguageState>()((set, get) => ({
  language: "en",
  setLanguage: (language: LanguagesSupported) => set({ language }),
  getLanguages: (isPro: boolean) => {
    // ?If the user is process, return all supported languages
    if (isPro) return Object.keys(LanguageSupportedMap) as LanguagesSupported[];
    // If not pro, return only the first two langauges
    return Object.keys(LanguageSupportedMap).slice(
      0,
      LANGUAGES_IN_FREE
    ) as LanguagesSupported[];
  },
  getNotSupportedLanguages: (isPro: boolean) => {
    if (isPro) return [];
    return Object.keys(LanguageSupportedMap).slice(
      LANGUAGES_IN_FREE
    ) as LanguagesSupported[];
    // excluded the first two langauges
  },
}));

interface SubscriptionState {
  subscription: Subscription | null | undefined;
  setSubscription: (subscription: Subscription | null) => void;
}
export const useSubscriptionStore = create<SubscriptionState>((set) => ({
  subscription: undefined,
  setSubscription: (subscription: Subscription | null) => set({ subscription }),
}));
