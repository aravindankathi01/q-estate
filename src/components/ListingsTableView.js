import React, { useEffect, useState } from "react";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import EditModel from "./EditModel";
import { useNavigate } from "react-router-dom";
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
  const [editingItem, setEditingItem] = useState({});
  const [isEditModelOpen, setIsEditModelOpen] = useState(false);
  const navigate = useNavigate();

  //VARIABLES
  const itemsPerPage = 10;
  const isAllSelected = selectedRows.length === itemsPerPage;
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
  const handleEdit = (listing) => {
    setIsEditModelOpen(!isEditModelOpen);
    // setIsEditModelOpen(true);
    setEditingItem(listing);
  };
  const handleEditSave = (editedItem) => {
    const updatedData = [...filteredListings];
    const indexToBeEdited = updatedData.findIndex(
      (data) => data.property_id === editedItem.property_id
    );
    if (indexToBeEdited !== -1) {
      updatedData[indexToBeEdited] = editedItem;
      setFilteredListings(updatedData);
    }
    handleEditCancel();
  };
  const handleEditCancel = () => {
    setIsEditModelOpen(false);
    setEditingItem(null);
  };

  //Delete funcs
  const handleDelete = (property_id) => {
    const updated = filteredListings.filter(
      (item) => item.property_id !== property_id
    );
    const updatedTotalPages = Math.ceil(updated.length / itemsPerPage);
    if (currentPage > updatedTotalPages) {
      setCurrentPage(updatedTotalPages);
    }
    setFilteredListings(updated);
    setSelectedRows([]);
  };
  const handleDeleteAllSelected = () => {
    if (selectedRows.length === 0) {
      return;
    }
    const updated = filteredListings.filter(
      (item) => !selectedRows.includes(item.property_id)
    );
    const updatedTotalPages = Math.ceil(updated.length / itemsPerPage);
    if (currentPage > updatedTotalPages) {
      setCurrentPage(updatedTotalPages);
    }
    setFilteredListings(updated);
    setSelectedRows([]);
  };
  //checkbox handler
  const handleRowCheckBoxChange = (event, id) => {
    let isChecked = event.target.checked;
    if (isChecked) {
      setSelectedRows([...selectedRows, id]);
    } else {
      setSelectedRows(selectedRows.filter((property_id) => property_id !== id));
    }
  };
  const handleSelectAll = (event, displayData) => {
    let isAllChecked = event.target.checked;
    if (isAllChecked) {
      const startIndex = (currentPage - 1) * itemsPerPage;
      const rows = [];
      for (let i = startIndex; i < startIndex + itemsPerPage; i++) {
        if (i < displayData.length) {
          rows.push(displayData[i].property_id);
        } else {
          rows.push(Math.random());
        }
      }
      setSelectedRows(rows);
    } else {
      setSelectedRows([]);
    }
  };

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

  //pagenation handler
  const generatePageNumbersArray = () => {
    let pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  useEffect(() => {
    setCurrentPage(1);
    setSelectedRows([]);
  }, [locationFilter, priceRangeFilter]);

  return (
    <div className='w-full mb-5'>
      <table className='w-full border-[1px] border-[#e9e9e9] bg-white'>
        <thead className='w-full'>
          <tr className='w-full text-start bg-[#f5f5f5]'>
            <th className='text-start p-2 border-[1px] border-[#e9e9e9]'>
              <input
                type='checkbox'
                checked={isAllSelected}
                onChange={(event) => {
                  handleSelectAll(event, displayData);
                }}
              />
            </th>
            <th className='text-start p-2 border-[1px] border-[#e9e9e9]'>
              Property Name
            </th>
            <th className='text-start p-2 border-[1px] border-[#e9e9e9]'>
              Price
            </th>
            <th className='text-start p-2 border-[1px] border-[#e9e9e9]'>
              Address
            </th>
            <th className='text-start p-2 border-[1px] border-[#e9e9e9]'>
              Listing Date
            </th>
            <th className='text-start p-2 border-[1px] border-[#e9e9e9]'>
              Action
            </th>
          </tr>
        </thead>
        <tbody className='w-full'>
          {displayData.slice(startIndex, endIndex).map((listing) => {
            console.log("button", startIndex, endIndex);
            const { property_id, property_name, address, price, listing_date } =
              listing;
            return (
              <tr
                key={property_id}
                onClick={() => navigate("/detail/" + property_id)}
                className='w-full text-start hover:bg-gray-300 cursor-pointer'>
                <td className='text-start p-2 border-[1px] border-[#e9e9e9]'>
                  <input
                    type='checkbox'
                    className='cursor-pointer'
                    checked={selectedRows.includes(property_id)}
                    onChange={(event) =>
                      handleRowCheckBoxChange(event, property_id)
                    }
                    onClick={(event) => event.stopPropagation()}
                  />
                </td>
                <td className='text-start p-2 border-[1px] border-[#e9e9e9]'>
                  {property_name}
                </td>
                <td className='text-start p-2 border-[1px] border-[#e9e9e9]'>
                  {price}
                </td>
                <td className='text-start p-2 border-[1px] border-[#e9e9e9]'>
                  {address}
                </td>
                <td className='text-start p-2 border-[1px] border-[#e9e9e9]'>
                  {listing_date}
                </td>
                <td className='border-[1px] border-[#e9e9e9]'>
                  <div className='flex justify-evenly items-center'>
                    <AiFillDelete
                      className='cursor-pointer'
                      onClick={(event) => {
                        handleDelete(property_id);
                        event.stopPropagation();
                      }}
                    />
                    <AiFillEdit
                      className='cursor-pointer'
                      onClick={(event) => {
                        handleEdit(listing);
                        event.stopPropagation();
                      }}
                    />
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {/* footer */}
      <div className='flex md:flex-row flex-col justify-between p-2 items-center w-full'>
        <button
          className='w-2/12 min-w-min bg-red-700 text-white font-medium text-base p-1 rounded-full'
          onClick={handleDeleteAllSelected}>
          Delete Selected
        </button>
        <div className='w-9/12 flex flex-col items-center'>
          <p className='text-base font-medium p-2'>
            page {totalPages < 1 ? 0 : currentPage} of {totalPages}
          </p>
          <div className='flex flex-row w-full text-white font-medium text-base gap-1 flex-wrap justify-center'>
            <button
              onClick={() => {
                if (currentPage !== 1) {
                  setCurrentPage(1);
                  setSelectedRows([]);
                }
              }}
              className={
                currentPage === 1
                  ? "bg-slate-300 px-2 rounded-full"
                  : "px-2 rounded-full bg-blue-600"
              }>
              First
            </button>
            <button
              onClick={() => {
                if (currentPage > 1) {
                  setCurrentPage(currentPage - 1);
                  setSelectedRows([]);
                }
              }}
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
                    if (currentPage !== page) {
                      setCurrentPage(page);
                      setSelectedRows([]);
                    }
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
                if (currentPage !== totalPages) {
                  setCurrentPage(currentPage + 1);
                  setSelectedRows([]);
                }
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
                if (currentPage !== totalPages) {
                  setCurrentPage(totalPages);
                  setSelectedRows([]);
                }
              }}>
              Last
            </button>
          </div>
        </div>
      </div>

      {isEditModelOpen && (
        <EditModel
          handleEditSave={handleEditSave}
          handleEditCancel={handleEditCancel}
          editingItem={editingItem}
        />
      )}
    </div>
  );
};

export default ListingsTableView;
