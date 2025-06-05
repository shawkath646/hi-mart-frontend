import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { Helmet } from '@dr.pogodin/react-helmet';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { useAuth } from '@/contexts/useAuth';
import { FaGoogle, FaEye, FaEyeSlash, FaLock, FaEnvelope, FaFacebook } from 'react-icons/fa';
import { HiOutlineShoppingBag } from 'react-icons/hi';


const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL || "http://localhost:5000",
  withCredentials: true,
});

const SignInPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { fetchSession } = useAuth();

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      await api.post('/auth/login', {
        email: data.email,
        password: data.password
      });

      await fetchSession();
      return navigate(searchParams.get('redirect') || "/profile");
    } catch (error) {
      const errorMessage = error.response?.data?.error || error.message || 'Login failed. Please try again.';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = async (provider) => {
    try {
      setLoading(true);
      const response = await api.post(`/auth/login/${provider}`);

      if (response.status === 200 && response.data.url) {
        const windowFeatures = "width=500,height=600,left=100,top=100,menubar=no,toolbar=no,location=no,status=no,scrollbars=yes,resizable=yes";

        window.addEventListener('message', async (event) => {
          if (event.origin !== import.meta.env.VITE_BACKEND_URL) return;

          if (event.data.type === `${provider}-auth-success`) {
            await fetchSession();
            return navigate(searchParams.get('redirect') || "/profile");
          } else if (event.data.type === 'user-not-found') {
            return navigate(`/auth/signup?email=${event.data.user.email}&firstName=${event.data.user.firstName}&lastName=${event.data.user.lastName}&picture=${event.data.user.picture}`);
          } else if (event.data.type === `${provider}-auth-failure`) {
            toast.error(event.data.error || `${provider} authentication failed`);
          }
        });

        const popup = window.open(response.data.url, "_blank", windowFeatures);
        if (!popup) {
          toast.error('Please allow pop-ups for this site to continue with social login.');
        }
      }
    } catch (error) {
      const errorMessage = err.response?.data?.message || error.message || `${provider} login failed. Please try again.`;
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const SocialButton = ({ provider, Icon, color }) => (
    <motion.button
      whileHover={!loading && !isSubmitting ? { y: -2 } : {}}
      whileTap={!loading && !isSubmitting ? { scale: 0.98 } : {}}
      type="button"
      onClick={() => handleSocialLogin(provider.toLowerCase())}
      disabled={loading || isSubmitting}
      className={`flex items-center justify-center py-2 px-4 border rounded-lg shadow-sm text-sm font-medium transition-colors duration-300
        ${loading || isSubmitting
          ? "opacity-50 cursor-not-allowed bg-gray-200 dark:bg-gray-600 border-gray-300 dark:border-gray-600 text-gray-400 dark:text-gray-400"
          : "bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600"
        }`}
    >
      <Icon className={`${color} mr-2`} />
      {provider}
    </motion.button>
  );

  return (
    <>
      <Helmet>
        <title>Sign In | HiMart</title>
      </Helmet>
      <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4 transition-colors duration-300">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-md"
        >
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl dark:shadow-gray-900 overflow-hidden transition-colors duration-300">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 dark:from-blue-800 dark:to-indigo-900 p-6 text-center">
              <div className="flex items-center justify-center space-x-2">
                <HiOutlineShoppingBag className="text-white text-3xl" />
                <h1 className="text-2xl font-bold text-white">HiMart</h1>
              </div>
              <p className="mt-2 text-blue-100 dark:text-blue-200">
                Welcome back! Please sign in to your account
              </p>
            </div>

            {/* Form */}
            <div className="p-8">
              <form onSubmit={handleSubmit(onSubmit)}>
                {/* Email Field */}
                <div className="mb-6">
                  <label htmlFor="email" className="block text-gray-700 dark:text-gray-300 mb-2">Email</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaEnvelope aria-hidden className="text-gray-400 dark:text-gray-500" />
                    </div>
                    <input
                      id="email"
                      type="email"
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Invalid email address"
                        }
                      })}
                      className={`w-full pl-10 pr-3 py-3 rounded-lg border ${errors.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-300`}
                      placeholder="your@email.com"
                    />
                  </div>
                  {errors.email && (
                    <p className="text-red-500 dark:text-red-400 text-sm mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Password Field */}
                <div className="mb-6">
                  <label htmlFor="password" className="block text-gray-700 dark:text-gray-300 mb-2">Password</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaLock aria-hidden className="text-gray-400 dark:text-gray-500" />
                    </div>
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      {...register("password", {
                        required: "Password is required",
                        minLength: {
                          value: 6,
                          message: "Password must be at least 6 characters"
                        }
                      })}
                      className={`w-full pl-10 pr-10 py-3 rounded-lg border ${errors.password ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'} focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-300`}
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      {showPassword ? (
                        <FaEyeSlash aria-hidden className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-400" />
                      ) : (
                        <FaEye aria-hidden className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-400" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-red-500 dark:text-red-400 text-sm mt-1">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                {/* Remember & Forgot */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <input
                      id="remember"
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 dark:text-blue-500 focus:ring-blue-500 border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700"
                    />
                    <label htmlFor="remember" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                      Remember me
                    </label>
                  </div>
                  <a href="/forgot-password" className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300">
                    Forgot password?
                  </a>
                </div>

                {/* Submit Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isSubmitting || loading}
                  className={`w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-indigo-700 dark:from-blue-700 dark:to-indigo-800 hover:from-blue-700 hover:to-indigo-800 text-white font-medium rounded-lg shadow-md transition duration-300 ${(isSubmitting || loading) ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {(isSubmitting || loading) ? 'Signing in...' : 'Sign In'}
                </motion.button>
              </form>

              {/* Divider */}
              <div className="flex items-center my-6">
                <div className="flex-1 border-t border-gray-300 dark:border-gray-600"></div>
                <span className="px-3 text-gray-500 dark:text-gray-400">or continue with</span>
                <div className="flex-1 border-t border-gray-300 dark:border-gray-600"></div>
              </div>

              {/* Social Buttons */}
              <div className="grid grid-cols-2 gap-4">
                <SocialButton provider="Google" Icon={FaGoogle} color="text-red-500 dark:text-red-400" />
                {/* <SocialButton provider="Facebook" Icon={FaFacebook} color="text-blue-500 dark:text-blue-400" /> */}
              </div>

              {/* Sign Up Link */}
              <div className="mt-6 text-center">
                <p className="text-gray-600 dark:text-gray-400">
                  Don't have an account?{' '}
                  <a href="/auth/signup" className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium">
                    Sign up
                  </a>
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </main>
    </>
  );
};

export default SignInPage;