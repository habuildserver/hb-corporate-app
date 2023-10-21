import Link from "next/link";
import React from "react";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

export function MainNav({ className, ...props }) {
  const pathname = usePathname();

  console.log(pathname);
  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      <Link
        href="/dashboard"
        className={`text-sm font-medium transition-colors hover:text-primary leading-[4.4em] ${
          pathname == "/dashboard" ? "border-[#176FC1] border-b-[3px]" : ""
        }`}
      >
        Dashboard
      </Link>
      <Link
        href="/employees"
        className={`text-sm font-medium text-muted-foreground transition-colors hover:text-primary leading-[4.4em] ${
          pathname == "/employees" ? "border-b-[3px] border-[#176FC1]" : ""
        }`}
      >
        Employees
      </Link>
    </nav>
  );
}
