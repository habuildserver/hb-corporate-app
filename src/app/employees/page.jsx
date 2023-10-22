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

const Employees = () => {
  const [employeeList, setEmployeelist] = useState({});
  const getEmployeeList = async () => {
    let result = await apiHelper(CorporatedataApis.GET_EMPLOYEE_LIST(), "GET");

    if (Object.keys(result.success).length != 0) {
      setEmployeelist(result?.success?.employees);
    }
  };

  useEffect(() => {
    getEmployeeList();
  }, []);

  return (
    <>
      <div className="flex h-16 items-center px-4 shadow-lg">
        {/* <TeamSwitcher /> */}
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
        <div className="py-2 px-8">
          <Card className="">
            <CardHeader>
              <CardTitle className="text-[#6B6B6B] text-[14px] font-medium]">
                Total Employees
              </CardTitle>
            </CardHeader>
            <CardContent className="px-6">
              <div>
                {employeeList.length > 0 && (
                  <div className="w-full overflow-x-auto">
                    <table className="w-full table-auto">
                      <thead>
                        <tr>
                          <th className="px-4 py-2 text-left text-[#6B6B6B] text-[14px] font-normal">Username</th>
                          <th className="px-4 py-2 text-center text-[#6B6B6B] text-[14px] font-normal">Phone Number</th>
                          <th className="px-4 py-2 text-center text-[#6B6B6B] text-[14px] font-normal">Membership status</th>
                          <th className="px-4 py-2 text-center text-[#6B6B6B] text-[14px] font-normal">Sessions attended</th>
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
                                <div className="bg-[#D8FFF2] p-2 flex justify-center gap-3 items-center rounded-md w-[40%] mx-auto">
                                  <Check className="h-4 w-4 text-[#358F71]" />
                                  <p className="text-[#358F71] font-bold text-sm">
                                    Active
                                  </p>
                                </div>
                              ) : (
                                <div className="bg-[#FF99334D] p-2 flex justify-center gap-3 items-center rounded-md w-[40%] mx-auto">
                                  <Timer className="h-4 w-4 text-[#C06203]" />
                                  <p className="text-[#C06203] font-bold text-sm">
                                    Paused
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
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};
export default Employees;
