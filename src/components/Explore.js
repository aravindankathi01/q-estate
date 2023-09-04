import React, { useEffect, useState } from "react";
import Header from "./Header";
import Dropdown from "./Dropdown";
import CheckBox from "./CheckBox";
import config from "../utils/config";
import ListingsTableView from "./ListingsTableView";
import Footer from "./Footer";

const Explore = () => {
  const [locationFilter, setLocationFilter] = useState([]);
  const [priceRangeFilter, setPriceRangeFilter] = useState([]);
  const [sortData, setSortData] = useState("");

  const [featuredList, setFeaturedList] = useState(null);

  useEffect(() => {
    fetchFeaturedListings();
  }, []);

  const uniqueFeaturedLists = ([...lists]) => {
    let unique = {};
    const filtered = lists.filter((item) => {
      if (unique.hasOwnProperty(item.property_id)) {
        return false;
      } else {
        unique[item.property_id] = true;
        return true;
      }
    });
    return filtered;
  };

  async function fetchFeaturedListings() {
    try {
      const response = await fetch(
        config.backendEndPoint + "/real-estate-data"
      );
      const data = await response.json();

      setFeaturedList(uniqueFeaturedLists(data.listings));
    } catch (error) {
      console.log("API FAILURE");
      console.error(error);
    }
  }

  const handleLocationFilterChange = (event) => {
    if (event.target.checked) {
      setLocationFilter([...locationFilter, event.target.value]);
    } else {
      setLocationFilter(
        locationFilter.filter((location) => location !== event.target.value)
      );
    }
  };
  const handlePriceFilterChange = (event) => {
    if (event.target.checked) {
      setPriceRangeFilter([...priceRangeFilter, event.target.value]);
    } else {
      setPriceRangeFilter(
        priceRangeFilter.filter((price) => price !== event.target.value)
      );
    }
  };
  const handleSortChange = (event) => {
    setSortData(event.target.value);
  };
  return (
    <>
      <div className=''>
        <Header page='explore' />
      </div>
      <div className='col-start-1 col-span-4 h-2/6 w-[48vw] mx-auto mt-9 mb-3'>
        <Dropdown handleSortChange={handleSortChange} />
      </div>
      <div className='md:w-[85vw] md:mx-auto w-full h-min grid md:grid-cols-4 gap-2 grid-cols-1 place-items-center md:place-items-baseline'>
        <div className=''>
          <CheckBox
            handleLocationFilterChange={handleLocationFilterChange}
            handlePriceFilterChange={handlePriceFilterChange}
            locationFilter={locationFilter}
            priceRangeFilter={priceRangeFilter}
          />
        </div>
        <div className='md:col-start-2 md:col-span-3 border-2 border-pink-500 w-full'>
          {featuredList && (
            <ListingsTableView
              featuredList={featuredList}
              priceRangeFilter={priceRangeFilter}
              locationFilter={locationFilter}
              sortData={sortData}
            />
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Explore;
