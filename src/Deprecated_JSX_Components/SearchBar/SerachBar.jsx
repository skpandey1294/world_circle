import React from "react";
import SearchField from "react-search-field";

const SerachBar = ({ onChange, onEnter }) => {
  return (
    <SearchField
      classNames="test-class"
      placeholder="Search for a country..."
      onChange={onChange}
      onEnter={onEnter}
      onSearchClick={onEnter}
    />
  );
};

export default SerachBar;
