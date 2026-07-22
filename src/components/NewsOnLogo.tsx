import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import darkNewsLogo from "@/assests/dark_newslogo.png";
import newsLogo from "@/assests/newslogo.png";
import { cn } from "@/lib/utils";

interface NewsOnLogoProps {
  className?: string;
  imgClassName?: string;
  linkToHome?: boolean;
}

const NewsOnLogo = ({
  className,
  imgClassName = "h-12 w-auto md:h-14",
  linkToHome = true,
}: NewsOnLogoProps) => {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark =
    mounted && (theme === "system" ? resolvedTheme : theme) === "dark";
  const logoSrc = isDark ? darkNewsLogo : newsLogo;

  const image = (
    <img
      src={logoSrc}
      alt="NewsOn"
      className={cn(
        "origin-left object-contain object-left",
        imgClassName,
        // isDark ? "scale-[1.85]" :
        "scale-[1.5]",
      )}
    />
  );

  if (linkToHome) {
    return (
      <Link
        to="/"
        className={cn("inline-flex shrink-0 items-center overflow-visible", className)}
        aria-label="NewsOn home"
      >
        {image}
      </Link>
    );
  }

  return <span className={cn("inline-flex items-center overflow-visible", className)}>{image}</span>;
};

export default NewsOnLogo;
