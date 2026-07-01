import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollHoverManager from "@/components/ScrollHoverManager";
import { BASE_URL, SITE_NAME, SITE_DESCRIPTION, SITE_LOGO, SOCIAL_URLS } from "@/lib/constants";

const ooNeureal = localFont({
  src: [
    {
      path: "../public/Fonts/OONeureal-Mono.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/Fonts/OONeureal-Mono.woff",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-oo-neureal",
});

export const metadata: Metadata = {
  title: {
    default: "OKRA | Enter the Ecosystem",
    template: "%s | OKRA Ecosystem",
  },
  description: SITE_DESCRIPTION,
  metadataBase: new URL(BASE_URL),
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: SITE_NAME,
    title: "OKRA | Enter the Ecosystem",
    description: SITE_DESCRIPTION,
  },
  icons: {
    icon: SITE_LOGO,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${ooNeureal.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body
        className="min-h-full bg-black text-okra-paper font-oo-neureal overflow-x-hidden"
        suppressHydrationWarning
      >
        <ScrollHoverManager />
        <Navbar />
        <main className="relative z-10">{children}</main>
        {/* Premium breathing spacer with soft glow */}
        <div className="relative w-full h-16 md:h-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-okra-bright/[0.025] to-transparent" />
        </div>
        <Footer />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: SITE_NAME,
              url: BASE_URL,
              logo: `${BASE_URL}${SITE_LOGO}`,
              foundingDate: '2024',
              location: { '@type': 'Place', name: 'Basel, Switzerland' },
              sameAs: Object.values(SOCIAL_URLS),
            }).replace(/</g, '\\u003c'),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: SITE_NAME,
              url: BASE_URL,
              description: SITE_DESCRIPTION,
            }).replace(/</g, '\\u003c'),
          }}
        />
      </body>
    </html>
  );
}
