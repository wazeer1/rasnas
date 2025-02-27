import BannerCard from "@components/common/banner-card";
import Carousel from "@components/ui/carousel/carousel";
import { SwiperSlide } from "swiper/react";
import { promotionBanner } from "@framework/static/banner";
import { ROUTES } from "@utils/routes";
import { useFetchBanner } from "@framework/banners/get-banners";

interface BannerProps {
	className?: string;
	section?: number;
}

const breakpoints = {
	"0": {
		slidesPerView: 2,
	},
};



const BannerSliderBlock: React.FC<BannerProps> = ({
	className = "mb-12 md:mb-14 xl:mb-16",
	section
}) => {
	const { data, isLoading, isError, error } = useFetchBanner({ section: section });
console.log(data,'____data____');

	return (
		<div className={`${className} mx-auto max-w-[1920px] overflow-hidden`}>
			<div className="-mx-32 sm:-mx-44 lg:-mx-60 xl:-mx-72 2xl:-mx-80">
				<Carousel
					breakpoints={breakpoints}
					centeredSlides={true}
					loop={true}
					autoplay={{
						delay: 4000,
					}}
					pagination={{
						clickable: true,
					}}
					paginationVariant="circle"
					buttonGroupClassName="hidden"
				>
					{data?.map((banner: any) => (
						<SwiperSlide
							key={`banner--key${banner.id}`}
							className="px-1.5 md:px-2.5 xl:px-3.5"
						>
							<BannerCard
								banner={banner}
								effectActive={true}
								href={`${ROUTES.COLLECTIONS}/${banner.slug}`}
							/>
						</SwiperSlide>
					))}
				</Carousel>
			</div>
		</div>
	);
};

export default BannerSliderBlock;
