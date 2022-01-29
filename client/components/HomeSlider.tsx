import Slider from '@farbenmeer/react-spring-slider';
import dynamic from 'next/dynamic';
import { FC } from 'react';
import bullet from './SliderBullet';
// import SliderItem from './SliderItem';
const SliderItem = dynamic(() => import('./SliderItem'), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});
const HomeSlider: FC = () => {
  return (
    <div className="relative w-full h-[26rem]">
      <Slider auto={6000} hasBullets BulletComponent={bullet} hasArrows>
        <SliderItem ImageSrc="/slide_1.webp" LinkHref="/" />
        <SliderItem ImageSrc="/slide_2.webp" LinkHref="/" />
        <SliderItem ImageSrc="/slide_3.webp" LinkHref="/" />
      </Slider>
    </div>
  );
};

export default HomeSlider;
