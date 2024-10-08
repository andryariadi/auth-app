import { motion } from "framer-motion";
import { useState } from "react";
import InputField from "../components/InputField";
import { Lock } from "lucide-react";
import { PiEye } from "react-icons/pi";
import { RiEyeCloseFill } from "react-icons/ri";
import useAuthStore from "../store/auth.store";
import { BiLoaderCircle } from "react-icons/bi";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { toastStyle } from "../helper/toastStyle";

const ResetPasswordPage = () => {
  const [openPass, setOpenPass] = useState(false);
  const [openConfirmPass, setOpenConfirmPass] = useState(false);

  const { resetPassword, isLoading, error, message } = useAuthStore();

  const { token } = useParams();
  const navigate = useNavigate();

  const [input, setInput] = useState({
    password: "",
    confirmPassword: "",
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

    if (input.password !== input.confirmPassword) {
      toast.error("Passwords do not match", {
        style: toastStyle,
      });
      return;
    }

    try {
      await resetPassword(token, input.password);

      toast.success("Password reset successfully, redirecting to login page...", {
        style: toastStyle,
      });
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message, {
        style: toastStyle,
      });
    }
  };
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="w-full max-w-md bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden">
      <div className="p-8 flex flex-col gap-6">
        <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text">Reset Password</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="bg-violt-500 bg-ros-500 flex flex-col gap-4">
            <InputField
              icon={<Lock size={22} />}
              passIcon={openPass ? <PiEye size={22} /> : <RiEyeCloseFill size={22} />}
              openPass={openPass}
              setOpenPass={setOpenPass}
              type={openPass ? "text" : "password"}
              placeholder="New Password"
              name="password"
              value={input.password}
              onChange={handleChange}
            />

            <InputField
              icon={<Lock size={22} />}
              passIcon={openConfirmPass ? <PiEye size={22} /> : <RiEyeCloseFill size={22} />}
              openPass={openConfirmPass}
              setOpenPass={setOpenConfirmPass}
              type={openConfirmPass ? "text" : "password"}
              placeholder="Confirm New Password"
              name="confirmPassword"
              value={input.confirmPassword}
              onChange={handleChange}
            />
          </div>

          {error && <p className="text-red-500">{error}</p>}
          {message && <p className="text-green-500">{message}</p>}

          <motion.button
            className="w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-300"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? <BiLoaderCircle size={22} className="animate-spin mx-auto" /> : "Reset Password"}
          </motion.button>
        </form>
      </div>
    </motion.div>
  );
};

export default ResetPasswordPage;
