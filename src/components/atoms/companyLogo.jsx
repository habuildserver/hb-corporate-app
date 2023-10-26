"use client"



import Image from "next/image";
import { useEffect } from "react";
const IMAGE_BASE_URL = process.env.IMAGE_BASE_URL;

const CompanyLogo = () => {
  let logoUrl = "";

  
  useEffect(()=>{
    const companyDataJSON = localStorage.getItem("companyData");
    if (companyDataJSON) {
      const companyData = JSON.parse(companyDataJSON);
  
      logoUrl = companyData.logo_url;
    } else {
      logoUrl = `${IMAGE_BASE_URL}/habuild_logo.png`;
    }

  },[])
  return (
    <>
      <div className="mx-8">
        <Image
          src={logoUrl}
          width={100}
          height={100}
          alt="logo"
          className="w-[160px] h-[40px]"
        />
      </div>
    </>
  );
};
export default CompanyLogo;
