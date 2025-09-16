import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import {
  Brain,
  Users,
  Target,
  TrendingDown,
  ArrowRight,
  AlertTriangle,
  GraduationCap,
  MapPin,
} from "lucide-react";
import { Trans } from "react-i18next";
export function HomePage() {
  const { t } = useTranslation();

  const features = [
    {
      icon: Brain,
      title: t("home.features.quiz.title"),
      description: t("home.features.quiz.description"),
      color: "text-blue-600 dark:text-blue-400",
    },
    {
      icon: Target,
      title: t("home.features.mapping.title"),
      description: t("home.features.mapping.description"),
      color: "text-green-600 dark:text-green-400",
    },
    {
      icon: MapPin,
      title: t("home.features.colleges.title"),
      description: t("home.features.colleges.description"),
      color: "text-purple-600 dark:text-purple-400",
    },
    {
      icon: Users,
      title: t("home.features.dashboard.title"),
      description: t("home.features.dashboard.description"),
      color: "text-orange-600 dark:text-orange-400",
    },
  ];

  const stats = [
    {
      label: t("home.stats.students_board"),
      value: "50,000+",
      icon: GraduationCap,
    },
    {
      label: t("home.stats.join_college"),
      value: "13,000",
      icon: TrendingDown,
    },
    {
      label: t("home.stats.colleges_jammu"),
      value: "72",
      icon: MapPin,
    },
    {
      label: t("home.stats.enrollment_decline"),
      value: "30–50%",
      icon: AlertTriangle,
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-12 md:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge
              variant="secondary"
              className="mb-4 bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200"
            >
              {t("home.hero.badge")}
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              {t("home.hero.title")}{" "}
              <span className="text-indigo-600 dark:text-indigo-400 block">
                {t("home.hero.title_highlight")}
              </span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-3xl mx-auto">
  <Trans
    i18nKey="home.hero.description"
    components={{
      1: <span className="font-bold text-red-600" />,
      2: <span className="font-bold text-red-600" />,
      3: <span className="font-bold text-red-600" />
    }}
  />
</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/onboarding">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700"
                >
                  {t("home.hero.start_journey")}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white dark:bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="flex justify-center mb-2">
                    <Icon className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <div className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {t("home.features.title")}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              {t("home.features.description")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card
                  key={index}
                  className="h-full hover:shadow-lg transition-shadow"
                >
                  <CardHeader>
                    <div
                      className={`w-12 h-12 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4`}
                    >
                      <Icon className={`h-6 w-6 ${feature.color}`} />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 bg-indigo-600 dark:bg-indigo-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {t("home.cta.title")}
          </h2>
          <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
            {t("home.cta.description")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/onboarding">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                {t("home.cta.get_started")}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
