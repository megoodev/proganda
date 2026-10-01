import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter, Raleway, Cairo } from "next/font/google";
import "./globals.css";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { TooltipProvider } from "@/components/ui/tooltip";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  variable: "--font-cairo",
});

const ralewayHeading = Raleway({
  subsets: ["latin"],
  variable: "--font-heading",
});

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ProGanda | Make noise. Move culture.",
  description:
    "A full-service creator agency and production house for brands that want to move culture.",
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang={routing.defaultLocale}
      dir={routing.defaultLocale === "ar" ? "rtl" : "ltr"}
      suppressHydrationWarning
      className={cn(
        "h-full",
        "antialiased",
        geistSans.variable,
        geistMono.variable,
        "font-sans",
        inter.variable,
        ralewayHeading.variable,
        cairo.variable,
      )}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{document.documentElement.dataset.theme=localStorage.getItem("proganda-theme")==="dark"?"dark":"light"}catch(e){document.documentElement.dataset.theme="light"}`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <TooltipProvider>{children}</TooltipProvider>
      </body>
    </html>
  );
}