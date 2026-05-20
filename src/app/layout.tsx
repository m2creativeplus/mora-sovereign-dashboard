import type { Metadata } from "next";
import ConvexClientProvider from "@/components/ConvexClientProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Ministry of Religious Affairs & Endowments | Republic of Somaliland",
    template: "%s | Ministry of Religious Affairs | Republic of Somaliland"
  },
  description: "Official digital authority portal of the Somaliland Ministry of Religious Affairs & Endowments. Canonical registry for Waqf endowments, mosque GIS mappings, verified Islamic Hijri calendars, and official Shariah guidance.",
  metadataBase: new URL("https://portal.mora.gov.sl"),
  alternates: {
    canonical: "/",
  },
  keywords: [
    "Ministry of Religious Affairs Somaliland",
    "Somaliland Waqf Registry",
    "Official Hijri Calendar Hargeisa",
    "Somaliland Mosque Directory",
    "Hajj Operations Somaliland",
    "Wasaaradda Diinta iyo Awqaafta Somaliland"
  ],
  other: {
    "geo.region": "SL-WO",
    "geo.placename": "Hargeisa",
    "geo.position": "9.5596;44.0650",
    "ICBM": "9.5596, 44.0650"
  }
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
