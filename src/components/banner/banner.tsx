import { Swiper, SwiperSlide } from 'swiper/react';
import { useAppSelector } from '../../store/hooks';
import Promo from '../promo/promo';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './style.css';
import { selectPromo } from '../../store/promo-process/selectors';

export default function Banner () {
  const promo = useAppSelector(selectPromo);
  return (promo &&
    <Swiper
      spaceBetween={30}
      centeredSlides
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
      navigation
      modules={[Autoplay, Pagination, Navigation]}
      className="mySwiper"
      data-testid='banner'
    >
      {promo.map((item) => (
        <SwiperSlide key={item.id} data-testid='banner-item'>
          <Promo promo={item} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
