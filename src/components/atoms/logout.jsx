import { apiHelper } from "@/lib/apiClient";
import { LoginApis } from "@/services/generalApis";
import { LogOutIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import {toast} from "react-hot-toast";



const LogOut = ()=>{
    const router = useRouter()

    const Logout = async (e) => {
        e.preventDefault();
        let data = await apiHelper(LoginApis.LOGOUT(), "GET");
        if (data?.success) {
          window.sessionStorage.removeItem("memberDetails");
          localStorage.removeItem("companyData");
        } else {
          toast.error(data?.error?.message ?? "Something went wrong");
        }
        window.sessionStorage.clear();
        router.push("/");
      };


    return(
        <div className="ml-auto flex items-center space-x-4 hover:cursor-pointer hover:bg-white hover:text-red-500 border border-red-500 px-3 py-2 text-white bg-red-500 rounded-lg" onClick={Logout}>
        <LogOutIcon/> <span className="ml-0.5">Logout</span>
      </div>
    )
}

export default LogOut;