import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { NewsNavCategory } from "@/config/navCategories";

interface NewsBrowseContextValue {
  activeCategory: NewsNavCategory;
  setActiveCategory: (category: NewsNavCategory) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  debouncedSearch: string;
}

const NewsBrowseContext = createContext<NewsBrowseContextValue | null>(null);

export function NewsBrowseProvider({ children }: { children: ReactNode }) {
  const [activeCategory, setActiveCategory] = useState<NewsNavCategory>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    const id = setTimeout(() => setDebouncedSearch(searchQuery.trim()), 350);
    return () => clearTimeout(id);
  }, [searchQuery]);

  const value = useMemo(
    () => ({
      activeCategory,
      setActiveCategory,
      searchQuery,
      setSearchQuery,
      debouncedSearch,
    }),
    [activeCategory, searchQuery, debouncedSearch],
  );

  return <NewsBrowseContext.Provider value={value}>{children}</NewsBrowseContext.Provider>;
}

export function useNewsBrowse() {
  const ctx = useContext(NewsBrowseContext);
  if (!ctx) throw new Error("useNewsBrowse must be used within NewsBrowseProvider");
  return ctx;
}
