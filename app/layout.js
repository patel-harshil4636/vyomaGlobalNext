import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const BASE_URL = "https://vyomaglobal.info";

export const metadata = {
  metadataBase: new URL(BASE_URL),
  title: "VyomaGlobal | Website & Branding Experts",
  description: "Grow your business online with VyomaGlobal — from design to deployment.",

  openGraph: {
    title: "VyomaGlobal — Build Your Digital Future",
    description: "Transform your business with VyomaGlobal.",
    url: "https://vyomaglobal.info/",
    images: [
      {
        url: "/vyoma-global.png",
        width: 800,
        height: 600,
        alt: "VyomaGlobal Website Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "VyomaGlobal | Web Experts",
    description: "Build websites that rank & perform.",
    images: ["/vyoma-global.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Favicon + Logo */}
        {/* <link rel="icon" href" sizes="any" /> */}
        <link rel="icon" type="image/png" href="/icon.png" />
        <link rel="apple-touch-icon" href="/icon.png" />

        {/* Google Logo Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Vyoma Global",
              url: "https://vyomaglobal.info",
              logo: "https://vyomaglobal.info/icon.png",
            }),
          }}
        />
      </head>

      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
