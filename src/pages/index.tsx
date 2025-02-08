import BannerCard from "@components/common/banner-card";
import Container from "@components/ui/container";
import BrandGridBlock from "@containers/brand-grid-block";
import CategoryBlock from "@containers/category-block";
import Layout from "@components/layout/layout";
import BannerWithProducts from "@containers/banner-with-products";
import BannerBlock from "@containers/banner-block";
import Divider from "@components/ui/divider";
import DownloadApps from "@components/common/download-apps";
import Support from "@components/common/support";
import Instagram from "@components/common/instagram";
import ProductsFlashSaleBlock from "@containers/product-flash-sale-block";
import ProductsFeatured from "@containers/products-featured";
import BannerSliderBlock from "@containers/banner-slider-block";
import ExclusiveBlock from "@containers/exclusive-block";
import Subscription from "@components/common/subscription";
import NewArrivalsProductFeed from "@components/product/feeds/new-arrivals-product-feed";
import { homeThreeBanner as banner } from "@framework/static/banner";
import { homeThreeMasonryBanner as masonryBanner } from "@framework/static/banner";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { ROUTES } from "@utils/routes";
import { GetStaticProps } from "next";
import { useEffect, useState } from "react";
import { analytics } from "@utils/firebase";

export default function Home() {
  // const [locationStatus, setLocationStatus] = useState<LocationStatus | null>(
  //   null
  // );

  // // Define the approximate latitude and longitude ranges for Kuwait and India
  // const isInKuwait = (latitude: number, longitude: number) =>
  //   latitude >= 28.5246 &&
  //   latitude <= 30.1037 &&
  //   longitude >= 46.5527 &&
  //   longitude <= 48.4169;

  // const isInIndia = (latitude: number, longitude: number) =>
  //   latitude >= 8.4 &&
  //   latitude <= 37.6 &&
  //   longitude >= 68.7 &&
  //   longitude <= 97.25;

  // useEffect(() => {
  //   const checkLocation = () => {
  //     if (navigator.geolocation) {
  //       navigator.geolocation.getCurrentPosition(
  //         (position) => {
  //           const { latitude, longitude } = position.coords;

  //           if (isInKuwait(latitude, longitude)) {
  //             setLocationStatus("Kuwait");
  //           } else if (isInIndia(latitude, longitude)) {
  //             setLocationStatus("India");
  //           } else {
  //             setLocationStatus("Outside Kuwait and India");
  //           }
  //         },
  //         (error) => {
  //           console.error("Geolocation error:", error);
  //           setLocationStatus("Permission Denied");
  //         }
  //       );
  //     } else {
  //       console.error("Geolocation not supported");
  //     }
  //   };

  //   checkLocation();
  // }, []);

  useEffect(() => {
    if (analytics) {
      // Use analytics for tracking events, etc.
      console.log("Firebase Analytics initialized");
    }
  }, []);

  return (
    <>
      {/* <BannerBlock data={masonryBanner} /> */}
      <Container>
        <ProductsFlashSaleBlock date={"2024-12-01T01:02:03"} />
      </Container>
      <BannerSliderBlock section={1} />
      <Container>
        {/* <CategoryBlock sectionHeading="text-shop-by-category" type="rounded" /> */}
        {/* <ProductsFeatured sectionHeading="text-featured-products" limit={5} /> */}
        {/* <BannerCard
          key={`banner--key${banner[1].id}`}
          banner={banner[1]}
          section={2}
          href={`${ROUTES.COLLECTIONS}/${banner[1].slug}`}
          className="mb-12 lg:mb-14 xl:mb-16 pb-0.5 lg:pb-1 xl:pb-0"
        /> */}
        {/* <BannerWithProducts
          sectionHeading="text-on-selling-products"
          categorySlug="/search"
        /> */}
        {/* <ExclusiveBlock /> */}
        <NewArrivalsProductFeed />
        {/* <DownloadApps /> */}
        <Support />
        <Instagram />
        {/* <Subscription className="px-5 py-12 bg-opacity-0 sm:px-16 xl:px-0 md:py-14 xl:py-16" /> */}
      </Container>
      <Divider className="mb-0" />
    </>
  );
}

Home.Layout = Layout;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, [
        "common",
        "forms",
        "menu",
        "footer",
      ])),
    },
  };
};
