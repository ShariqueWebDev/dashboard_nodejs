import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const SwiperSlider = () => {

    const getImageformApi = async() =>{
        const res = await fetch(`http://localhost:5000/api/getImage/image`)
        const data = await res.json()
        console.log(data);
    }

    useEffect(()=>{
        getImageformApi()
    }, [])
  return (
    <div className="mt-[50px]">
    <div className="text-[30px] ml-2">Images</div>
      <div className="w-[500px] border">
        <Swiper
          spaceBetween={50}
          slidesPerView={3}
          onSlideChange={() => console.log("slide change")}
          onSwiper={(swiper) => console.log(swiper)}
        >
          <SwiperSlide>Slide 1</SwiperSlide>
          <SwiperSlide>Slide 2</SwiperSlide>
          <SwiperSlide>Slide 3</SwiperSlide>
          <SwiperSlide>Slide 5</SwiperSlide>
          <SwiperSlide>Slide 6</SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default SwiperSlider;
