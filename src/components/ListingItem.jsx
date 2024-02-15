import React from "react";
import PropTypes from "prop-types";
import { FaLocationDot } from "react-icons/fa6";
import { FaParking, c } from "react-icons/fa";
import { GiSofa } from "react-icons/gi";
import { Link } from "react-router-dom";
import Moment from "react-moment";
export default function ListingItem({
  listing,
  id,
}) {
  return (
    <>
      <li className="relative cursor-pointer shadow-md rounded-md bg-white overflow-hidden">
        <Link
          to={`/category/${listing.type}/${id}`}
        >
          <h4 className="absolute top-4 left-3 p-2 uppercase bg-blue-500 text-white z-10">
            <Moment fromNow>
              {listing.timestamp?.toDate()}
            </Moment>
          </h4>
          <div className="w-full h-52 overflow-hidden">
            <img
              className="w-full object-cover h-full hover:transition hover:scale-110 ease-in-out duration-300"
              src={listing.imgUrls}
              alt="Property Listing"
            />
          </div>
          <div className="p-1">
            <div className="flex justify-start space-x-2 items-center">
              <FaLocationDot />
              <h4 className="text-lg text-gray-500 truncate">
                {listing.address}
              </h4>
            </div>
            <h2 className="text-2xl mt-3 mb-4 truncate">
              {listing.name}
            </h2>
            <h4>
              $
              {listing.offer
                ? listing.discountedPrice
                    .toString()
                    .replace(
                      /\B(?=(\d{3})+(?!\d))/g,
                      ","
                    )
                : listing.regularPrice
                    .toString()
                    .replace(
                      /\B(?=(\d{3})+(?!\d))/g,
                      ","
                    )}
              {listing.type === "rent" &&
                " / month"}
            </h4>
            <div className="flex items-center space-x-2">
              <p className="">
                {listing.bedrooms > 1
                  ? `${listing.bedrooms} Beds`
                  : "1 Bed"}
              </p>
              <p className="">
                {listing.bathrooms > 1
                  ? `${listing.bathrooms} Baths`
                  : "1 Bath"}
              </p>
              <span className="">
                {listing.parking ? (
                  <FaParking />
                ) : null}
              </span>
            </div>
          </div>
        </Link>
      </li>
    </>
  );
}

ListingItem.propTypes = {
  listing: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
};
