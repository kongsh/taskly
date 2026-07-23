import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import AppLayout from "@/components/layout/AppLayout";
import { Toaster } from "sonner";
import { QueryProvider } from "@/providers/QueryProvider";

const pretendard = localFont({
  src: "../assets/fonts/PretendardVariable.woff2",
  variable: "--font-pretendard",
  display: "swap",
});

export const metadata: Metadata = {
  title: { default: "Taskly", template: "%s | Taskly" },
  description:
    "Taskly는 Next.js App Router와 TypeScript로 개발한 Todo 프로젝트입니다.",
  keywords: [
    "Next.js",
    "React",
    "TypeScript",
    "Todo",
    "Task Management",
    "Portfolio",
  ],
  authors: [{ name: "kongsh" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${pretendard.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <Toaster richColors />
        <QueryProvider>
          <AppLayout>{children}</AppLayout>
        </QueryProvider>
      </body>
    </html>
  );
}
