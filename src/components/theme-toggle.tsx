"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "./ui/button";

export function ThemeToggle() {
  const t = useTranslations("common");
  const [isDark, setIsDark] = useState(false);

  // Initialise theme from localStorage on mount
  useEffect(() => {
    const savedTheme = window.localStorage.getItem("proganda-theme");
    const dark = savedTheme === "dark";
    const timer = setTimeout(() => {
      setIsDark(dark);
    }, 0);
    document.documentElement.dataset.theme = dark ? "dark" : "light";
    return () => clearTimeout(timer);
  }, []);

  function toggleTheme() {
    const nextIsDark = !isDark;
    setIsDark(nextIsDark);
    document.documentElement.dataset.theme = nextIsDark ? "dark" : "light";
    window.localStorage.setItem(
      "proganda-theme",
      nextIsDark ? "dark" : "light",
    );
  }

  return (
    <Button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? t("switchToLightTheme") : t("switchToDarkTheme")}
      className="theme-toggle rounded-sm"
      variant="outline"
      size="icon-lg"
    >
      {isDark ? <Sun className="size-3.5" /> : <Moon className="size-3.5" />}
    </Button>
  );
}
