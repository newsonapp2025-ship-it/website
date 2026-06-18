export const NEWS_LANGUAGES = [
  { id: "tamil", label: "தமிழ்", shortLabel: "TA" },
  { id: "english", label: "English", shortLabel: "EN" },
  { id: "hindi", label: "हिंदी", shortLabel: "HI" },
  { id: "malayalam", label: "മലയാളം", shortLabel: "ML" },
  { id: "kannada", label: "ಕನ್ನಡ", shortLabel: "KN" },
  { id: "telugu", label: "తెలుగు", shortLabel: "TE" },
] as const;

export type NewsLanguageId = (typeof NEWS_LANGUAGES)[number]["id"];

export const DEFAULT_LANGUAGE: NewsLanguageId = "tamil";

export const LANGUAGE_STORAGE_KEY = "newson-language";

export function isNewsLanguageId(value: string): value is NewsLanguageId {
  return NEWS_LANGUAGES.some((lang) => lang.id === value);
}

export function getLanguageById(id: string) {
  return NEWS_LANGUAGES.find((lang) => lang.id === id);
}
