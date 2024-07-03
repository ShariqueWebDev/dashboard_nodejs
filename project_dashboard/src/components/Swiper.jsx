import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { BASE_URL } from "../utils/baseUrl";
import "swiper/css";

const SwiperSlider = ({imageData}) => {
  // const [image, setImage] = useState([])




  return (
    <div className="mt-[50px]">
     {imageData.length > 0 ? <div className="border rounded-3xl " >
        <Swiper
          className="cursor-pointer"
          // spaceBetween={50}
          loop={true}
          slidesPerView={1}
          onSlideChange={() => console.log("slide change")}
          style={{maxWidth:'750px', height:"500px", borderRadius:"24px" }}
          onSwiper={(swiper) => console.log(swiper)}
        >
          {imageData?.map((i) => {
          
            const { id, image_path } = i;
            console.log(id, image_path, "IMAGE DATA");
            return (
              <div>
                <SwiperSlide key={id}>
                  <img src={`${BASE_URL}/${image_path}`} className="" />
                </SwiperSlide>
              </div>
            );
          })}
        </Swiper>
      </div>:<div className="text-[20px] h-[150px] flex justify-center items-center border w-[750px] rounded-2xl">{"No Image Preview"}</div>}
    </div>
  );
};

export default SwiperSlider;
