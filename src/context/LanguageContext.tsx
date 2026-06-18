import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  DEFAULT_LANGUAGE,
  isNewsLanguageId,
  LANGUAGE_STORAGE_KEY,
  type NewsLanguageId,
} from "@/config/languages";

interface LanguageContextValue {
  language: NewsLanguageId;
  setLanguage: (language: NewsLanguageId) => void;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

function readStoredLanguage(): NewsLanguageId {
  try {
    const stored = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (stored && isNewsLanguageId(stored)) return stored;
  } catch {
    // localStorage may be unavailable in private mode
  }
  return DEFAULT_LANGUAGE;
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<NewsLanguageId>(readStoredLanguage);

  const setLanguage = useCallback((next: NewsLanguageId) => {
    setLanguageState(next);
    try {
      localStorage.setItem(LANGUAGE_STORAGE_KEY, next);
    } catch {
      // ignore storage errors
    }
  }, []);

  const value = useMemo(() => ({ language, setLanguage }), [language, setLanguage]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
}
