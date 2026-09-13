import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  // i18n: {
  //   locales: ["en", "ar"],
  //   defaultLocale: "ar",
  //   localeDetection: false,
  // },
  reactCompiler: true,
};

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

export default withNextIntl(nextConfig);
