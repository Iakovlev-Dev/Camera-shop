import { Swiper, SwiperSlide } from 'swiper/react';
import { selectPromo } from '../../store/data-card-process/selectors';
import { useAppSelector } from '../../store/hooks';
import Promo from '../promo/promo';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './style.css';

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
    >
      <SwiperSlide>
        <Promo promo={promo[0]}/>
      </SwiperSlide>
      <SwiperSlide>
        <Promo promo={promo[1]}/>
      </SwiperSlide>
      <SwiperSlide>
        <Promo promo={promo[2]}/>
      </SwiperSlide>
    </Swiper>
  );
}
