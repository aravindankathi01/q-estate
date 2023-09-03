import React, { useEffect, useState } from "react";
import config from "../utils/config";
import image1 from "../assets/real-estate-0.jpg";
import image2 from "../assets/real-estate-1.jpg";
import image3 from "../assets/real-estate-2.jpg";
import image4 from "../assets/real-estate-3.jpg";
import image5 from "../assets/real-estate-4.jpg";
import image6 from "../assets/real-estate-5.jpg";
import image7 from "../assets/real-estate-6.jpg";
import image8 from "../assets/real-estate-7.jpg";

import FeaturedCard from "./FeaturedCard";
const Featured = () => {
  const IMAGES = [
    image1,
    image2,
    image3,
    image4,
    image5,
    image6,
    image7,
    image8,
  ];
  const [featuredList, setFeaturedList] = useState(null);

  useEffect(() => {
    fetchFeaturedListings();
  }, []);

  async function fetchFeaturedListings() {
    try {
      const response = await fetch(
        config.backendEndPoint + "/real-estate-data"
      );
      const data = await response.json();
      setFeaturedList(data.listings.slice(0, 8));
    } catch (error) {
      console.log("API FAILURE");
      console.error(error);
    }
  }
  console.log(featuredList);
  return (
    <div className='w-[80vw] mx-auto'>
      <h1 className='font-semibold text-4xl my-10'>
        Here are some of our featured listings:
      </h1>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8'>
        {featuredList ? (
          featuredList.map((item, index) => {
            return <FeaturedCard {...item} image={IMAGES[index]} />;
          })
        ) : (
          <p className='font-medium text-lg text-slate-800'>
            No Featured Listings Found!
          </p>
        )}
      </div>
    </div>
  );
};

export default Featured;
