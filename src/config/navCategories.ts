export type NewsNavCategory = "all" | "politics" | "sports" | "movies" | "motivation";

export const PRIMARY_NAV = [
  { id: "all" as const, label: "All News", href: "#news" },
  { id: "politics" as const, label: "Politics", href: "#feed-politics" },
  { id: "sports" as const, label: "Sports", href: "#feed-sports" },
  { id: "movies" as const, label: "Movies", href: "#feed-movies" },
  { id: "motivation" as const, label: "Motivation", href: "#feed-motivation" },
];

export const MORE_NAV = [
  { label: "About", href: "/about", page: true },
  { label: "Editorial Policy", href: "/editorial-policy", page: true },
  { label: "Contact", href: "#contact" },
  { label: "Privacy", href: "/privacy", page: true },
  { label: "Terms", href: "/terms", page: true },
];
