import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { StoreRootState, setSearchTerm } from "../../store";

const SearchBar: React.FC = () => {
  const dispatch = useDispatch();
  const value = useSelector((state: StoreRootState) => state.search.searchTerm);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchTerm(event.target.value));
  };

  return (
    <div className="flex justify-around gap-0 h-full sm:w-full">
      <input
        className="shadow-md pl-3 rounded-l-md border-none sm:w-full w-[60%] grow focus:outline-none focus:ring-1 focus:ring-monel-blue"
        type="text"
        placeholder="Search name"
        value={value}
        onChange={onChange}
      />
      <div className="shadow-md sm:px-4 px-2 bg-monel-gray bg-opacity-55 rounded-r-md
        flex items-center">
        <i className="fas fa-search mx-auto"></i>
      </div>
    </div>
  );
};

export default SearchBar;