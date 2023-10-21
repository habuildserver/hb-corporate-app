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
import { User, UserCircle2 } from "lucide-react";
import { useEffect, useState } from "react";

const PowerUser = () => {
  const [userDetails, setUserdetails] = useState({});
  // const topUserdetails = [
  //   { id: 1, username: "hello", sessionattended: "69" },
  //   { id: 2, username: "hello", sessionattended: "69" },
  //   { id: 3, username: "hello", sessionattended: "69" },
  //   { id: 4, username: "hello", sessionattended: "69" },
  //   { id: 5, username: "hello", sessionattended: "69" },
  //   { id: 6, username: "hello", sessionattended: "69" },
  //   { id: 7, username: "hello", sessionattended: "69" },
  //   { id: 8, username: "hello", sessionattended: "69" },
  //   { id: 9, username: "hello", sessionattended: "69" },
  //   { id: 10, username: "hello", sessionattended: "69" },
  // ];

  const getPowerUserData = async () => {
    let result = await apiHelper(CorporatedataApis.GET_ORG_POWER_USER(), "GET");
    if (Object.keys(result.success).length != 0) {
      setUserdetails(result?.success);
    }
  };

  useEffect(() => {
    getPowerUserData();
  }, []);

  return (
    <>
      <Card className="shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-[#6B6B6B] text-[14px] font-medium">
            Power users ( Top 20 attendees )
          </CardTitle>
        </CardHeader>
        <CardContent className="p-3">
          <div className="flex justify-between text-[14px] text-[#6B6B6B] px-3 pb-4">
            <p>Username</p>
            <p>Sessions attended</p>
          </div>
          {userDetails.length > 0 && (
            <>
              {" "}
              {userDetails.map((data) => (
                <div key={data.id} className="px-3">
                  <div className="flex justify-between items-center px-3">
                    <div className="flex gap-3 items-center py-2">
                      <UserCircle2 />
                      <p className="text-[14px] font-normal">{data.name}</p>
                    </div>
                    <p>{data.sessions_attended}</p>
                  </div>
                  <hr className="border-[1px]" />
                </div>
              ))}
            </>
          )}
        </CardContent>
      </Card>
    </>
  );
};

export default PowerUser;
