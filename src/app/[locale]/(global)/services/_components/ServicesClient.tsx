"use client";

import {
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Building2,
  User,
  PhoneCall,
  TrendingUp,
  Megaphone,
  Target,
  Zap,
  BarChart3,
  Users2,
  Layers,
  Search,
  Handshake,
  Rocket,
} from "lucide-react";
import { motion, Variants } from "framer-motion";
import { Link } from "@/i18n/navigation";

type ServicesClientProps = {
  eyebrow: string;
  title: string;
  description: string;
  brandsBoxTitle: string;
  brandsBoxSubtitle: string;
  brandServices: string[];
  brandCta: string;
  creatorsBoxTitle: string;
  creatorsBoxSubtitle: string;
  creatorServices: string[];
  creatorCta: string;
  scopeTitle: string;
  scopeDescription: string;
  consultation: string;
  stats: { label: string; value: string }[];
  workflowSteps: { num: string; title: string; desc: string }[];
  howWeWork: string;
  journeyTitle: string;
};

// إعدادات الحركات المتقدمة
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

const pulseGlow: Variants = {
  animate: {
    scale: [1, 1.2, 1],
    opacity: [0.3, 0.6, 0.3],
    transition: { duration: 6, repeat: Infinity, ease: "easeInOut" },
  },
};

export default function ServicesClient({
  eyebrow,
  title,
  description,
  brandsBoxTitle,
  brandsBoxSubtitle,
  brandServices,
  brandCta,
  creatorsBoxTitle,
  creatorsBoxSubtitle,
  creatorServices,
  creatorCta,
  scopeTitle,
  scopeDescription,
  consultation,
  stats,
  workflowSteps,
  howWeWork,
  journeyTitle,
}: ServicesClientProps) {
  const statsWithIcons = stats.map((stat, index) => ({
    ...stat,
    icon: [Rocket, Users2, BarChart3, Zap][index] || Rocket,
  }));

  const workflowStepsWithIcons = workflowSteps.map((step, index) => ({
    ...step,
    icon: [Search, Handshake, TrendingUp][index] || Search,
  }));

  return (
    <main className="min-h-screen bg-background text-foreground py-20 relative overflow-hidden">
      {/* خلفيات متحركة وديناميكية مع توهج (Glow Effect) */}
      <motion.div
        variants={pulseGlow}
        animate="animate"
        className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/15 rounded-full blur-[140px] pointer-events-none"
      />
      <motion.div
        variants={pulseGlow}
        animate="animate"
        className="absolute bottom-20 right-10 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[120px] pointer-events-none"
      />

      <motion.div
        className="mx-auto max-w-7xl px-5 lg:px-8 relative z-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        {/* الهيدر الرئيسي */}
        <motion.div variants={itemVariants} className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary mb-6 shadow-sm backdrop-blur-md">
            <Sparkles className="size-4 animate-spin-slow" />
            <span className="text-[11px] font-extrabold uppercase tracking-[0.2em]">
              {eyebrow}
            </span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight leading-[1.08] bg-gradient-to-r from-foreground via-foreground to-muted-foreground bg-clip-text text-transparent">
            {title}
          </h1>
          <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
            {description}
          </p>
        </motion.div>

        {/* 1️⃣ قسم الإحصائيات المتفاعلة (Marketing Metrics) */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20 p-4 rounded-2xl border border-border/50 bg-card/30 backdrop-blur-md"
        >
          {statsWithIcons.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.03 }}
                className="flex flex-col items-center sm:items-start p-4 rounded-xl bg-background/50 border border-border/40"
              >
                <div className="flex items-center gap-2 text-primary mb-1">
                  <Icon className="size-4" />
                  <span className="text-2xl sm:text-3xl font-black">{stat.value}</span>
                </div>
                <span className="text-xs sm:text-sm text-muted-foreground font-medium text-center sm:text-start">
                  {stat.label}
                </span>
              </motion.div>
            );
          })}
        </motion.div>

        {/* 2️⃣ كروت الخدمات الرئيسية (Brands vs Creators) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-24">
          {/* كارت العلامات التجارية */}
          <motion.div
            variants={itemVariants}
            whileHover={{ y: -8 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="group relative rounded-3xl border border-border/80 bg-gradient-to-b from-card/80 to-card/30 backdrop-blur-xl p-8 sm:p-10 flex flex-col justify-between hover:border-primary/60 transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-primary/10 overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl group-hover:bg-primary/20 transition-all" />
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <div className="p-4 rounded-2xl bg-primary/10 text-primary shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300 shadow-inner">
                    <Building2 className="size-8" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">{brandsBoxTitle}</h2>
                    <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                      {brandsBoxSubtitle}
                    </p>
                  </div>
                </div>
                <Megaphone className="size-7 text-primary/20 group-hover:text-primary/80 transition-colors hidden sm:block" />
              </div>

              <div className="h-px w-full bg-border/40 mb-6" />

              <ul className="space-y-4">
                {brandServices.map((service, idx) => (
                  <motion.li
                    key={idx}
                    className="flex items-start gap-3 text-sm sm:text-base text-foreground/90"
                    whileHover={{ x: 6 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <CheckCircle2 className="size-5 text-primary shrink-0 mt-0.5" />
                    <span>{service}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

            <div className="mt-10 pt-6 border-t border-border/40 relative z-10">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 w-full px-6 py-4 rounded-2xl bg-primary text-primary-foreground font-bold text-sm hover:opacity-95 transition-all shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30"
              >
                <span>{brandCta}</span>
                <ArrowRight className="size-4 rtl:rotate-180 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>

          {/* كارت صناع المحتوى */}
          <motion.div
            variants={itemVariants}
            whileHover={{ y: -8 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="group relative rounded-3xl border border-border/80 bg-gradient-to-b from-card/80 to-card/30 backdrop-blur-xl p-8 sm:p-10 flex flex-col justify-between hover:border-primary/60 transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-primary/10 overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-2xl group-hover:bg-primary/20 transition-all" />
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <div className="p-4 rounded-2xl bg-primary/10 text-primary shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300 shadow-inner">
                    <User className="size-8" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">{creatorsBoxTitle}</h2>
                    <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                      {creatorsBoxSubtitle}
                    </p>
                  </div>
                </div>
                <TrendingUp className="size-7 text-primary/20 group-hover:text-primary/80 transition-colors hidden sm:block" />
              </div>

              <div className="h-px w-full bg-border/40 mb-6" />

              <ul className="space-y-4">
                {creatorServices.map((service, idx) => (
                  <motion.li
                    key={idx}
                    className="flex items-start gap-3 text-sm sm:text-base text-foreground/90"
                    whileHover={{ x: 6 }}
                    transition={{ type: "spring", stiffness: 400 }}
                  >
                    <CheckCircle2 className="size-5 text-primary shrink-0 mt-0.5" />
                    <span>{service}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

            <div className="mt-10 pt-6 border-t border-border/40 relative z-10">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 w-full px-6 py-4 rounded-2xl bg-card border border-border hover:bg-accent hover:border-primary/40 font-bold text-sm transition-all shadow-sm"
              >
                <span>{creatorCta}</span>
                <ArrowRight className="size-4 rtl:rotate-180 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </div>

        {/* 3️⃣ قسم جديد: آلية العمل (Workflow Steps) */}
        <motion.div variants={itemVariants} className="mb-24">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold mb-3">
              <Layers className="size-3.5" />
              <span>{howWeWork}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold">{journeyTitle}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {workflowStepsWithIcons.map((step, idx) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={idx}
                  whileHover={{ y: -5 }}
                  className="p-6 rounded-2xl border border-border/50 bg-card/30 backdrop-blur-md relative overflow-hidden group"
                >
                  <div className="text-5xl font-black text-primary/10 absolute top-4 left-4 group-hover:text-primary/20 transition-colors">
                    {step.num}
                  </div>
                  <div className="p-3 rounded-xl bg-primary/10 text-primary w-fit mb-4 relative z-10">
                    <Icon className="size-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 relative z-10">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed relative z-10">
                    {step.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* 4️⃣ قسم الاستشارة والختام (CTA) */}
        <motion.div
          variants={itemVariants}
          className="relative overflow-hidden rounded-3xl border border-primary/40 bg-gradient-to-r from-primary/15 via-primary/5 to-transparent p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl"
        >
          <div className="max-w-2xl relative z-10">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-foreground mb-3 flex items-center gap-3">
              <Target className="size-6 text-primary shrink-0" />
              {scopeTitle}
            </h3>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              {scopeDescription}
            </p>
          </div>

          <Link
            href="/contact"
            className="inline-flex items-center gap-3 px-8 py-4.5 rounded-2xl bg-primary text-primary-foreground font-extrabold text-sm hover:opacity-95 transition-all shrink-0 shadow-lg shadow-primary/30 hover:scale-[1.03] active:scale-[0.97] relative z-10 group"
          >
            <PhoneCall className="size-4 animate-bounce" />
            <span>{consultation}</span>
            <ArrowRight className="size-4 rtl:rotate-180 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </motion.div>
    </main>
  );
}