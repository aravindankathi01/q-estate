import React, { useEffect, useState } from "react";
import Header from "./Header";
import Dropdown from "./Dropdown";
import CheckBox from "./CheckBox";
import config from "../utils/config";
import ListingsTableView from "./ListingsTableView";

const Explore = () => {
  const [locationFilter, setLocationFilter] = useState([]);
  const [priceRangeFilter, setPriceRangeFilter] = useState([]);
  const [sortData, setSortData] = useState("");

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
      setFeaturedList(data.listings);
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
      <div>
        <Header page='explore' />
      </div>
      <div className='col-start-1 col-span-4 h-2/6 w-[30vw] mx-auto mt-24 mb-5'>
        <Dropdown handleSortChange={handleSortChange} />
      </div>
      <div className='w-[85vw] mx-auto h-[80vh] grid md:grid-cols-4 gap-2 grid-cols-1'>
        <div className=''>
          <CheckBox
            handleLocationFilterChange={handleLocationFilterChange}
            handlePriceFilterChange={handlePriceFilterChange}
            locationFilter={locationFilter}
            priceRangeFilter={priceRangeFilter}
          />
        </div>
        <div className='md:col-start-2 md:col-span-3 border-2 border-pink-500'>
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
    </>
  );
};

export default Explore;
