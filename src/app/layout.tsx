import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { roboto } from "./ui/fonts";
import LayoutWrapper from "./LayoutWrapper";
import { ContextoMockProvider } from "../contextos/ContextoMock";
import { SessaoProvider } from "../contextos/ContextoSessao";
import { LoadingProvider } from "../contextos/ContextoLoading";
import ThemeRegistry from "@/ThemeRegistry";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Acapra",
  description: "Ajudamos os animais"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased ${roboto.className}`}
      >
        <ThemeRegistry>
        <SessaoProvider>
          <LoadingProvider>
            <ContextoMockProvider>
              <LayoutWrapper>{children}</LayoutWrapper>
            </ContextoMockProvider>
          </LoadingProvider>
        </SessaoProvider>
        </ThemeRegistry>
      </body>
    </html>
  );
}