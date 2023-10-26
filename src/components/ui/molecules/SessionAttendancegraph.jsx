"use client";

import { apiHelper } from "@/lib/apiClient";
import { CorporatedataApis } from "@/services/generalApis";
import { useEffect, useState } from "react";




const SessionGraph = () => {

  const [batch1, setBatch1] = useState([])
  const [batch2, setBatch2] = useState([])
  const [batch3, setBatch3] = useState([])
  const [batch4, setBatch4] = useState([])
  const [batch5, setBatch5] = useState([])
  const [batch6, setBatch6] = useState([])



  const getAttendance = async () => {
    let result = await apiHelper(CorporatedataApis.GET_ORG_ATTENDANCE(), "GET");
    if (Object.keys(result?.success).length != 0) {
      
      // Group the data by the "batch" attribute
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
    getAttendance();
  }, []);
  return (
    <>
      <div className="p-3">
        <div>
          <p>Morning</p>
          <div className="mt-3">
            <div className="flex justify-between items-baseline">
              <p className="whitespace-nowrap">6:30 am</p>
              <div className="overflow-hidden h-3 mb-4 text-xs flex rounded-xl bg-[#d1d7fc] w-3/4">
                <div
                  style={{
                    width:
                    batch1[0]?.totalCount === 0
                        ? `100%`
                        : `${(batch1[0]?.attendedCount / batch1[0]?.totalCount) * 100}%`,
                  }}
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-[#98a4f6]"
                >
                </div>
              </div>
              <p>{batch1[0]?.attendedCount}</p>
            </div>
            <div className="flex justify-between items-baseline">
              <p className="whitespace-nowrap">7:30 am</p>
              <div className="overflow-hidden h-3 mb-4 text-xs flex rounded-xl bg-[#d1d7fc] w-3/4">
                <div
                  style={{
                    width:
                    batch2[0]?.totalCount === 0
                        ? `100%`
                        : `${(batch2[0]?.attendedCount / batch2[0]?.totalCount) * 100}%`,
                  }}
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-[#98a4f6]"
                >
                </div>
              </div>
              <p>{batch2[0]?.attendedCount}</p>
            </div>
            <div className="flex justify-between items-baseline">
              <p className="whitespace-nowrap">8:30 am</p>
              <div className="overflow-hidden h-3 mb-4 text-xs flex rounded-xl bg-[#d1d7fc] w-3/4">
                <div
                  style={{
                    width:
                    batch5[0]?.totalCount === 0
                        ? `100%`
                        : `${(batch5[0]?.attendedCount / batch5[0]?.totalCount) * 100}%`,
                  }}
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-[#98a4f6]"
                >
                </div>
              </div>
              <p>{batch5[0]?.attendedCount}</p>
            </div>
          </div>
        </div>
        <div className="mt-4">
          <p>Evening</p>
          <div className="mt-3">
          <div className="flex justify-between items-baseline">
              <p className="whitespace-nowrap">5:00 pm</p>
              <div className="overflow-hidden h-3 mb-4 text-xs flex rounded-xl bg-[#eaf9e8] w-3/4">
                <div
                  style={{
                    width:
                    batch6[0]?.totalCount === 0
                        ? `100%`
                        : `${(batch6[0]?.attendedCount / batch6[0]?.totalCount) * 100}%`,
                  }}
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-[#c4ecc1]"
                >
                </div>
              </div>
              <p>{batch6[0]?.attendedCount}</p>
            </div>
            <div className="flex justify-between items-baseline">
              <p className="whitespace-nowrap">6:00 pm</p>
              <div className="overflow-hidden h-3 mb-4 text-xs flex rounded-xl bg-[#eaf9e8] w-3/4">
                <div
                  style={{
                    width:
                    batch3[0]?.totalCount === 0
                        ? `100%`
                        : `${(batch3[0]?.attendedCount / batch3[0]?.totalCount) * 100}%`,
                  }}
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-[#c4ecc1]"
                >
                </div>
              </div>
              <p>{batch3[0]?.attendedCount}</p>
            </div>
            <div className="flex justify-between items-baseline">
              <p className="whitespace-nowrap">7:00 pm</p>
              <div className="overflow-hidden h-3 mb-4 text-xs flex rounded-xl bg-[#eaf9e8] w-3/4">
                <div
                  style={{
                    width:
                    batch4[0]?.totalCount === 0
                        ? `100%`
                        : `${(batch4[0]?.attendedCount / batch4[0]?.totalCount) * 100}%`,
                  }}
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-[#c4ecc1]"
                >
                </div>
              </div>
              <p>{batch4[0]?.attendedCount}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SessionGraph;
