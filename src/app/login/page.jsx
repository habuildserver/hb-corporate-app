"use client";
import { apiHelper } from "@/lib/apiClient";
import { LoginApis } from "@/services/generalApis";
import { useState, useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { EyeIcon, EyeOffIcon } from "lucide-react";
const IMAGE_BASE_URL = process.env.IMAGE_BASE_URL;
import {signIn,signOut} from "aws-amplify/auth"
import { Amplify, ResourcesConfig } from "aws-amplify";
import { CookieStorage } from 'aws-amplify/utils';
import { cognitoUserPoolsTokenProvider } from 'aws-amplify/auth/cognito';

const authConfig = {
  Cognito: {
    userPoolId: process.env.NEXT_PUBLIC_POOL_ID,
    userPoolClientId: process.env.NEXT_PUBLIC_POOL_CLIENT_ID
  }
};


Amplify.configure({
  Auth: authConfig
}, {
  ssr: true
});

cognitoUserPoolsTokenProvider.setKeyValueStorage(new CookieStorage());

const SignIn = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
}

const Login = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [corporateDetails, setCorporateDetails] = useState({});
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [showPassword, setshowpassword] = useState(true);
  const [isError, setIsError] = useState(false);

  const handleInputChange = (event) => {
    setIsError(false);
    setUser({ ...user, [event.target.name]: event.target.value });
};

const handleSubmit = async (event) => {
  setLoading(true);
  setIsError(false);
  event.preventDefault();
  try {
      await signOut();
      const { isSignedIn } = await signIn({
          username: user.email,
          password: user.password,
          options: { authFlowType: 'USER_PASSWORD_AUTH' }
      });
      setLoading(false);
      if (isSignedIn) {
          router.push('/dashboard');
      }
  } catch (e) {
      console.log('handleSubmit on signSignin', e);
      setIsError(true);
      setLoading(false);
      setErrorMessage(e.message);
  }
};

  // const login = async () => {
  //   if (!email && !password) {
  //     toast.error("Please Enter Email and Password");
  //     return;
  //   }
  //   if (!email) {
  //     toast.error("Please Enter Email");
  //     return;
  //   }
  //   if (!password) {
  //     toast.error("Please Enter Password");
  //     return;
  //   }
  //   setLoading(true);
  //   let inputData = {
  //     username: email,
  //     password: password,
  //   };
  //   let result = await apiHelper(LoginApis.LOGIN(), "POST", inputData);

  //   if (Object.keys(result.success).length != 0) {
  //     const companyData = JSON.stringify(result.success);
  //     localStorage.setItem("companyData", companyData);
  //     router.push("/dashboard");
  //     setLoading(false);
  //   } else {
  //     setLoading(false);
  //     toast.error(`${result.error.message}` || "Something went wrong");
  //   }
  //   setLoading(false);
  // };

  // const emailInputRef = useRef(null);
  // useEffect(() => {
  //   emailInputRef.current.focus();
  // }, []);


  return (
    <>
      <div className="bg-[#121826] h-screen flex justify-center items-center">
        <div className="bg-[#212936] text-white pt-6 pb-14 px-10 rounded-lg h-[514px] shadow-lg border-[1px] border-white">
          <Image
            src={`${IMAGE_BASE_URL}/habuild_logo.png`}
            width="40"
            height="40"
            className="mx-auto py-3"
            alt="habuild_logo"
          />
          <p className="text-[18px] font-bold pb-5">Sign In to Your Account</p>
          <div className="flex flex-col gap-9">
            <label className="">
              <p className="text-[14px] mb-2">Email</p>
              <input
          ref={emailInputRef} // Assign the ref to the email input

                type="email"
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter Your Email"
                className="px-5 py-2 border border-[#E2E8F0] rounded-lg bg-[#394150] w-full"
              />
            </label>
            <label className="">
              <p className="text-[14px] mb-2">Password</p>
              <div className="flex justify-center items-center border border-[#E2E8F0] rounded-lg">
                <input
                  type={showPassword ? "password" : "text"}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Enter Your Password"
                  className="px-5 py-2 bg-[#394150] rounded-lg w-full focus:outline-none"
                />
                <div onClick={() => setshowpassword(!showPassword)} className="cursor-pointer">
                  {showPassword ? (
                    <EyeOffIcon className="flex-shrink-0 mx-1" />
                  ) : (
                    <EyeIcon className="flex-shrink-0 mx-1" />
                  )}
                </div>
              </div>
            </label>
            <div>
              {loading ? (
                <>
                  <p className="bg-[#176FC1] p-2 text-center rounded-lg w-full text-white text-[10px] font-bold">
                    <div className="flex justify-center  items-center">
                      <div
                        className="animate-spin rounded-full h-5 w-5 border-[#fff] mr-2"
                        style={{
                          borderTop: "2px solid #fff",
                        }}
                      ></div>
                    </div>
                  </p>
                </>
              ) : (
                <button
                  className="bg-[#176FC1] p-2 text-center rounded-lg w-full text-white text-[10px] font-bold"
                  onClick={() => {
                    login();
                  }}
                >
                  SIGN IN
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Login;
