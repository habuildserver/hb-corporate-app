"use client";

import { apiHelper } from "@/lib/apiClient";
import { CorporatedataApis } from "@/services/generalApis";
import { useEffect, useState } from "react";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';


export function AgeParticipationgraph() {
  const data01 = [
    { name: 'Group A', value: 400 },
    { name: 'Group B', value: 300 },
    { name: 'Group C', value: 300 },
    { name: 'Group D', value: 200 },
  ];
  const data02 = [
    { name: 'A1', value: 100 },
    { name: 'A2', value: 300 },
    { name: 'B1', value: 100 },
    { name: 'B2', value: 80 },
    { name: 'B3', value: 40 },
    { name: 'B4', value: 30 },
    { name: 'B5', value: 50 },
    { name: 'C1', value: 100 },
    { name: 'C2', value: 200 },
    { name: 'D1', value: 150 },
    { name: 'D2', value: 50 },
  ];
  const [formattedData, setFormattedData] = useState({});
  // let formattedData = {}

  const getAgeParticipationData = async () => {
    let result = await apiHelper(
      CorporatedataApis.GET_ORG_AGE_PARTICIPATION(),
      "GET"
    );
    if (Object.keys(result.success).length != 0) {
    //   const formattedData = result.success.map((item) => ({
    //     name: item.attendancedate,
    //     Attendance: parseInt(item.attendancecount),
    //   }));
    //   setFormattedData(formattedData);
    console.log(result);
    }
  };

  useEffect(() => {
    // getAgeParticipationData();
  }, []);

  return (
    <>
          <ResponsiveContainer width="100%" height={296}>
          <PieChart width={400} height={400}>
          <Pie data={data02} dataKey="value" cx="50%" cy="50%" isAnimationActive={true} innerRadius={70} outerRadius={90} fill="#82ca9d" label />
        </PieChart>
          </ResponsiveContainer>

    </>
  );
}
