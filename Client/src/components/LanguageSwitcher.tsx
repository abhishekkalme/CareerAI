"use client";

import React from "react";
import { useTranslation } from "react-i18next";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Globe } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Add flag emojis for better UX
const languages = [
  { code: "en", name: "English", nativeName: "English", flag: "🇪🇳" },
  { code: "hi", name: "Hindi", nativeName: "हिंदी", flag: "🇮🇳" },
  { code: "ur", name: "Urdu", nativeName: "اردو", flag: "ᴜʀ" },
  { code: "ks", name: "Kashmiri", nativeName: "کٲشُر", flag: "🏔️" },
];

export function LanguageSwitcher() {
  const { i18n, t } = useTranslation();

  const handleLanguageChange = (languageCode: string) => {
    i18n.changeLanguage(languageCode);
    localStorage.setItem("careerAI_language", languageCode);

    // Update document direction for RTL languages
    const isRTL = ["ur", "ks"].includes(languageCode);
    document.documentElement.dir = isRTL ? "rtl" : "ltr";
    document.documentElement.lang = languageCode;
  };

  const currentLanguage =
    languages.find((lang) => lang.code === i18n.language) || languages[0];

  return (
    <Select value={i18n.language} onValueChange={handleLanguageChange}>
      <SelectTrigger
        aria-label={t("header.language_selector")}
        className="w-[150px] sm:w-[180px] flex items-center gap-2"
      >
        <Globe className="h-4 w-4 text-muted-foreground" />

        <SelectValue>
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={currentLanguage.code}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="flex items-center gap-2"
            >
              {/* Flag always visible */}
              <span>{currentLanguage.flag}</span>

              {/* Full native name on larger screens, code on mobile */}
              <span className="hidden sm:inline">
                {currentLanguage.nativeName}
              </span>
              <span className="sm:hidden font-medium uppercase">
                {currentLanguage.code}
              </span>
            </motion.span>
          </AnimatePresence>
        </SelectValue>
      </SelectTrigger>

      <SelectContent>
        {languages.map((language) => (
          <SelectItem key={language.code} value={language.code}>
            <div className="flex items-center gap-2">
              <span className="text-lg">{language.flag}</span>
              <span>{language.nativeName}</span>
              <span className="ml-1 text-xs text-muted-foreground">
                ({language.name})
              </span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
