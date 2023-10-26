"use client";

import Image from "next/image";
import { useEffect } from "react";
const IMAGE_BASE_URL = process.env.IMAGE_BASE_URL;
import local from "local-storage";

const CompanyLogo = () => {
  let logoUrl = "";

  const companyDataJSON = local.get("companyData");
  if (companyDataJSON?.logo_url) {
    logoUrl = companyDataJSON.logo_url;
  } else {
    logoUrl = "";
  }

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
