import { Route, Routes } from "react-router-dom";
import FloatingShape from "./components/FloatingShape";
import SignupPage from "./pages/Signup";
import LoginPage from "./pages/Login";
import EmailVerificationPage from "./pages/EmailVerification";
import ForgotPasswordPage from "./pages/ForgotPassword";
import ResetPasswordPage from "./pages/ResetPassword";
import DashboardPage from "./pages/Dashboard";

function App() {
  return (
    <>
      <main className="min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-emerald-900 relative overflow-hidden flex items-center justify-center">
        <FloatingShape color="bg-green-500" size="size-64" top="-5%" left="10%" delay={0} />
        <FloatingShape color="bg-emerald-500" size="size-48" top="70%" left="80%" delay={5} />
        <FloatingShape color="bg-lime-500" size="size-32" top="40%" left="-10%" delay={2} />

        <Routes>
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/verify-email" element={<EmailVerificationPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
          <Route path="/" element={<DashboardPage />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
