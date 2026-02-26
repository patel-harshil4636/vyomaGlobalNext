import Footer from "@/components/Home/Footer";
import Hero from "@/components/Home/Hero";
import HomePage from "@/components/Home/HomePage";
import Main from "@/components/Home/Main";
import Nav from "@/components/Home/Nav";
// import { Main } from "next/document";
import Image from "next/image";



export default function Home() {
  return (
  <>
  <HomePage></HomePage>
      {/* <Nav></Nav>
      <Hero></Hero>
      <Main></Main>
      <Footer></Footer> */}
  </>
  );
}

const BASE_URL = 'https://vyomaglobal.info';

export const metadata = {
  robots: {
    index: true, 
    follow: true,
  },
  metadataBase: new URL(BASE_URL),
  title: "VyomaGlobal | Website & Branding Experts",
  description: "Grow your business online with VyomaGlobal — from design to deployment.",
  icons: {
    icon: 'https://vyomaglobal.info/vyoma-global.png',
    // The sizes property is where you specify the dimensions, matching your HTML
    sizes: '16x16', 
    type: 'image/png', // Use the correct MIME type for PNG
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
