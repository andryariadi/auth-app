import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { IoIosArrowRoundBack } from "react-icons/io";
import InputField from "../components/InputField";
import { IoMailOutline } from "react-icons/io5";
import { useState } from "react";
import useAuthStore from "../store/auth.store";
import { BiLoaderCircle } from "react-icons/bi";
import { toastStyle } from "../helper/toastStyle";
import toast from "react-hot-toast";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { forgotPassword, isLoading } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await forgotPassword(email);
    toast.success("Password reset link sent successfully!", {
      style: toastStyle,
    });
    setIsSubmitted(true);
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="w-full max-w-md bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden">
      <div className="p-8 flex flex-col gap-6">
        <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text">Forgot Password</h2>

        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <span className="text-sm text-center text-gray-400">Enter your email address and well send you a link to reset your password</span>

            <InputField icon={<IoMailOutline size={22} />} type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />

            <motion.button
              className="w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-300"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? <BiLoaderCircle size={22} className="animate-spin mx-auto" /> : "Send Password Reset Link"}
            </motion.button>
          </form>
        ) : (
          <div className="bg-violt-500 flex flex-col gap-3 items-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className="group size-16 rounded-full border border-green-500 flex items-center justify-center hover:bg-green-500 transition-all duration-300"
            >
              <IoMailOutline size={30} className="text-green-500 group-hover:text-white transition-all duration-300" />
            </motion.div>

            <p className="text-sm text-center text-gray-400">If an account exists for {email}, you will receive a password reset link shortly.</p>
          </div>
        )}
      </div>
      <div className="bg-gray-800 bg-opacity-50 px-8 py-4 flex items-center justify-center text-green-500">
        <IoIosArrowRoundBack size={22} className="" />
        <Link to="/login" className="text-sm ml-2 inline-block hover:scale-110 transition-all duration-300">
          Back to Login
        </Link>
      </div>
    </motion.div>
  );
};

export default ForgotPasswordPage;
