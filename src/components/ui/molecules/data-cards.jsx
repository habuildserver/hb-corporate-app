"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { apiHelper } from "@/lib/apiClient";
import { CorporatedataApis } from "@/services/generalApis";
import { useEffect, useState } from "react";

const DataCards = () => {
  const [totalUsers, setTotalUsers] = useState("");
  const [peakTime, setPeakTime] = useState("");
  const [pausedUsers, setPausedUsers] = useState("");
  const [inactiveUsers, setInactiveUsers] = useState("");
  const [activeUsers, setActiveUsers] = useState("");
  const [loading, setLoading] = useState(false);

  // 
    const [batch1, setBatch1] = useState([])
  const [batch2, setBatch2] = useState([])
  const [batch3, setBatch3] = useState([])
  const [batch4, setBatch4] = useState([])
  const [batch5, setBatch5] = useState([])
  const [batch6, setBatch6] = useState([])

  const getOrgData = async () => {
    setLoading(true);
    let result = await apiHelper(CorporatedataApis.GET_ORG_STATS(), "GET");

    if (Object.keys(result.success).length != 0) {
      setTotalUsers(result?.success?.total_users);
      // setPeakTime(result?.success?.peakTime);
      setPausedUsers(result?.success?.paused_users);
      setInactiveUsers(result?.success?.inactive_users);
      setActiveUsers(result?.success?.active_users);
      setLoading(false)
    }
    setLoading(false)
  };

  const getAttendance = async () => {
    let result = await apiHelper(CorporatedataApis.GET_ORG_ATTENDANCE(), "GET");
    if (Object.keys(result?.success).length != 0) {
      // Find the batch with maximum attendedCount
      let maxAttendance = -1;
      let maxBatch = "";
      
      result.success.forEach(item => {
        const attendance = parseInt(item.attendedCount);
        if (attendance > maxAttendance) {
          maxAttendance = attendance;
          maxBatch = item.batch;
        }
      });

      // Set peak time based on batch
      const peakTimes = {
        "1": "6:30 AM",
        "2": "7:30 AM",
        "3": "8:30 AM",
        "4": "5:00 AM",
        "5": "6:00 AM",
        "6": "7:00 AM"
      };

      setPeakTime(peakTimes[maxBatch] || "N/A");

      // Original batch grouping logic
      result?.success?.forEach(item => {
        const batchNumber = item.batch;
        const newData = { attendedCount: item.attendedCount, totalCount: item.totalCount };
  
        switch (batchNumber) {
          case "1":
            setBatch1(prevData => [...prevData, newData]);
            break;
          case "2":
            setBatch2(prevData => [...prevData, newData]);
            break;
          case "3":
            setBatch3(prevData => [...prevData, newData]);
            break;
          case "4":
            setBatch4(prevData => [...prevData, newData]);
            break;
          case "5":
            setBatch5(prevData => [...prevData, newData]);
            break;
          case "6":
            setBatch6(prevData => [...prevData, newData]);
            break;
          default:
            break;
        }
      })
    }
  };

  useEffect(() => {
    getOrgData();
    getAttendance();
  }, []);

  return (
    <>
      {loading ? (
        <>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((index) => (
            <div
              className=" bg-white rounded-lg shadow-md p-4 my-3"
              key={index}
            >
              <div className="flex-1">
                        <div className="bg-gray-200 h-6 mb-2 rounded animate-pulse"></div>
                        <div className="bg-gray-200 h-4 mb-2 rounded animate-pulse"></div>
                        <div className="bg-gray-200 h-4 mb-2 rounded animate-pulse"></div>
                      </div>
              </div>
          ))}
          </div>
        </>
      ) : (
        <div className="grid gap-4 max-[640px]:grid-cols-2 lg:grid-cols-4">
          <Card className="p-4 rounded-xl shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 p-0">
              <CardTitle className="text-[#6B6B6B] text-[14px] font-medium">
                Total Users
              </CardTitle>
              {/* <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg> */}
            </CardHeader>
            <CardContent className="flex items-center gap-4 p-0 mt-4">
              <div className="text-2xl font-bold">{totalUsers}</div>
              {/* <p className="text-xs">+20.1%</p> */}
            </CardContent>
          </Card>
          <Card className="p-4 rounded-xl shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 p-0">
              <CardTitle className="text-[#6B6B6B] text-[14px] font-medium">
                Active Users
              </CardTitle>
              {/* <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg> */}
            </CardHeader>
            <CardContent className="flex items-center gap-4 p-0 mt-4">
              <div className="text-2xl font-bold">{activeUsers}</div>
              {/* <p className="text-xs">+20.1%</p> */}
            </CardContent>
          </Card>
          <Card className="p-4 rounded-xl shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 p-0">
              <CardTitle className="text-[#6B6B6B] text-[14px] font-medium">
                Peak time
              </CardTitle>
              {/* <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg> */}
            </CardHeader>
            <CardContent className="flex items-center gap-4 p-0 mt-4">
              <div className="text-2xl font-bold">{peakTime}</div>
              {/* <p className="text-xs">+20.1%</p> */}
            </CardContent>
          </Card>
          <Card className="p-4 rounded-xl shadow-lg">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 p-0">
              <CardTitle className="text-[#6B6B6B] text-[14px] font-medium">
                Paused Users
              </CardTitle>
              {/* <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg> */}
            </CardHeader>
            <CardContent className="flex items-center gap-4 p-0 mt-4">
              <div className="text-2xl font-bold">{pausedUsers}</div>
              {/* <p className="text-xs">+20.1%</p> */}
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
};
export default DataCards;
