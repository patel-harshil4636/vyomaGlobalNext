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

// export const metadata = {
//   metadataBase: new URL(BASE_URL),
//   title: "VyomaGlobal | Website & Branding Experts",
//   description: "Grow your business online with VyomaGlobal — from design to deployment.",
// icons: {
//     icon: 'https://vyomaglobal.info/vyoma-global.png',
//     // The sizes property is where you specify the dimensions, matching your HTML
//     sizes: '16x16', 
//     type: 'image/png', // Use the correct MIME type for PNG
//   },
//   openGraph: {
//     title: "VyomaGlobal — Build Your Digital Future",
//     description: "Transform your business with VyomaGlobal.",
//     url: "https://vyomaglobal.info/",
//     images: [
//       {
//         url: "/vyoma-global.png",
//         width: 800,
//         height: 600,
//         alt: "VyomaGlobal Website Preview",
//       },
//     ],
//   },
//   twitter: {
//     card: "summary_large_image",
//     title: "VyomaGlobal | Web Experts",
//     description: "Build websites that rank & perform.",
//     images: ["/vyoma-global.png"],
//   },
// };

export const metadata = {
  title: "VyomaGlobal | Website & Branding Experts",
  description:
    "Vyoma Global empowers businesses with innovative digital solutions and professional brand strategy.",

  openGraph: {
    title: "VyomaGlobal | Website & Branding Experts",
    description:
      "Vyoma Global empowers businesses with innovative digital solutions and professional strategy.",
    url: "https://vyomaglobal.info",
    siteName: "Vyoma Global",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Vyoma Global Office",
      },
    ],
    type: "website",
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/icon.png",
    apple: "/apple-touch-icon.png",
  },
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Favicon + Logo */}
        {/* <link rel="icon" href" sizes="any" /> */}
        <link rel="icon" type="image/png" href="https://vyomaglobal.info/vyoma-global.png" />
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
