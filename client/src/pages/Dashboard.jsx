import { motion } from "framer-motion";
import useAuthStore from "../store/auth.store";
import { formatDate } from "../helper/date";
import { HiUser } from "react-icons/hi2";
import { IoIosMail } from "react-icons/io";
import { BiLoaderCircle } from "react-icons/bi";
import { IoMdLogOut } from "react-icons/io";
import toast from "react-hot-toast";
import { toastStyle } from "../helper/toastStyle";
const DashboardPage = () => {
  const { user, isLoading, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    toast.success("Logout successfully!", {
      style: toastStyle,
    });
  };
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md p-8 bg-gray-900 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden"
    >
      <h2 className="mb-6 text-3xl font-bold text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text">Dashboard</h2>

      <div className="space-y-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-gray-800 p-4 bg-opacity-50 rounded-lg border border-gray-700">
          <h3 className="text-xl font-semibold text-green-400 mb-3">Profile Information</h3>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <HiUser size={22} className="text-green-400" />
              <p className="text-gray-300">{user.username}</p>
            </div>
            <div className="flex items-center gap-2">
              <IoIosMail size={22} className="text-green-400" />
              <p className="text-gray-300">{user.email}</p>
            </div>
          </div>
        </motion.div>

        <motion.div className="p-4 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <h3 className="text-xl font-semibold text-green-400 mb-3">Account Activity</h3>
          <div className="space-y-1">
            <p className="text-gray-300 text-sm">
              <span className="font-bold">Joined: </span>
              {new Date(user.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
            <p className="text-gray-300 text-sm">
              <span className="font-bold">Last Login: </span>
              {formatDate(user.lastLogin)}
            </p>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
          <motion.button
            className="w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-300"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={isLoading}
            onClick={handleLogout}
          >
            {isLoading ? (
              <BiLoaderCircle size={22} className="animate-spin mx-auto" />
            ) : (
              <div className="flex items-center justify-center gap-2">
                <IoMdLogOut size={22} />
                <span>Logout</span>
              </div>
            )}
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default DashboardPage;
