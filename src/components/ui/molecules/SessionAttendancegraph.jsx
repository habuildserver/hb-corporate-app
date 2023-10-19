"use client";

import { apiHelper } from "@/lib/apiClient";
import { CorporatedataApis } from "@/services/generalApis";
import { useEffect, useState } from "react";

const SessionGraph = () => {
  const [attendanceData, setAttendanceData] = useState({});
    let requiredAttendance = 100;



  const getAttendance = async () => {
    let result = await apiHelper(CorporatedataApis.GET_ORG_ATTENDANCE(), "GET");
    if (Object.keys(result?.success).length != 0) {
      setAttendanceData(result?.success);
    }
  };
  useEffect(() => {
    getAttendance();
  }, []);
  return (
    <>
      <div className="p-3">
        <div>
          <p>Morning</p>
          <div className="mt-3">
            <div className="flex justify-between items-baseline">
              <p>6:30 am</p>
              <div className="overflow-hidden h-3 mb-4 text-xs flex rounded-xl bg-[#d1d7fc] w-3/4">
                <div
                  style={{
                    width:
                      requiredAttendance === 0
                        ? `100%`
                        : `${(attendanceData?.batch1 / requiredAttendance) * 100}%`,
                  }}
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-[#98a4f6]"
                >
                </div>
              </div>
              <p>{attendanceData?.batch1}</p>
            </div>
            <div className="flex justify-between items-baseline">
              <p>7:30 am</p>
              <div className="overflow-hidden h-3 mb-4 text-xs flex rounded-xl bg-[#d1d7fc] w-3/4">
                <div
                  style={{
                    width:
                      requiredAttendance === 0
                        ? `100%`
                        : `${(attendanceData?.batch2 / requiredAttendance) * 100}%`,
                  }}
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-[#98a4f6]"
                >
                </div>
              </div>
              <p>{attendanceData?.batch2}</p>
            </div>
            <div className="flex justify-between items-baseline">
              <p>8:30 am</p>
              <div className="overflow-hidden h-3 mb-4 text-xs flex rounded-xl bg-[#d1d7fc] w-3/4">
                <div
                  style={{
                    width:
                      requiredAttendance === 0
                        ? `100%`
                        : `${(attendanceData?.batch3 / requiredAttendance) * 100}%`,
                  }}
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-[#98a4f6]"
                >
                </div>
              </div>
              <p>{attendanceData?.batch3}</p>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <p>Evening</p>
          <div className="mt-3">
          <div className="flex justify-between items-baseline">
              <p>6:30 pm</p>
              <div className="overflow-hidden h-3 mb-4 text-xs flex rounded-xl bg-[#eaf9e8] w-3/4">
                <div
                  style={{
                    width:
                      requiredAttendance === 0
                        ? `100%`
                        : `${(attendanceData?.batch4 / requiredAttendance) * 100}%`,
                  }}
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-[#c4ecc1]"
                >
                </div>
              </div>
              <p>{attendanceData?.batch4}</p>
            </div>
            <div className="flex justify-between items-baseline">
              <p>7:30 pm</p>
              <div className="overflow-hidden h-3 mb-4 text-xs flex rounded-xl bg-[#eaf9e8] w-3/4">
                <div
                  style={{
                    width:
                      requiredAttendance === 0
                        ? `100%`
                        : `${(attendanceData?.batch5 / requiredAttendance) * 100}%`,
                  }}
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-[#c4ecc1]"
                >
                </div>
              </div>
              <p>{attendanceData?.batch5}</p>
            </div>
            <div className="flex justify-between items-baseline">
              <p>8:30 pm</p>
              <div className="overflow-hidden h-3 mb-4 text-xs flex rounded-xl bg-[#eaf9e8] w-3/4">
                <div
                  style={{
                    width:
                      requiredAttendance === 0
                        ? `100%`
                        : `${(attendanceData?.batch6 / requiredAttendance) * 100}%`,
                  }}
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-[#c4ecc1]"
                >
                </div>
              </div>
              <p>{attendanceData?.batch6}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SessionGraph;
