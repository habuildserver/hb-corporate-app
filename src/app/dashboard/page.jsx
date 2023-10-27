"use client";

import { useState } from "react";
import { Metadata } from "next";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarDateRangePicker } from "@/components/ui/date-range-picker";
import { MainNav } from "@/components/ui/main-nav";
import { ParticipationGraph } from "@/components/ui/molecules/ParticipationGraph";
import DataCards from "@/components/ui/molecules/data-cards";
import { UserNav } from "@/components/ui/user-nav";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import SessionGraph from "@/components/ui/molecules/SessionAttendancegraph";
import LogOut from "@/components/atoms/logout";
import { AgeParticipationgraph } from "@/components/ui/molecules/AgeParticipationgraph";
import { GenderParticipationgraph } from "@/components/ui/molecules/GenderParticipationgraph";
import PowerUser from "@/components/ui/molecules/PowerUser";
import CompanyLogo from "@/components/atoms/companyLogo";

const IMAGE_BASE_URL = process.env.IMAGE_BASE_URL;

const Dashboard = () => {
  const [participationType, setParticipationtype] = useState("Weekly");

  return (
    <>
      <div className=""></div>
      <div className="flex-col md:flex">
        <div className="border-b">
          <div className="flex h-16 items-center px-4 shadow-lg">
            <CompanyLogo/>
            <MainNav className="mx-6" />
            <LogOut />
          </div>
        </div>
        <div>
          <div className="flex justify-between px-8 py-3 items-center">
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
            {/* <div className="">
              <div className="flex items-center justify-between space-y-2">
                <div className="flex items-center space-x-2">
                  <CalendarDateRangePicker />
                  <Button>Download</Button>
                </div>
              </div>
            </div> */}
          </div>
          <div className="flex px-6 py-3 max-[640px]:flex-col max-[640px]:px-2">
            <Tabs
              defaultValue="overview"
              className="px-6 w-[70%] max-[640px]:w-full"
            >
              <TabsContent value="overview" className="space-y-4">
                <DataCards />
                <div>
                <Card className="">
                    <CardHeader className="flex flex-row justify-between items-center py-2 px-6">
                      <CardTitle className="text-[#6B6B6B] text-[14px] font-medium]">
                        Frequency of Participation
                      </CardTitle>
                      {/* <Select>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Weekly" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Weekly">Weekly</SelectItem>
                          <SelectItem value="Monthly">Monthly</SelectItem>
                        </SelectContent>
                      </Select> */}

                      <Select
                        value={participationType}
                        onValueChange={setParticipationtype}
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Weekly" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Weekly">Weekly</SelectItem>
                          {/* <SelectItem value="Monthly">Monthly</SelectItem> */}
                        </SelectContent>
                      </Select>
                    </CardHeader>
                    <CardContent className="pl-2">
                      <ParticipationGraph participationType={participationType}/>
                    </CardContent>
                  </Card>
                </div>
                <div>
                <Card className="">
                    <CardHeader>
                      <CardTitle className="text-[#6B6B6B] text-[14px] font-medium]">
                        Session attendance
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pl-2">
                      <SessionGraph />
                    </CardContent>
                  </Card>
                </div>
                <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2">

                  <Card className="">
                    <CardHeader>
                      <CardTitle className="text-[#6B6B6B] text-[14px] font-medium]">
                        Age participation
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pl-2">
                      <AgeParticipationgraph />
                    </CardContent>
                  </Card>
                  <Card className="">
                    <CardHeader>
                      <CardTitle className="text-[#6B6B6B] text-[14px] font-medium]">
                        Gender participation
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pl-2">
                      <GenderParticipationgraph />
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
            <div className="w-[30%] max-[640px]:w-full max-[640px]:mx-auto mt-2">
              <PowerUser />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Dashboard;
