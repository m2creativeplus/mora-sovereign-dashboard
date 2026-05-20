import type { Metadata } from "next";
import ConvexClientProvider from "@/components/ConvexClientProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "MORA Sovereign Platform | Republic of Somaliland",
  description: "Official digital infrastructure for the Somaliland Ministry of Religious Affairs & Endowments — Islamic Calendar, Mosque Registry, Waqf Management, Publications Archive.",
  keywords: ["MORA", "Somaliland", "Ministry of Religious Affairs", "Islamic Calendar", "Waqf", "Mosque Registry"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Outfit:wght@300;400;600;700;800&family=Noto+Naskh+Arabic:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        <ConvexClientProvider>{children}</ConvexClientProvider>
      </body>
    </html>
  );
}
