"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
const IMAGE_BASE_URL = process.env.IMAGE_BASE_URL;
import local from "local-storage";

const CompanyLogo = () => {
  const [logoUrl, setLogoUrl] = useState("")
  // let logoUrl = "";

  // debugger;
  
  useEffect(()=>{
    const companyDataJSON = local.get("companyData");
    if (companyDataJSON?.logo_url) {
          setLogoUrl(companyDataJSON.logo_url);
    } else {
      setLogoUrl("");
    }

  },[])

  return (
    <>
      <div className="mx-8">
        <Image
          src={logoUrl}
          width={1000}
          height={1000}
          alt="logo"
          className="w-[160px] h-[40px]"
        />
      </div>
    </>
  );
};
export default CompanyLogo;
