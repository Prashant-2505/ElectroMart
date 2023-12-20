'use client'
import React, { useEffect, useState } from "react";
import { fetchCategory } from "@/services/admin/category";

import Slider from "react-slick";
import { useRouter } from "next/navigation";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Index = () => {
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [parentCategoryIDs, setParentCategoryIDs] = useState([]);


  const route = useRouter()

  const getAllCategory = async () => {
    try {
      const { data } = await fetchCategory({ type: "category", limit: "4" });

      if (data.success) {
        setCategory(data.AllCategory);
      } else {
        console.error("Error fetching categories");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const getSubCategories = async () => {
    try {
      setSubCategory([]);

      for (const i of parentCategoryIDs) {
        const { data } = await fetchCategory({
          type: "subcategory",
          parentCategory: i,
          limit: "2",
        });

        if (data.success) {
          setSubCategory((prevSubCategory) => [
            ...prevSubCategory,
            ...data.AllCategory,
          ]);
        } else {
          console.error("Error fetching subcategories");
        }
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  useEffect(() => {
    setParentCategoryIDs(category.map((i) => i._id));
  }, [category]);

  useEffect(() => {
    if (category.length === 4) {
      getSubCategories();
    }
  }, [category]);

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1
  };
  return (

    <div>
      <div className="w-[100%] p-9">
        <Slider
          className=" w-[100%]"
          {...settings}>
          {subCategory.map((slide, i) => (
            <div className=" h-full pl-5 pr-5 overflow-hidden" key={i}
              onClick={() => route.push(`/products/${slide._id}`)}
            >
              <div className=" h-[90%] mx-3 cursor-pointer shadow-md shadow-slate-300 hover:scale-105 duration-400 ease-linear rounded-md">
                <img
                  className=" h-[80%] w-full rounded-md "
                  src={slide.photos} alt=" product photo" />
                <p className=" h-[20%] flex justify-center items-center font-semibold uppercase">{slide.name}</p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Index;

{/* <Swiper
modules={[Navigation]}
spaceBetween={50}
slidesPerView={4}
navigation
onSwiper={(swiper) => console.log(swiper)}
onSlideChange={() => console.log('slide change')}
className=" h-full  "
>
{subCategory.map((slide, i) => (
  <SwiperSlide className=" h-full pl-5 pr-5 overflow-hidden" key={i}
    onClick={() => route.push(`/products/${slide._id}`)}
  >
    <div className=" h-[90%] mx-3 cursor-pointer shadow-md shadow-slate-300 hover:scale-105 duration-400 ease-linear rounded-md">
      <img
        className=" h-[80%] w-full rounded-md "
        src={slide.photos} alt=" product photo" />
      <p className=" h-[20%] flex justify-center items-center font-semibold uppercase">{slide.name}</p>
    </div>
  </SwiperSlide>
))}
</Swiper> */}
