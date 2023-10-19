"use client";
import { apiHelper } from "@/lib/apiClient";
import { LoginApis } from "@/services/generalApis";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";




const Login = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const router = useRouter();
  
  const login = async () => {
    
    if(!email || !password){
      toast.error('Please Enter Email and Password')
      return;        
    }
  let inputData = {
    username: email,
    password: password,
  };
  let result = await apiHelper(LoginApis.LOGIN(), "POST", inputData);

  if(Object.keys(result.success).length!=0){
      router.push('/dashboard')
  }
  else{
    toast.error('Something Went Wrong')
  }
};


  return (
    <>
      <div className="bg-[#EFF6FF] h-screen flex justify-center items-center">
        <div className="bg-white py-20 px-10 rounded-lg h-[514px]">
            <div className="flex flex-col gap-9">
            <label>
              <p className="text-[14px] mb-2">Email</p>
              <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter Your Email"
                className="px-5 py-2 border border-[#E2E8F0] rounded-lg"
              />
            </label>
            <label>
              <p className="text-[14px] mb-2">Password</p>
              <input
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter Your Password"
                className="px-5 py-2 border border-[#E2E8F0] rounded-lg"
              />
            </label>
            <div>
              <button
                className="bg-[#176FC1] p-2 text-center rounded-lg w-full text-white text-[10px] font-bold"
                onClick={()=>{login()}}
              >
                SIGN IN
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Login;
