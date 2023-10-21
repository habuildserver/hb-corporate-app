"use client";

import { apiHelper } from "@/lib/apiClient";
import { CorporatedataApis } from "@/services/generalApis";
import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

// const data = [
//   {
//     name: "Mon",
//     total: Math.floor(Math.random() * 5000) + 1000,
//   },
//   {
//     name: "Tue",
//     total: Math.floor(Math.random() * 5000) + 1000,
//   },
//   {
//     name: "Wed",
//     total: Math.floor(Math.random() * 5000) + 1000,
//   },
//   {
//     name: "Thurs",
//     total: Math.floor(Math.random() * 5000) + 1000,
//   },
//   {
//     name: "Fri",
//     total: Math.floor(Math.random() * 5000) + 1000,
//   },
//   {
//     name: "Sat",
//     total: Math.floor(Math.random() * 5000) + 1000,
//   },
//   {
//     name: "Sun",
//     total: Math.floor(Math.random() * 5000) + 1000,
//   },
// ];
export function ParticipationGraph({ participationType }) {
  const [formattedData, setFormattedData] = useState({});

  let range = participationType == "Monthly" ? "month" : "week";

  const getParticipationData = async () => {
    let result = await apiHelper(
      CorporatedataApis.GET_ORG_PARTICIPATION(range),
      "GET"
    );
    if (Object.keys(result.success).length != 0) {
      const formattedData = result.success.map((item) => ({
        name: item.attendanceday,
        Attendance: parseInt(item.attendancecount),
        Date: item.attendancedate
      }));
      formattedData.reverse();
      setFormattedData(formattedData);
    }
  };

  useEffect(() => {
    getParticipationData();
  }, [range]);

  return (
    <>
      <ResponsiveContainer width="100%" height={296}>
        <BarChart data={formattedData}>
          <CartesianGrid strokeDasharray="1 1" />
          <XAxis
            // dataKey="name"
            dataKey={`${participationType=='Monthly'?"Date":"name"}`} 
            stroke="#888888"
            fontSize={12}
            tickLine={true}
            axisLine={false}
          />
          <YAxis
            stroke="#888888"
            fontSize={12}
            tickLine={true}
            axisLine={true}
            tickFormatter={(value) => `${value}`}
          />
          <Tooltip />
          <Bar 
          dataKey="Attendance" 
          // dataKey={`${participationType=='Monthly'?"Attendance":"Date"}`} 
          fill="#95A4FC" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
}
