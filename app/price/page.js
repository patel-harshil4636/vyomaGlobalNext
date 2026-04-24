import VyomaPricing from "@/components/Price";

function page() {
  return (
    <>
    <VyomaPricing></VyomaPricing>
    </>
  )
}

export default page
const BASE_URL = "https://vyomaglobal.info";

export const metadata = {
  metadataBase: new URL(BASE_URL),

  title: {
    default: "Pricing Plans | VyomaGlobal Website & Social Media Packages",
    template: "%s | VyomaGlobal",
  },

  description:
    "Explore VyomaGlobal pricing plans for website development, social media management, branding, eCommerce solutions, and business growth packages tailored for startups, local businesses, and premium brands.",

  keywords: [
    "VyomaGlobal pricing",
    "website development pricing",
    "social media management packages",
    "business website cost",
    "eCommerce website pricing",
    "branding package pricing",
    "website development packages India",
    "digital marketing pricing",
    "portfolio website pricing",
    "premium website package",
    "social media marketing plans",
    "Ahmedabad website agency pricing",
  ],

  authors: [
    {
      name: "VyomaGlobal",
      url: BASE_URL,
    },
  ],

  creator: "VyomaGlobal",
  publisher: "VyomaGlobal",

  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  alternates: {
    canonical: "/price",
  },

  openGraph: {
    type: "website",
    locale: "en_IN",
    url: `${BASE_URL}/price`,
    siteName: "VyomaGlobal",
    title: "VyomaGlobal Pricing | Website & Social Media Growth Packages",
    description:
      "Choose from premium website development, branding, and social media management plans built for serious business growth.",
    images: [
      {
        url: "/vyoma-global.png",
        width: 1200,
        height: 630,
        alt: "VyomaGlobal Pricing Plans",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "VyomaGlobal Pricing Plans",
    description:
      "Website packages, eCommerce solutions, branding, and social media growth plans for every business stage.",
    images: ["/vyoma-global.png"],
    creator: "@vyomaglobal",
  },

  category: "Business",
};