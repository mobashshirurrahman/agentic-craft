import type { Metadata } from "next";
import { Geist, Geist_Mono, Caveat } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { ThemeProvider } from "@/lib/theme-context";
import { AuthProvider } from "@/lib/auth-context";
import AuthModal from "@/components/auth/AuthModal";
import CertificateModal from "@/components/auth/CertificateModal";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AgenticCraft — Learn Agentic AI by Building (Beginner to Production)",
  description:
    "Comprehensive, interactive, and animated Agentic AI tutorial platform. Master autonomous LLM reasoning, LangGraph, Model Context Protocol (MCP), Multi-Agent Swarms, and production deployment step-by-step.",
  keywords: [
    "Agentic AI",
    "AI Agents",
    "LangGraph",
    "LangChain",
    "Model Context Protocol",
    "MCP",
    "Multi-Agent",
    "Autonomous Agents",
    "AI Tutorials",
    "ReAct Pattern",
    "FastAPI AI",
  ],
  authors: [{ name: "AgenticCraft Academy" }],
  openGraph: {
    title: "AgenticCraft — Learn Agentic AI by Building",
    description:
      "The complete visual, interactive tutorial platform for building production AI agents.",
    url: "https://agenticcraft.vercel.app",
    siteName: "AgenticCraft",
    type: "website",
  },
  verification: {
    google: "gsLRX-BtDwFFOLHfI1IGU4u9LNKXfmfq9LqcStdsn0M",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${caveat.variable}`}
      suppressHydrationWarning
    >
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="google-site-verification"
          content="gsLRX-BtDwFFOLHfI1IGU4u9LNKXfmfq9LqcStdsn0M"
        />
        <Script id="theme-boot" strategy="beforeInteractive">

          {`
            try {
              var p = window.location.pathname;
              if (p.startsWith('/learn')) {
                document.documentElement.classList.add('dark');
                document.documentElement.classList.remove('light');
                document.documentElement.setAttribute('data-theme', 'dark');
              } else {
                document.documentElement.classList.remove('dark');
                document.documentElement.classList.add('light');
                document.documentElement.setAttribute('data-theme', 'light');
              }
            } catch(e) {}
          `}
        </Script>
      </head>
      <body className="min-h-screen flex flex-col text-[var(--foreground)] bg-[var(--background)] selection:bg-teal-500/30 selection:text-teal-500 transition-colors duration-200">
        <ThemeProvider>
          <AuthProvider>
            {children}
            <AuthModal />
            <CertificateModal />
          </AuthProvider>
        </ThemeProvider>
      </body>

    </html>
  );
}
