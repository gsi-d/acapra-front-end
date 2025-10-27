import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { roboto } from "./ui/fonts";
import Menu from "./components/Menu";
import { Box } from "@mui/material";
import Footer from "./components/Footer";
import LayoutWrapper from "./LayoutWrapper";
import { ContextoMockProvider } from "../contextos/ContextoMock";

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
        <ContextoMockProvider>
          <LayoutWrapper>{children}</LayoutWrapper>
        </ContextoMockProvider>
      </body>
    </html>
  );
}
