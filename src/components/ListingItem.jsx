import React from "react";
import PropTypes from "prop-types";

export default function ListingItem({
  listing,
  id,
}) {
  return (
    <>
      <li>
        <h3>{listing.name}</h3>
      </li>
    </>
  );
}

ListingItem.propTypes = {
  listing: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
};
