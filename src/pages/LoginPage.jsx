import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { TiCancel } from "react-icons/ti";
import { SlUser } from "react-icons/sl";
import { LuEye } from "react-icons/lu";
import { FiEyeOff } from "react-icons/fi";
import axios from "../axios";
import { setAdmin } from "../redux/slices/adminSlice";
// import { logoPng } from "../assets/images";
import { BtnLoader } from "../components";
import { config } from "../constants";
import { MdOutlineLock } from "react-icons/md";
export default function LoginPage() {
    const [data, setData] = useState({
        userId: "",
        password: "",
    });
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword); // Toggle password visibility
    };

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            console.log("call reached here");
            setIsLoading(true);
            setError("");

            const response = await axios.post("/auth/login", data);

            dispatch(setAdmin(response.data));
            navigate("/");
        } catch (err) {
            setError(
                err?.response?.data?.error || "Something went wrong, Try again"
            );
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-mainBg">
            <div className=" p-7 w-full max-w-sm">
               
                <form onSubmit={handleSubmit}>
                    <div className="mb-6 relative w-full">
                        {/* <label
                            for="user-id"
                            className="block mb-2 text-muted-foreground"
                        >
                            User ID
                        </label> */}
                        <input
                            type="text"
                            placeholder="Username"
                            className="w-full h-12 pl-10 pr-3 border border-gray-700 "
                            required
                            // autocomplete="off"
                            name="userId"
                            onChange={handleChange}
                        />
                        <SlUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-customGray text-xl" />{" "}
                    </div>

                    <div className="mb-6 relative w-full">
                        {/* <label
                            for="password"
                            className="block mb-2 text-muted-foreground"
                        >
                            Password
                        </label> */}
                        <input
                            type={showPassword ? "text" : "password"}
                            // id="password"
                            placeholder="Password"
                            className="w-full h-12 pl-10 pr-3 border border-gray-700"
                            required
                            autoComplete="off"
                            name="password"
                            onChange={handleChange}
                        />
                        <MdOutlineLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-customGray text-xl" />{" "}
                        <div
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-xl"
                            onClick={togglePasswordVisibility}
                        >
                            {showPassword ? (
                                <FiEyeOff className="text-customGray" />
                            ) : (
                                <LuEye className="text-customGray" />
                            )}
                        </div>
                    </div>
                    <div className="flex justify-center mt-8  mb-6">
                        {isLoading ? (
                            <BtnLoader />
                        ) : (
                            <button
                                type="submit"
                                className="  text-white hover:opacity-90 p-1 w-full  transition duration-200 ease-in-out mx-auto block"
                            >
                                LOGIN
                            </button>
                        )}
                    </div>
                </form>

                {error && (
                    <span className="text-sm block text-red-500 mt-2">
                        {error}
                    </span>
                )}
            </div>
            {/* <div className="w-full max-w-[420px] border p-7 rounded bg-white">
                <div className="mb-5">
                    <h1 className="font-[600] text-xl text-center">Login</h1>
                    <span className="block text-center text-sm text-gray-500 mt-1">
                        Welcome back to {config.COMPANY_NAME}
                    </span>
                </div>
                <form action="" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="">Email</label>
                        <input
                            type="email"
                            placeholder="Ex: example@gmail.com"
                            name="email"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mt-4">
                        <label htmlFor="">Password</label>
                        <input
                            type="password"
                            placeholder="********"
                            name="password"
                            onChange={handleChange}
                        />
                    </div>
                    {error && (
                        <span className="block text-sm text-red-500 mt-2">
                            {error}
                        </span>
                    )}
                    <button className="w-full mt-4">
                        {isLoading ? <BtnLoader /> : "Login"}
                    </button>
                </form>
            </div> */}
        </div>
    );
}
