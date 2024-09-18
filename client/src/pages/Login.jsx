import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import InputField from "../components/InputField";
import { IoMailOutline } from "react-icons/io5";
import { PiEye } from "react-icons/pi";
import { RiEyeCloseFill } from "react-icons/ri";
import { Lock } from "lucide-react";
import { useState } from "react";
import { BiLoaderCircle } from "react-icons/bi";
import useAuthStore from "../store/auth.store";
import toast from "react-hot-toast";

const LoginPage = () => {
  const [openPass, setOpenPass] = useState(false);
  // const navigate = useNavigate();
  const { login, isLoading, error } = useAuthStore();

  const [input, setInput] = useState({
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await login(input);
      toast.success("Login successfully!", {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
      // navigate("/");
    } catch (error) {
      console.log(error);
      toast.error(error.response, {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    }
  };
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="w-full max-w-md bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden">
      <div className="p-8 flex flex-col gap-5">
        <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text">Welcome Back</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="bg-violt-500 bg-ros-500 flex flex-col gap-4">
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

          <div>
            <Link to="/forgot-password" className="text-green-500 text-sm inline-block hover:scale-105 transition-all duration-300">
              Forgot Password?
            </Link>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <motion.button
            className="w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-300"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? <BiLoaderCircle size={22} className="animate-spin mx-auto" /> : "Login"}
          </motion.button>
        </form>
      </div>
      <div className="bg-gray-800 bg-opacity-50 px-8 py-4 text-sm">
        <p className="text-center text-gray-400">
          Don't have an account?
          <Link to="/signup" className="text-green-500 ml-2 inline-block hover:scale-110 transition-all duration-300">
            Signup
          </Link>
        </p>
      </div>
    </motion.div>
  );
};

export default LoginPage;
