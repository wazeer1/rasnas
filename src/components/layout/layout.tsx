import { NextSeo } from "next-seo";
import Header from "@components/layout/header/header";
import Footer from "@components/layout/footer/footer";
import MobileNavigation from "@components/layout/mobile-navigation/mobile-navigation";
import Search from "@components/common/search";
import CookieBar from "@components/common/cookie-bar";
import { useAcceptCookies } from "@utils/use-accept-cookies";
import Button from "@components/ui/button";
import { useTranslation } from "next-i18next";

export default function Layout({ children }: React.PropsWithChildren<{}>) {
  const { acceptedCookies, onAcceptCookies } = useAcceptCookies();
  const { t } = useTranslation("common");
  return (
    <div className="flex flex-col min-h-screen bg-body">
    {/* <div className="flex flex-col min-h-screen bg-[#0e4e3f]">÷ */}
      <NextSeo
        additionalMetaTags={[
          {
            name: "viewport",
            content: "width=device-width, initial-scale=1.0",
          },
        ]}
        title="RASNAS ladies boutique"
        description="Rasnas is an exclusive online boutique that offers a curated collection of stylish and elegant clothing for girls and women. Our platform provides an exceptional shopping experience with high-quality, trendy, and timeless fashion pieces tailored to every taste and occasion. From chic casuals to exquisite traditional wear, Rasnas is committed to delivering quality, variety, and sophistication, making every outfit a unique statement. Discover the latest in fashion and elevate your style with our handpicked selection designed to bring out the best in every woman."
        canonical="https://chawkbazar.vercel.app/"
        openGraph={{
          url: "https://rasnasboutique.com",
          title: "RASNAS BOUTIQUE",
          description:
            "Fastest E-commerce template built with React, NextJS, TypeScript, @tanstack/react-query and Tailwind CSS.",
          images: [
            {
              url: "/assets/images/og-image-01.png",
              width: 800,
              height: 600,
              alt: "Og Image Alt",
            },
            {
              url: "/assets/images/og-image-02.png",
              width: 900,
              height: 800,
              alt: "Og Image Alt Second",
            },
          ],
        }}
      />
      <Header />
      <main
        className="relative flex-grow"
        style={{
          minHeight: "-webkit-fill-available",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {children}
      </main>
      <Footer />
      <MobileNavigation />
      <Search />
      <CookieBar
        title={t("text-cookies-title")}
        hide={acceptedCookies}
        action={
          <Button onClick={() => onAcceptCookies()} variant="slim">
            {/* @ts-ignore */}
            {t("text-accept-cookies")}
          </Button>
        }
      />
    </div>
  );
}
