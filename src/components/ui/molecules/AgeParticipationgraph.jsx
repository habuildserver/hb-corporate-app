"use client";

import { apiHelper } from "@/lib/apiClient";
import { CorporatedataApis } from "@/services/generalApis";
import { useEffect, useState } from "react";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from "recharts";
import { ResponsivePie } from "@nivo/pie";

export function AgeParticipationgraph() {
  const specificColors = {
    "0-20": "hsl(0, 0%, 0%)",
    "20-30": "hsl(0, 70%, 50%)",
    "30-40": "hsl(0, 70%, 50%)",
    "40-50": "hsl(0, 70%, 50%)",
    "50-60": "hsl(0, 70%, 50%)",
    "60-70": "hsl(0, 70%, 50%)",
    "70+": "hsl(0, 70%, 50%)",
  };

  const [formattedData, setFormattedData] = useState({});
  // let formattedData = {}

  const getAgeParticipationData = async () => {
    let result = await apiHelper(
      CorporatedataApis.GET_ORG_AGE_PARTICIPATION(),
      "GET"
    );
    if (Object.keys(result.success).length != 0) {
      const formattedData = result?.success?.map((item, index) => ({
        id: item.age_range,
        label: `${item.age_range} yrs:  (${item.user_count})`,
        value: parseInt(item.user_count, 10),
        color:
          specificColors[item.age_range] ||
          `hsl(${(index * 60) % 360}, 70%, 50%)`,

        // color: specificColors[item.age_range] || `hsl(${Math.floor(Math.random() * 360)}, 70%, 50%)`
      }));

      setFormattedData(formattedData);
    }
  };

  useEffect(() => {
    getAgeParticipationData();
  }, []);

  return (
    <>
      <div style={{ height: "300px" }}>
        <>
          {formattedData.length > 0 && (
            <ResponsivePie
              data={formattedData}
              margin={{ top: 40, right: 80, bottom: 80, left: 10 }}
              innerRadius={0.7}
              padAngle={2}
              cornerRadius={0}
              colors={{ scheme: "paired" }}
              borderWidth={1}
              borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
              enableArcLabels={true}
              arcLabelsTextColor="#ffffff"
              arcLinkLabelsColor={{ from: "color" }}
              arcLinkLabelsStraightLength={15}
              arcLinkLabelsDiagonalLength={30}
              enableArcLinkLabels={false}
              enableRadialLabels={true}
              sliceLabel={(d) => `${d.id}: ${d.value}`}
              radialLabelsSkipAngle={10}
              radialLabelsTextXOffset={6}
              radialLabelsTextColor="#333333"
              radialLabelsLinkOffset={0}
              radialLabelsLinkDiagonalLength={16}
              radialLabelsLinkHorizontalLength={24}
              radialLabelsLinkStrokeWidth={1}
              radialLabelsLinkColor={{ from: "color" }}
              slicesLabelsSkipAngle={10}
              slicesLabelsTextColor="#333333"
              legends={[
                {
                  anchor: "right",
                  direction: "column",
                  justify: false,
                  translateX: 55,
                  translateY: 0,
                  itemWidth: 80,
                  itemHeight: 19,
                  itemsSpacing: 11,
                  symbolSize: 16,
                  symbolShape: 'circle',
                  itemDirection: "left-to-right",
                },
              ]}
            />
          )}
        </>
      </div>
    </>
  );
}
