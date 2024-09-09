import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { IoIosArrowRoundBack } from "react-icons/io";
import InputField from "../components/InputField";
import { IoMailOutline } from "react-icons/io5";

const ForgotPasswordPage = () => {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="w-full max-w-md bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden">
      <div className="p-8 flex flex-col gap-6">
        <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text">Forgot Password</h2>

        <span className="text-sm text-center text-gray-400">Enter your email address and well send you a link to reset your password</span>

        <form action="" className="flex flex-col gap-6">
          <InputField icon={<IoMailOutline size={22} />} type="email" placeholder="Email" />

          <motion.button
            className="w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-300"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
          >
            Send Reset Link
          </motion.button>
        </form>
      </div>
      <div className="bg-gray-800 bg-opacity-50 px-8 py-4 flex items-center justify-center text-emerald-500">
        <IoIosArrowRoundBack size={22} className="" />
        <Link to="/login" className="text-sm ml-2 inline-block hover:scale-110 transition-all duration-300">
          Back to Login
        </Link>
      </div>
    </motion.div>
  );
};

export default ForgotPasswordPage;
