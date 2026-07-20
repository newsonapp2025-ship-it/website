import { Check, Globe } from "lucide-react";
import { NEWS_LANGUAGES } from "@/config/languages";
import { useLanguage } from "@/context/LanguageContext";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface LanguageSelectorProps {
  variant?: "dropdown" | "pills" | "icon";
  className?: string;
}

const LanguageSelector = ({ variant = "dropdown", className }: LanguageSelectorProps) => {
  const { language, setLanguage } = useLanguage();
  const active = NEWS_LANGUAGES.find((lang) => lang.id === language);

  if (variant === "icon") {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            type="button"
            aria-label="Select language"
            className={cn(
              "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border bg-background text-foreground transition hover:bg-secondary",
              className,
            )}
          >
            <Globe className="h-5 w-5" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="max-h-72 w-44 overflow-y-auto">
          {NEWS_LANGUAGES.map((lang) => (
            <DropdownMenuItem
              key={lang.id}
              onClick={() => setLanguage(lang.id)}
              className="cursor-pointer justify-between"
            >
              <span>{lang.label}</span>
              {language === lang.id && <Check className="h-4 w-4 text-primary" />}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  if (variant === "pills") {
    return (
      <div className={cn("flex flex-wrap gap-2", className)}>
        {NEWS_LANGUAGES.map((lang) => (
          <button
            key={lang.id}
            type="button"
            onClick={() => setLanguage(lang.id)}
            className={cn(
              "rounded-full px-4 py-1.5 text-sm font-medium transition-all",
              language === lang.id
                ? "bg-primary text-primary-foreground shadow-glow"
                : "border border-border bg-secondary/50 text-muted-foreground hover:text-foreground",
            )}
          >
            {lang.label}
          </button>
        ))}
      </div>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className={cn("gap-2 border-border bg-background/50", className)}
          aria-label="Select news language"
        >
          <Globe className="h-4 w-4 shrink-0" />
          <span className="max-w-[7rem] truncate">{active?.label ?? "Language"}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="max-h-72 w-44 overflow-y-auto">
        {NEWS_LANGUAGES.map((lang) => (
          <DropdownMenuItem
            key={lang.id}
            onClick={() => setLanguage(lang.id)}
            className="cursor-pointer justify-between"
          >
            <span>{lang.label}</span>
            {language === lang.id && <Check className="h-4 w-4 text-primary" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSelector;
