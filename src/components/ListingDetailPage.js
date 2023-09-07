import React, { useEffect, useState } from "react";
import Header from "./Header";
import { useParams } from "react-router-dom";
import config from "../utils/config";
import detail from "../assets/real-estate-detail.jpg";
import Footer from "./Footer";

const ListingDetailPage = () => {
  const { property_id } = useParams();
  const [property, setProperty] = useState(null);

  useEffect(() => {
    fetchFeaturedListings();
  }, []);

  async function fetchFeaturedListings() {
    try {
      const response = await fetch(
        config.backendEndPoint + "/real-estate-data"
      );
      const data = await response.json();
      setProperty(
        data.listings.find((item) => item.property_id === Number(property_id))
      );
    } catch (error) {
      console.log("API FAILURE");
      console.error(error);
    }
  }
  console.log(property);
  //   const { property_name, city, price, image } = property;
  return (
    <div>
      <Header />
      {property && (
        <div className='w-[85vw] flex flex-col lg:flex-row mx-auto mt-14 gap-20'>
          <img
            alt='detail'
            src={detail}
            className='object-cover lg:w-1/2'></img>
          <div className='flex flex-col gap-y-10'>
            <h1 className='font-bold text-5xl'>{property.property_name}</h1>
            <p className='font-[450px]'>
              Aenean lectus. Pellentesque eget nunc. Donec quis orci eget orci
              vehicula condimentum. Curabitur in libero ut massa volutpat
              convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt
              in, leo. Maecenas pulvinar lobortis est. Phasellus sit amet erat.
              Nulla tempus. Vivamus in felis eu sapien cursus vestibulum. Lorem
              ipsum, dolor sit amet consectetur adipisicing elit. Delectus,
              obcaecati pariatur laborum soluta voluptatum nostrum aut illo
              consectetur molestiae. Tempora, sequi recusandae dolore
              necessitatibus temporibus molestiae rerum corrupti, nulla maiores
              repudiandae enim perspiciatis odit, natus accusantium quidem
              blanditiis delectus eum repellat saepe? Numquam quibusdam
              asperiores tenetur fugiat quam consectetur quidem?
            </p>
            <p className='font-medium text-3xl'>Contact</p>
            <div className='flex lg:justify-between flex-start gap-10 items-center'>
              <div className='font-medium text-lg'>
                <p>Agent Name:</p>
                <p>Email:</p>
              </div>
              <div className='font-medium text-slate-800 text-base'>
                <p>Rajvenkat</p>
                <p>Rajvenkat@gmail.com</p>
              </div>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default ListingDetailPage;
