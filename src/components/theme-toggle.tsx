"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "./ui/button";

export function ThemeToggle() {
  const t = useTranslations("common");
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("proganda-theme");
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const dark = savedTheme ? savedTheme === "dark" : systemPrefersDark;

    setIsDark(dark);
    document.documentElement.dataset.theme = dark ? "dark" : "light";
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    setMounted(true);
  }, []);

  function toggleTheme() {
    const nextIsDark = !isDark;
    setIsDark(nextIsDark);
    
    document.documentElement.dataset.theme = nextIsDark ? "dark" : "light";
    if (nextIsDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    window.localStorage.setItem("proganda-theme", nextIsDark ? "dark" : "light");
  }

  if (!mounted) {
    return (
      <Button
        type="button"
        variant="outline"
        size="icon"
        className="h-9 w-9 rounded-xl border-border/40 bg-background/60 text-muted-foreground opacity-50"
        aria-hidden="true"
      />
    );
  }

  return (
    <Button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? t("switchToLightTheme") : t("switchToDarkTheme")}
      variant="outline"
      size="icon"
      className="relative h-9 w-9 rounded-xl border-border/40 bg-background/60 text-muted-foreground hover:bg-accent hover:text-foreground transition-all duration-200"
    >
      <Sun className={`size-4 transition-all duration-300 ${isDark ? "rotate-0 scale-100 text-amber-500" : "-rotate-90 scale-0 text-muted-foreground"}`} />
      <Moon className={`absolute size-4 transition-all duration-300 ${isDark ? "rotate-90 scale-0 text-muted-foreground" : "rotate-0 scale-100 text-slate-700"}`} />
    </Button>
  );
}