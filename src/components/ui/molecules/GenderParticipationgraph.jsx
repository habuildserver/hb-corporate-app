"use client";

import { apiHelper } from "@/lib/apiClient";
import { CorporatedataApis } from "@/services/generalApis";
import { useEffect, useState } from "react";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from "recharts";
import { ResponsivePie } from "@nivo/pie";

export function GenderParticipationgraph() {
    const specificGenderColors = {
        "male": "hsl(240, 70%, 50%)",
        "female": "hsl(0, 70%, 50%)",
        "transgender": "hsl(120, 70%, 50%)",
        "undisclosed": "hsl(60, 70%, 50%)",
      };
      

  const [formattedData, setFormattedData] = useState({});
  // let formattedData = {}

  const getGenderParticipationData = async () => {
    let result = await apiHelper(
      CorporatedataApis.GET_ORG_GENDER_PARTICIPATION(),
      "GET"
    );
    if (Object.keys(result?.success).length != 0) {
      const formattedData = Object.keys(result?.success).map((gender) => ({
        id: gender,
        label: `${gender} : (${result?.success[gender]})`,
        value: parseInt(result?.success[gender], 10),
        color: specificGenderColors[gender] || `hsl(${Math.floor(Math.random() * 360)}, 70%, 50%)`,
      }));
      setFormattedData(formattedData);
    }
  };

  useEffect(() => {
    getGenderParticipationData();
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
              enableArcLinkLabels={false}
              enableRadialLabels={true}
              // sliceLabel={(d) => `${d.id}: ${d.value}`}
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
                  translateX: 15,
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
