import { motion } from "framer-motion";
import InputField from "../components/InputField";
import { Lock, UserRound } from "lucide-react";
import { RiEyeCloseFill } from "react-icons/ri";
import { IoMailOutline } from "react-icons/io5";
import { PiEye } from "react-icons/pi";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PasswordStrength from "../components/PasswordStrength";
import useAuthStore from "../store/auth.store";
import { TbLoader } from "react-icons/tb";
import toast from "react-hot-toast";
import { toastStyle } from "../helper/toastStyle";

const SignupPage = () => {
  const navigate = useNavigate();
  const { signup, error, isLoading } = useAuthStore();

  const [openPass, setOpenPass] = useState(false);
  const [input, setInput] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await signup(input);
      toast.success("Account created successfully!", {
        style: toastStyle,
      });
      navigate("/verify-email");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message, {
        style: toastStyle,
      });
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="w-full max-w-md bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden">
      <div className="p-8 flex flex-col gap-5">
        <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text">Create Account</h2>

        <form onSubmit={handleSignup} className="flex flex-col gap-6">
          <div className="bg-ros-500 flex flex-col gap-4">
            <InputField icon={<UserRound size={22} />} type="text" placeholder="Username" name="username" value={input.username} onChange={handleChange} />

            <InputField icon={<IoMailOutline size={22} />} type="email" placeholder="Email" name="email" value={input.email} onChange={handleChange} />

            <InputField
              icon={<Lock size={22} />}
              passIcon={openPass ? <PiEye size={22} /> : <RiEyeCloseFill size={22} />}
              openPass={openPass}
              setOpenPass={setOpenPass}
              type={openPass ? "text" : "password"}
              placeholder="Password"
              name="password"
              value={input.password}
              onChange={handleChange}
            />
          </div>

          {error && <p className="text-red-500">{error}</p>}

          <PasswordStrength password={input.password} />

          <motion.button
            className="py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-300"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? <TbLoader scale={22} className="animate-spin mx-auto" /> : "Sign Up"}
          </motion.button>
        </form>
      </div>
      <div className="bg-gray-800 bg-opacity-50 px-8 py-4 text-sm">
        <p className="text-center text-gray-400">
          Already have an account?
          <Link to="/login" className="text-green-500 ml-2 inline-block hover:scale-110 transition-all duration-300">
            Login
          </Link>
        </p>
      </div>
    </motion.div>
  );
};

export default SignupPage;
