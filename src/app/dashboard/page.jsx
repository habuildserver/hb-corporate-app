"use client";

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
import { RecentSales } from "@/components/ui/recent-sales";
import { Search } from "@/components/ui/search";
// import TeamSwitcher from "@/components/ui/"y
import { UserNav } from "@/components/ui/user-nav";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import SessionGraph from "@/components/ui/molecules/SessionAttendancegraph";
// import { LogOut } from "lucide-react";
import LogOut from "@/components/atoms/logout";
import { AgeParticipationgraph } from "@/components/ui/molecules/AgeParticipationgraph";
const IMAGE_BASE_URL = process.env.IMAGE_BASE_URL;
const API_BASE_URL = process.env.API_BASE_URL;
// export const metadata: Metadata = {
//   title: "Dashboard",
//   description: "Example dashboard app built using the components.",
// }

const topUserdetails = [
  { id: 1, username: "hello", sessionattended: "69" },
  { id: 2, username: "hello", sessionattended: "69" },
  { id: 3, username: "hello", sessionattended: "69" },
  { id: 4, username: "hello", sessionattended: "69" },
  { id: 5, username: "hello", sessionattended: "69" },
  { id: 6, username: "hello", sessionattended: "69" },
  { id: 7, username: "hello", sessionattended: "69" },
  { id: 8, username: "hello", sessionattended: "69" },
  { id: 9, username: "hello", sessionattended: "69" },
  { id: 10, username: "hello", sessionattended: "69" },
];

const Dashboard = () => {




  return (
    <>
      <div className="">
        {/* <Image
          src="/examples/dashboard-light.png"
          width={1280}
          height={866}
          alt="Dashboard"
          className="block dark:hidden"
        />
        <Image
          src="/examples/dashboard-dark.png"
          width={1280}
          height={866}
          alt="Dashboard"
          className="hidden dark:block"
        /> */}
      </div>
      <div className="flex-col md:flex">
        <div className="border-b">
          <div className="flex h-16 items-center px-4">
            {/* <TeamSwitcher /> */}
            <MainNav className="mx-6" />
            <LogOut/>
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
              />
              <p className="text-[#176FC1] text-[24px] font-medium">
                Welcome to Habuild Yoga Dashboard
              </p>
            </div>
            <div className="">
              <div className="flex items-center justify-between space-y-2">
                <div className="flex items-center space-x-2">
                  <CalendarDateRangePicker />
                  <Button>Download</Button>
                </div>
              </div>
            </div>
          </div>
          <div className="flex px-6 py-3 max-[640px]:flex-col">
            <Tabs defaultValue="overview" className="px-6 w-[70%]">
              {/* <TabsList>
              <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            </TabsList> */}
              <TabsContent value="overview" className="space-y-4">
                <DataCards />
                <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2">
                  <Card className="">
                    <CardHeader className="flex flex-row justify-between items-center py-2 px-6">
                      <CardTitle className="text-[#6B6B6B] text-[14px] font-medium]">
                        Frequency of Participation
                      </CardTitle>
                      <Select>
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
                      <ParticipationGraph />
                    </CardContent>
                  </Card>
                  <Card className="">
                    <CardHeader>
                      <CardTitle className="text-[#6B6B6B] text-[14px] font-medium]">
                        Session attendance
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pl-2">
                      <SessionGraph/>
                    </CardContent>
                  </Card>
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
                      <ParticipationGraph />
                    </CardContent>
                  </Card>
                  {/* <Card className="col-span-3">
                    <CardHeader>
                      <CardTitle>Recent Sales</CardTitle>
                      <CardDescription>
                        You made 265 sales this month.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <RecentSales />
                    </CardContent>
                  </Card> */}
                </div>
              </TabsContent>
            </Tabs>
            <div className="w-[30%] mt-2">
              <Card>
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
                  {topUserdetails.map((data) => (
                    <div key={data.id} className="px-3">
                      <div className="flex justify-between items-center px-3">
                        <div className="flex gap-3 items-center py-2">
                          <div className="h-[32px] w-[32px] bg-black rounded-full"></div>
                          <p className="text-[14px] font-normal">
                            {data.username}
                          </p>
                        </div>
                        <p>{data.sessionattended}</p>
                      </div>
                      <hr className="border-[1px]" />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Dashboard;
