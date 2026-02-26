import ClientPortal from "@/components/Client/ClientPortal"

function page() {
  return (
    <>
        <ClientPortal></ClientPortal>
    </>
  )
}

export default page


const BASE_URL = 'https://vyomaglobal.info';

export const metadata = {
  metadataBase: new URL(BASE_URL),
  title: "Client Portal Login | VyomaGlobal",
  description: "Secure access to your VyomaGlobal client dashboard. View performance metrics, manage tasks, and access your digital resources.",
  robots: {
    index: false, // CRITICAL: Do not index private login pages
    follow: false,
    nocache: true, // Prevents search engines from caching the login screen
  },
  icons: {
    icon: '/vyoma-global.png', // Relative paths are better if the file is in your /public folder
    sizes: '16x16', 
    type: 'image/png',
  },
  openGraph: {
    title: "Client Portal | VyomaGlobal",
    description: "Secure client login for VyomaGlobal partners.",
    url: `${BASE_URL}/clients`,
    siteName: "VyomaGlobal",
    images: [
      {
        url: "/vyoma-global.png",
        width: 800,
        height: 600,
        alt: "VyomaGlobal Client Portal",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary", // 'summary' is enough for a login page; no need for a massive image
    title: "Client Portal | VyomaGlobal",
    description: "Secure access for VyomaGlobal clients.",
    images: ["/vyoma-global.png"],
  },
};