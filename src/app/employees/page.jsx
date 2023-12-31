"use client";
import Image from "next/image";
import LogOut from "@/components/atoms/logout";
import { MainNav } from "@/components/ui/main-nav";
const IMAGE_BASE_URL = process.env.IMAGE_BASE_URL;
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useState } from "react";
import { apiHelper } from "@/lib/apiClient";
import { CorporatedataApis } from "@/services/generalApis";
import { Check, Timer, User2Icon } from "lucide-react";
import Search from "@/components/atoms/searchBar";
import { SearchIcon, X } from "lucide-react";
import { toast } from "react-hot-toast";
import CompanyLogo from "@/components/atoms/companyLogo";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Employees = () => {
  const [employeeList, setEmployeelist] = useState({});
  const [searchFor, setSearchFor] = useState("Mobile");
  const [searchTerm, setSearchTerm] = useState();
  const [loading, setLoading] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [totalpages, setTotalPage] = useState("");
  const [pageNumber, setpageNumber] = useState(1);
  const [previousPage, showPreviouspagetoggle] = useState(true);
  const [nextPage, showNextpagetoggle] = useState(true);
  const [showPagination, setShowPagination] = useState(true);
  const [searchParam, setSearchParams] = useState("Mobile");
  const [isDisable, setIsdisable] = useState(false);

  const getEmployeeList = async () => {
    setLoading(true);
    setIsdisable(true);
    let result = await apiHelper(
      CorporatedataApis.GET_EMPLOYEE_LIST(pageNumber),
      "GET"
    );
    if (Object.keys(result.success).length != 0) {
      setEmployeelist(result?.success?.employees);
      setTotalPage(result?.success?.totalpages);
      setLoading(false);
      setIsdisable(false);
    }
    setLoading(false);
    setIsdisable(false);
  };

  // const handleSearchParamChange = (searchParam) => {

  //   setToggleDropdown(false);
  //   // setSearchTerm("");
  // };
  useEffect(() => {
    setSearchFor(searchParam);
    setpageNumber(1);
  }, [searchParam]);

  const handleClear = () => {
    setSearchTerm("");
    getEmployeeList();
    setpageNumber(1);
    setShowPagination(true);
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

  const handleSearch = async (e) => {
    if (e) {
      e.preventDefault();
    }

    if (!searchTerm || !searchFor) {
      toast.error("Enter Value To Search Member Details");
      return;
    }

    try {
      setLoading(true);
      setIsdisable(true);
      const queryData = await apiHelper(
        CorporatedataApis.SEARCH_EMPLOYEE(searchFor, searchTerm, pageNumber),
        "GET"
      );

      if(queryData?.success?.message){
        toast.error(queryData?.success?.message)
        setLoading(false);
        setIsdisable(false);
        setShowPagination(false)
        setEmployeelist([])
        return;
      }

      if (Object.keys(queryData?.success).length != 0) {
        let memberResult = queryData?.success?.result;
        setEmployeelist(memberResult?.employees);
        setpageNumber(memberResult?.pagenumber);
        setTotalPage(memberResult?.totalpages);
      }

      setLoading(false);
      setIsdisable(false);
    } catch (e) {
      toast.error(e.message);
      setLoading(false);
      setIsdisable(false);
    }
  };

  const handleNextPagination = () => {
    let currentPage = pageNumber + 1;
    setpageNumber(currentPage);
  };
  const handlePreviousPagination = () => {
    let currentPage = pageNumber - 1;
    setpageNumber(currentPage);
  };

  useEffect(() => {
    if (searchTerm) {
      handleSearch();
    } else {
      getEmployeeList();
    }

    if (pageNumber == totalpages) {
      showNextpagetoggle(false);
    } else {
      showNextpagetoggle(true);
    }
    if (pageNumber == 1) {
      showPreviouspagetoggle(false);
    } else {
      showPreviouspagetoggle(true);
    }
  }, [pageNumber]);

  return (
    <>
      <div className="flex h-16 items-center px-4 shadow-lg">
        <CompanyLogo />
        <MainNav className="mx-6" />
        <LogOut />
      </div>
      <div>
        <div className="flex gap-3 px-7 py-2">
          <Image
            src={`${IMAGE_BASE_URL}/habuild_logo.png`}
            width="32"
            height="32"
            className=""
            alt="habuild_logo"
          />
          <p className="text-[#176FC1] text-[24px] font-medium">
            Welcome to Habuild Yoga Dashboard
          </p>
        </div>
        <div>
          <>
            <div className="flex justify-center">
              <div className="text-left">
                {/* <div>
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
                </div> */}

                {/* {toggleDropdown && (
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
                )} */}
                <Select
                  value={searchParam}
                  onValueChange={setSearchParams}
                  className="h-11 pl-4 pr-10"
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Mobile" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Mobile">Mobile</SelectItem>
                    <SelectItem value="Name">Name</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <form
                className="w-3/4 inline-block mr-5 mb-5 relative"
                onSubmit={(e) => handleSearch(e)}
              >
                <div
                  className="w-3/4 inline-block mr-5 mb-5 relative"
                  //   onSubmit={(e) => handleSearch(e)}
                >
                  <input
                    className="w-full h-10 pl-4 pr-10 appearance-none  rounded-r-md text-gray-700 bg-gray-100 focus:outline-none focus:shadow-outline"
                    type={"text"}
                    value={searchTerm}
                    onFocus={() => setIsSearchFocused(true)}
                    onChange={handleSearchInputChange}
                    placeholder="Search by Name / Mobile Number"
                  />
                  <SearchIcon
                    title="Search"
                    onClick={(e) => {
                      handleSearch(e);
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
                </div>
              </form>
            </div>
          </>
        </div>
        {showPagination && (
          <div className="flex justify-center my-4">
            <nav className="relative z-0 inline-flex shadow-sm">
              {previousPage && (
                <button
                  onClick={handlePreviousPagination}
                  disabled={isDisable}
                  className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 cursor-pointer hover:text-gray-700"
                >
                  Previous
                </button>
              )}

              <span className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300">
                Page {pageNumber} of {totalpages}
              </span>

              {nextPage && pageNumber != totalpages && (
                <button
                  onClick={handleNextPagination}
                  disabled={isDisable}
                  className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 cursor-pointer hover:text-gray-700"
                >
                  Next
                </button>
              )}
            </nav>
          </div>
        )}

        <div className="py-2 px-8">
          {loading ? (
            <>
              <div className="bg-white rounded-lg shadow-md p-4">
                <div className="animate-pulse">
                  {Array.from({ length: 20 }).map((index) => (
                    <div
                      key={index}
                      className="bg-gray-200 h-6 mb-2 rounded"
                    ></div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <>
              <Card className="">
                <CardHeader>
                  <CardTitle className="text-[#6B6B6B] text-[14px] font-medium]">
                    Total Employees
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-6">
                  <div>
                    {employeeList?.length > 0 ? (
                      <div className="w-full overflow-x-auto">
                        <table className="w-full table-auto">
                          <thead>
                            <tr>
                              <th className="px-4 py-2 text-left text-[#6B6B6B] text-[14px] font-normal">
                                Username
                              </th>
                              <th className="px-4 py-2 text-center text-[#6B6B6B] text-[14px] font-normal">
                                Phone Number
                              </th>
                              <th className="px-4 py-2 text-center text-[#6B6B6B] text-[14px] font-normal">
                                Membership status
                              </th>
                              <th className="px-4 py-2 text-center text-[#6B6B6B] text-[14px] font-normal">
                                Sessions attended
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {employeeList.map((data) => (
                              <tr key={data.id}>
                                <td className="px-4 py-2 text-center">
                                  <div className="flex gap-2 items-center">
                                    <User2Icon className="h-6 w-6" />
                                    <p className="text-base font-normal">
                                      {data?.name}
                                    </p>
                                  </div>
                                </td>
                                <td className="px-4 py-2 text-center">
                                  <p className="text-base font-normal">
                                    {data?.mobile_number}
                                  </p>
                                </td>
                                <td className="px-4 py-2 text-center">
                                  {data?.status === "ACTIVE" ? (
                                    <div className="bg-[#D8FFF2] p-2 flex justify-center gap-3 items-center rounded-md w-full md:w-[50%] mx-auto">
                                      <Check className="h-4 w-4 text-[#358F71]" />
                                      <p className="text-[#358F71] font-bold text-sm">
                                        {data?.status}
                                      </p>
                                    </div>
                                  ) : (
                                    <div className="bg-[#FF99334D] p-2 flex justify-center gap-3 items-center rounded-md w-full md:w-[50%] mx-auto">
                                      <Timer className="h-4 w-4 text-[#C06203]" />
                                      <p className="text-[#C06203] font-bold text-sm">
                                        {data?.status}
                                      </p>
                                    </div>
                                  )}
                                </td>
                                <td className="px-4 py-2 text-center">
                                  <p className="text-base font-normal">
                                    {data?.sessions_attended} sessions
                                  </p>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <>
                        <p className="text-[24px] font-bold text-center">
                          Data not found
                        </p>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </div>
    </>
  );
};
export default Employees;
