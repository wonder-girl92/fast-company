import React from "react";
import PropTypes from "prop-types";

function Bookmark({ status, ...rest }) {
  return (
    <button {...rest}>
      <i className={"bi bi-bookmark" + (status ? "-fill" : "")}> </i>
    </button>
  );
}

Bookmark.propTypes = {
  status: PropTypes.bool
};

export default Bookmark;
