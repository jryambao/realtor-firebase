import React from "react";
import PropTypes from "prop-types";
import { FaLocationDot } from "react-icons/fa6";
import { FaParking, c } from "react-icons/fa";
import { GiSofa } from "react-icons/gi";

export default function ListingItem({
  listing,
  id,
}) {
  return (
    <>
      <li className="relative cursor-pointer">
        <h4 className="absolute top-4 left-3 p-2 uppercase bg-blue-500 text-white">
          A month ago
        </h4>
        <div className="w-full h-52">
          <img
            className="w-full object-cover h-full hover:transition hover:scale-105"
            src={listing.imgUrls}
            alt="Property Listing"
          />
        </div>
        <div className="p-1">
          <div className="flex justify-center space-x-2 items-center">
            <FaLocationDot />
            <h4 className="text-lg text-gray-500 truncate">
              {listing.address}
            </h4>
          </div>
          <h2 className="text-2xl mt-3 mb-4 truncate">
            {listing.name}
          </h2>
          <h4>${listing.regularPrice}</h4>
          <div className="flex items-center space-x-2">
            <p className="">
              {listing.bedrooms}Beds
            </p>
            <p className="">
              {listing.bathrooms}Baths
            </p>
            <span className="">
              {listing.parking ? (
                <FaParking />
              ) : null}
            </span>
          </div>
        </div>
      </li>
    </>
  );
}

ListingItem.propTypes = {
  listing: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
};
