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
icons: {
    // This assumes 'vyoma-global.png' is in your /public directory
    icon: '/vyoma-global.png', 
    // Recommended size for Google: 48x48 or 96x96
    sizes: '48x48', 
    type: 'image/png', 
  },
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

      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
