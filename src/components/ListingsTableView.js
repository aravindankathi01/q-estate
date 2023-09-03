import React, { useState } from "react";

const ListingsTableView = ({
  featuredList,
  priceRangeFilter,
  locationFilter,
  sortData,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredListings, setFilteredListings] = useState(featuredList);
  const [selectedRows, setSelectedRows] = useState([]);
  //selected rows

  //VARIABLES
  const itemsPerPage = 10;
  let displayData = applyFilters(
    filteredListings,
    priceRangeFilter,
    locationFilter,
    sortData
  );
  const totalPages = Math.ceil(displayData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  //edit funcs
  //Delete funcs
  //checkbox handler
  //pagenation handler

  //NORMAL FUNC
  //Apply all the selected filters
  function applyFilters(
    filteredListings,
    priceRangeFilter,
    locationFilter,
    sortData
  ) {
    let updated = [...filteredListings];
    if (locationFilter.length) {
      updated = updated.filter((item) => locationFilter.includes(item.city));
    }
    if (priceRangeFilter.length) {
      updated = updated.filter((item) => {
        let found = false;
        priceRangeFilter.forEach((range) => {
          const low = Number(range.split("-")[0]);
          const high = Number(range.split("-")[1]);
          if (Number(item.price) >= low && Number(item.price) <= high) {
            found = true;
          }
        });
        return found;
      });
    }
    if (sortData === "Date") {
      updated = updated.sort(
        (firstListing, secondListing) =>
          new Date(firstListing.listing_date) -
          new Date(secondListing.listing_date)
      );
    } else if (sortData === "Price") {
      updated = updated.sort(
        (firstListing, secondListing) =>
          firstListing.price - secondListing.price
      );
    }
    // console.log("updatedData", updated);
    return updated;
  }

  const generatePageNumbersArray = () => {
    let pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  return (
    <div className='w-full'>
      <table className='w-full'>
        <thead className='w-full'>
          <tr className='w-full text-start border-b-[1px] border-black h-9'>
            <th className=''>
              <input type='checkbox' checked={""} onChange={""} />
            </th>
            <th className='text-start pl-2'>Property Name</th>
            <th className='text-start pl-2'>Price</th>
            <th className='text-start pl-2'>Address</th>
            <th className='text-start pl-2'>Listing Date</th>
            <th className='text-start pl-2'>Action</th>
          </tr>
        </thead>
        <tbody className='w-full'>
          {displayData.slice(startIndex, endIndex).map((listing, index) => {
            const { property_id, property_name, address, price, listing_date } =
              listing;
            return (
              <tr
                key={property_id}
                className='w-full text-start border-b-[1px] border-black m-2 h-9'>
                <td className='text-center'>
                  <input type='checkbox' checked={""} onChange={""} />
                </td>
                <td className='text-start pl-2'>{property_name}</td>
                <td className='text-start pl-2'>{price}</td>
                <td className='text-start pl-2'>{address}</td>
                <td className='text-start pl-2'>{listing_date}</td>
                <td className='text-start pl-2'>123</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {/* footer */}
      <div className='flex flex-row justify-between p-2 items-center w-full'>
        <button className='w-2/12 bg-red-700 text-white font-medium text-base p-1 rounded-full'>
          Delete Selected
        </button>
        <div className='w-9/12 flex flex-col items-center'>
          <p className='text-base font-medium p-2'>
            page {totalPages < 1 ? 0 : currentPage} of {totalPages}
          </p>
          <div className='flex flex-row w-full text-white font-medium text-base gap-1 flex-wrap justify-center'>
            <button
              onClick={() => currentPage !== 1 && setCurrentPage(1)}
              className={
                currentPage === 1
                  ? "bg-slate-300 px-2 rounded-full"
                  : "px-2 rounded-full bg-blue-600"
              }>
              First
            </button>
            <button
              onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
              className={
                currentPage > 1
                  ? "bg-blue-600 px-2 rounded-full"
                  : "bg-slate-300 px-2 rounded-full"
              }>
              Previous
            </button>
            {generatePageNumbersArray().map((page, index) => {
              return (
                <button
                  className={
                    currentPage !== page
                      ? "px-2 rounded-full bg-blue-600"
                      : "bg-cyan-300 px-2 rounded-full"
                  }
                  key={index}
                  onClick={() => {
                    currentPage !== page && setCurrentPage(page);
                  }}>
                  {page}
                </button>
              );
            })}
            <button
              className={
                currentPage !== totalPages
                  ? "px-2 rounded-full bg-blue-600"
                  : "bg-slate-300 px-2 rounded-full"
              }
              onClick={() => {
                currentPage !== totalPages && setCurrentPage(currentPage + 1);
              }}>
              Next
            </button>
            <button
              className={
                currentPage !== totalPages
                  ? "px-2 rounded-full bg-blue-600"
                  : "bg-slate-300 px-2 rounded-full"
              }
              onClick={() => {
                currentPage !== totalPages && setCurrentPage(totalPages);
              }}>
              Last
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingsTableView;
