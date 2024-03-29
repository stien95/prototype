import { Analytics } from '@vercel/analytics/react';
import type { Metadata } from "next";
import { K2D } from "next/font/google";
import "./globals.css";
import Layout from "@/components/Layout";
import clsx from "clsx";
import ModalProvider from "@/components/modals/ModalProvider";

const inter = K2D({subsets: ["latin"], weight: ["100", "200", "300", "400", "500", "700", "800"]});

export const metadata: Metadata = {
  title: "My Stand",
  description: "Añade tu negocio ICESI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <meta name="google-site-verification" content="VDkTLGyyq1ggM2qtKbS_DRrC7LofDKcp4xfVa8kTAck" />
      <body className={clsx(inter.className, "h-screen")}>
        <Layout>
          {children}
        </Layout>
        <ModalProvider/>
        <Analytics/>
        </body>
    </html>
  );
}
