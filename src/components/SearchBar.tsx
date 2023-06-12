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
    <form className="flex justify-between gap-0 h-full">
      <input
        className="shadow-md px-3 rounded-l-md border-none grow focus:outline-none focus:ring-1 focus:ring-monel-blue"
        type="text"
        placeholder="Search by product name, date..."
        value={value}
        onChange={onChange}
      />
      <div className="shadow-md w-16 bg-monel-gray bg-opacity-55 rounded-r-md
        flex items-center">
        <i className="fas fa-search mx-auto"></i>
      </div>
    </form>
  );
};

export default SearchBar;