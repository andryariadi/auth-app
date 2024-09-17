import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/auth.store";
import toast from "react-hot-toast";
import { TbLoader } from "react-icons/tb";

const toastStyle = {
  borderRadius: "10px",
  background: "#333",
  color: "#fff",
};

const EmailVerificationPage = () => {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const inputRef = useRef([]);
  const navigate = useNavigate();

  const { verifyEmail, error, isLoading } = useAuthStore();

  const hanleChange = (index, value) => {
    const newCode = [...code];

    if (value.length > 1) {
      const pastedCode = value.slice(0, 6).split("");
      for (let i = 0; i < pastedCode.length; i++) {
        newCode[i] = pastedCode[i];
      }
      setCode(newCode);

      // Focus on the last non-empty input or the first empty one
      const lastFilledIndex = newCode.findLastIndex((digit) => digit !== "");
      const focusIndex = lastFilledIndex < 5 ? lastFilledIndex + 1 : 5;
      inputRef.current[focusIndex].focus();
    } else {
      newCode[index] = value;
      setCode(newCode);
      // Move focus to the next input field if value is entered
      if (value && index < 5) {
        inputRef.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRef.current[index - 1].focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const codeString = code.join("");

    try {
      await verifyEmail(codeString);
      navigate("/login");
      toast.success("Email verified successfully!", {
        style: {
          toastStyle,
        },
      });
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message, {
        style: {
          toastStyle,
        },
      });
    }
  };

  // Auto submit when all fields are filled
  useEffect(() => {
    if (code.every((digit) => digit !== "")) {
      handleSubmit(new Event("submit"));
    }
  }, [code]);
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="w-full max-w-md bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden">
      <div className="p-8 flex flex-col gap-6">
        <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text">Verify Your Email</h2>

        <span className="text-sm text-center text-gray-400">Enter the 6-digit code sent to your email address</span>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="bg-violt-500 bg-ros-500 flex items-center justify-between">
            {code.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRef.current[index] = el)}
                type="text"
                maxLength="6"
                value={digit}
                onChange={(e) => hanleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="size-12 text-center text-2xl font-bold bg-gray-700 text-white border-2 border-gray-600 rounded-lg focus:border-green-500 focus:outline-none"
              />
            ))}
          </div>

          {error && <p className="text-red-500 text-center text-sm">{error}</p>}

          <motion.button
            className="w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-300"
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? <TbLoader size={22} className="animate-spin mx-auto" /> : "Verify Email"}
          </motion.button>
        </form>
      </div>
    </motion.div>
  );
};

export default EmailVerificationPage;
