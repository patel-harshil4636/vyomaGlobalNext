import Footer from "@/components/Home/Footer";
import Hero from "@/components/Home/Hero";
import Main from "@/components/Home/Main";
import Nav from "@/components/Home/Nav";
// import { Main } from "next/document";
import Image from "next/image";

export default function Home() {
  return (
  <>
      <Nav></Nav>
      <Hero></Hero>
      <Main></Main>
      <Footer></Footer>
  </>
  );
}



export const metadata = {
  title: "VyomaGlobal | Website & Branding Experts",
  description: "Grow your business online with VyomaGlobal — from design to deployment.",
  openGraph: {
    title: "VyomaGlobal — Build Your Digital Future",
    description: "Transform your business with VyomaGlobal.",
    url: "https://vyomaglobal.info/",
    images: [
      {
        url: "https://vyomaglobal.info/Vyoma%20Global.png",
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
    images: ["https://vyomaglobal.info/Vyoma%20Global.png"],
  },
};
