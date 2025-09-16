"use client";

import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "./ui/button";
import { LanguageSwitcher } from "./LanguageSwitcher";
import {
  Brain,
  BookOpen,
  GraduationCap,
  MessageSquare,
  Users,
  Menu,
  X,
} from "lucide-react";
import { SunMedium, MoonStar } from "lucide-react";
import { cn } from "./ui/utils";
import { motion, AnimatePresence } from "framer-motion";

interface LayoutProps {
  children: React.ReactNode;
  isDarkMode: boolean;
  toggleTheme: () => void;
  userData?: any;
}

const navigationItems = [
  { path: "/mentoring", labelKey: "mentoring", icon: Users },
  { path: "/learning", labelKey: "learning", icon: BookOpen },
  { path: "/lecturers", labelKey: "lecturers", icon: GraduationCap },
  { path: "/ai-chat", labelKey: "ai_counselor", icon: MessageSquare },
  { path: "/profile", labelKey: "profile", icon: Users },
];

export function Layout({ children, isDarkMode, toggleTheme, userData }: LayoutProps) {
  const location = useLocation();
  const { t } = useTranslation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [studentProfile, setStudentProfile] = React.useState<any>(null);

  const isOnboardingRoute = ["/onboarding", "/assessment"].includes(location.pathname);
  const isHomePage = location.pathname === "/";

  React.useEffect(() => {
    const profile = localStorage.getItem("student_profile");
    if (profile) setStudentProfile(JSON.parse(profile));
  }, []);

  const getDynamicDashboardPath = () => {
    if (!studentProfile?.educationLevel) return "/dashboard";
    const routes: Record<string, string> = {
      "10th": "/dashboard-early-career",
      "12th": "/dashboard-stream-options",
      graduation: "/dashboard-career-insights",
      "post-graduation": "/dashboard-career-growth",
    };
    return routes[studentProfile.educationLevel] || "/dashboard";
  };

  const dynamicNavigationItems = navigationItems.map((item) => {
    if (item.path === "/dashboard") {
      return { ...item, path: getDynamicDashboardPath() };
    }
    return item;
  });

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      {/* Header */}
      <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-sm transition-colors duration-300">
        <div className="max-w-12xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center py-4 md:py-5">
          {/* Logo + Title */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-indigo-600 dark:bg-indigo-500 rounded-lg flex items-center justify-center">
              <Brain className="h-5 w-5 md:h-6 md:w-6 text-white" />
            </div>
            <div className="hidden sm:flex flex-col">
              <h1 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
                {t("home.header.title")}
              </h1>
              <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
                {t("home.header.subtitle")}
              </p>
            </div>
            <div className="sm:hidden">
              <h1 className="text-lg font-bold text-gray-900 dark:text-white">
                {t("home.header.title")}
              </h1>
            </div>
          </div>

          {/* Desktop Navigation */}
          {!isOnboardingRoute && !isHomePage && (
            <nav className="hidden lg:flex items-center space-x-1">
              {dynamicNavigationItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={cn(
                      "flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                      isActive
                        ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300"
                        : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{t(`home.navigation.${item.labelKey}`)}</span>
                  </Link>
                );
              })}
            </nav>
          )}

          {/* Right Side: Language + Theme + Mobile Menu */}
          <div className="flex items-center space-x-3 md:space-x-4">
            <LanguageSwitcher />

            <button
              onClick={toggleTheme}
              aria-label={t("home.header.theme_toggle")}
              className={cn(
                "h-9 w-9 rounded-full flex items-center justify-center transition-colors shadow-sm overflow-hidden",
                isDarkMode
                  ? "bg-primary text-primary-foreground hover:bg-primary/90"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              )}
            >
              <AnimatePresence mode="wait" initial={false}>
                {isDarkMode ? (
                  <motion.span
                    key="moon"
                    initial={{ opacity: 0, rotate: -90, scale: 0.6 }}
                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                    exit={{ opacity: 0, rotate: 90, scale: 0.6 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="flex"
                  >
                    <MoonStar className="h-5 w-5" />
                  </motion.span>
                ) : (
                  <motion.span
                    key="sun"
                    initial={{ opacity: 0, rotate: 90, scale: 0.6 }}
                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                    exit={{ opacity: 0, rotate: -90, scale: 0.6 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="flex"
                  >
                    <SunMedium className="h-5 w-5" />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            {!isOnboardingRoute && !isHomePage && (
              <Button
                variant="outline"
                size="sm"
                className="lg:hidden"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              </Button>
            )}
          </div>
        </div>

        {/* Mobile Nav Overlay */}
        {!isOnboardingRoute && !isHomePage && isMobileMenuOpen && (
          <div className="lg:hidden fixed inset-0 bg-black/50 z-50 flex flex-col">
            <div className="bg-white dark:bg-gray-900 p-4 flex flex-col gap-2 h-full overflow-auto">
              {dynamicNavigationItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      "flex items-center space-x-3 px-3 py-2 rounded-md text-base font-medium transition-colors",
                      isActive
                        ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                    )}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{t(`home.navigation.${item.labelKey}`)}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full">{children}</main>

      {/* Bottom Navigation for Mobile */}
      {!isOnboardingRoute && !isHomePage && (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 safe-area-pb z-40">
          <div className="grid grid-cols-4 gap-1 px-2 py-1">
            {dynamicNavigationItems.slice(0, 4).map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "flex flex-col items-center justify-center px-2 py-1 rounded-md text-xs font-medium transition-colors",
                    isActive
                      ? "text-indigo-600 dark:text-indigo-400"
                      : "text-gray-600 dark:text-gray-400"
                  )}
                >
                  <Icon className="h-5 w-5 mb-1" />
                  <span className="truncate">{t(`home.navigation.${item.labelKey}`)}</span>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
