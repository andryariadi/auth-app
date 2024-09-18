import { Navigate, Route, Routes } from "react-router-dom";
import FloatingShape from "./components/FloatingShape";
import SignupPage from "./pages/Signup";
import LoginPage from "./pages/Login";
import EmailVerificationPage from "./pages/EmailVerification";
import ForgotPasswordPage from "./pages/ForgotPassword";
import ResetPasswordPage from "./pages/ResetPassword";
import DashboardPage from "./pages/Dashboard";
import { Toaster } from "react-hot-toast";
import useAuthStore from "./store/auth.store";
import { useEffect } from "react";
import LoadingSpinner from "./components/LoadingSpinner";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  if (!user.isVerified) return <Navigate to="/verify-email" replace />;

  return children;
};

const RedirectAuthenticatedUser = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (isAuthenticated && user.isVerified) return <Navigate to="/" replace />;

  return children;
};

function App() {
  const { chackAuth, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    chackAuth();
  }, [chackAuth]);

  if (isCheckingAuth) return <LoadingSpinner />;

  return (
    <>
      <main className="min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-emerald-900 relative overflow-hidden flex items-center justify-center">
        <FloatingShape color="bg-green-500" size="size-64" top="-5%" left="10%" delay={0} />
        <FloatingShape color="bg-emerald-500" size="size-48" top="70%" left="80%" delay={5} />
        <FloatingShape color="bg-lime-500" size="size-32" top="40%" left="-10%" delay={2} />

        <Routes>
          <Route
            path="/signup"
            element={
              <RedirectAuthenticatedUser>
                <SignupPage />
              </RedirectAuthenticatedUser>
            }
          />
          <Route
            path="/login"
            element={
              <RedirectAuthenticatedUser>
                <LoginPage />
              </RedirectAuthenticatedUser>
            }
          />
          <Route path="/verify-email" element={<EmailVerificationPage />} />
          <Route
            path="/forgot-password"
            element={
              <RedirectAuthenticatedUser>
                <ForgotPasswordPage />
              </RedirectAuthenticatedUser>
            }
          />
          <Route
            path="/reset-password/:token"
            element={
              <RedirectAuthenticatedUser>
                <ResetPasswordPage />
              </RedirectAuthenticatedUser>
            }
          />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
        </Routes>
        <Toaster position="top-right" />
      </main>
    </>
  );
}

export default App;
