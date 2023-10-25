"use client";

import { apiHelper } from "@/lib/apiClient";
import { CorporatedataApis } from "@/services/generalApis";
import { SearchIcon, X } from "lucide-react";
import { useState } from "react";
import { toast } from "react-hot-toast";

const Search = () => {
  const [searchFor, setSearchFor] = useState("Mobile");
  const [searchTerm, setSearchTerm] = useState();
  const [toggleDropdown, setToggleDropdown] = useState(false);
  const [showMenuSidebar, setShowMenuSidebar] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  console.log(searchFor);

  const handleSearchParamChange = (searchParam) => {
    setSearchFor(searchParam);
    setToggleDropdown(false);
    // setSearchTerm("");
  };

  const handleClear = () => {
    setSearchTerm("");
    // setMemberProgramData([]);
  };

  const handleSearchInputChange = (e) => {
    if (
      (searchFor == "Mobile" || searchFor == "MemberId") &&
      e.target.value &&
      isNaN(parseInt(e.target.value))
    ) {
      toast.error(`${searchFor} can only take numeric input`);
      return;
    }

    setSearchTerm(e.target.value);
  };

  const handleSearch = async () => {
    debugger;
    // e.preventDefault();
    if (!searchTerm || !searchFor) {
      toast.error("Enter Value To Search Member Details");
      return;
    }

    try {
      setLoading(true);
      const queryData = await apiHelper(
        CorporatedataApis.SEARCH_EMPLOYEE(searchFor, searchTerm),
        "GET"
      );
      console.log(queryData);
      if (queryData?.error?.message) {
        toast.error(JSON.stringify(queryData?.error?.message));
        return;
      }

      if (queryData?.success?.memberProgramData?.rowCount === 0) {
        toast.error("No Data Found");
        setLoading(false);
        return;
      }

      if (queryData?.success) {
        const newMemberProgramData = [
          ...queryData?.success?.memberProgramData?.rows,
        ];

        console.log(newMemberProgramData);

        // setMemberProgramData(newMemberProgramData);
      }
      setLoading(false);
    } catch (e) {
      toast.error(e.message);
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex justify-center">
        <div className="text-left">
          <div>
            <button
              className="h-11 border-gray-100 border-2 flex justify-center items-center rounded-l-md w-40 px-2  shadow-xs text-[14px] font-medium text-gray-700 bg-white    hover:bg-gray-50 focus:outline-none  "
              type="button"
              id="options-menu"
              style={{
                padding: "8px 20px",
              }}
              onClick={() => setToggleDropdown((curr) => !curr)}
            >
              <span>{searchFor}</span>

              <svg
                className="w-5 h-5 ml-2 -mr-1 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
              </svg>
            </button>
          </div>

          {toggleDropdown && (
            <div className="z-50 absolute left-100 w-60 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
              <div className="py-1">
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  role="menuitem"
                  onClick={() => handleSearchParamChange("Mobile")}
                >
                  Mobile
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  role="menuitem"
                  onClick={() => handleSearchParamChange("Name")}
                >
                  Name
                </a>
              </div>
            </div>
          )}
        </div>

        {/* <form
          className="w-3/4 inline-block mr-5 mb-5 relative"
          onSubmit={(e) => handleSearch(e)}
        > */}
        <div
          className="w-3/4 inline-block mr-5 mb-5 relative"
          //   onSubmit={(e) => handleSearch(e)}
        >
          <input
            className="w-full h-11 pl-4 pr-10 appearance-none  rounded-r-md text-gray-700 bg-gray-100 focus:outline-none focus:shadow-outline"
            type={"text"}
            value={searchTerm}
            onFocus={() => setIsSearchFocused(true)}
            onChange={handleSearchInputChange}
            placeholder="Search by Name / Mobile Number"
          />
          <SearchIcon
            title="Search"
            onClick={() => {
              handleSearch();
            }}
            className="text-2xl text-gray-800 absolute right-3 top-2.5 cursor-pointer hover:transform hover:scale-110  "
            style={{ padding: "0.15rem" }}
          />
          {isSearchFocused && (
            <span className="text-xl text-gray-600 absolute right-10 top-1 translate-y-1 mr-2 ">
              |
            </span>
          )}
          {isSearchFocused && (
            <X
              onClick={handleClear}
              title="Clear"
              style={{ padding: "0.15rem" }}
              className="text-2xl text-gray-800 absolute right-12 top-2.5  cursor-pointer mr-4 hover:transform hover:scale-110 "
            />
          )}
          {/* </form> */}
        </div>
      </div>
    </>
  );
};
export default Search;
