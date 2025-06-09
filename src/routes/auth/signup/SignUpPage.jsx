import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { Helmet } from "@dr.pogodin/react-helmet";
import axios from "axios";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import countryCodes from "@/data/countryCodes";
import { FaUser, FaEnvelope, FaLock, FaPhone, FaCalendarAlt, FaMapMarkerAlt, FaCity, FaGlobeAmericas, FaEye } from "react-icons/fa";


export default function SignUpPage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        watch
    } = useForm({
        defaultValues: {
            firstName: searchParams.get("firstName") || "",
            lastName: searchParams.get("lastName") || "",
            email: searchParams.get("email") || "",
        }
    });

    useEffect(() => {
        const params = new URLSearchParams(searchParams);
        ["firstName", "lastName", "email"].forEach(key => params.delete(key));
        setSearchParams(params);
    }, []);

    const onSubmit = async (data) => {
        try {
            const baseURL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";
            await axios.post(
                "/auth/register",
                data,
                {
                    baseURL,
                    withCredentials: true
                }
            );

            return navigate(searchParams.get("redirect") || "/profile");
        } catch (error) {
            const errorMessage = error.response?.data?.error || error.message || "Registration failed. Please try again.";
            toast(errorMessage);
        }
    };

    // Reusable Input Field Component
    const FormInput = ({
        id,
        label,
        type,
        placeholder,
        icon: Icon,
        registerOptions,
        errors,
        defaultValue,
        showPasswordToggle = false,
        isPasswordVisible = false,
        onTogglePassword = null
    }) => (
        <div className="mb-4">
            <label htmlFor={id} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {label}
            </label>
            <div className="relative">
                {Icon && (
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Icon className="text-gray-400 dark:text-gray-500" />
                    </div>
                )}
                <input
                    id={id}
                    type={type}
                    {...register(id, registerOptions)}
                    defaultValue={defaultValue}
                    className={`w-full ${Icon ? 'pl-10' : 'pl-3'} pr-${showPasswordToggle ? '10' : '3'} py-2 rounded-lg border ${errors[id] ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                        } focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition-colors duration-300`}
                    placeholder={placeholder}
                />
                {showPasswordToggle && (
                    <button
                        type="button"
                        onClick={onTogglePassword}
                        aria-label={isPasswordVisible ? "Hide password" : "Show password"}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-400"
                    >
                        {isPasswordVisible ? (
                            <FaEyeSlash aria-hidden className="h-5 w-5" />
                        ) : (
                            <FaEye aria-hidden className="h-5 w-5" />
                        )}
                    </button>
                )}
            </div>
            {errors[id] && (
                <p className="mt-1 text-sm text-red-500 dark:text-red-400">{errors[id].message}</p>
            )}
        </div>
    );

    return (
        <>
            <Helmet>
                <title>Sign Up - New User Registration | HiMart</title>
            </Helmet>
            <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4 transition-colors duration-300 pt-26">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="w-full max-w-4xl"
                >
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl dark:shadow-gray-900 overflow-hidden flex transition-colors duration-300">
                        <div className="w-full p-8 dark:bg-gray-800 transition-colors duration-300 relative">
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 mb-10 text-center">
                                <h1 className="text-2xl font-bold">
                                    <span className="text-blue-500 dark:text-blue-400">Hi</span>
                                    <span className="text-red-500 dark:text-red-400">Mart</span>
                                </h1>
                                <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                                    New User Registration
                                </h2>
                            </div>

                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                                {/* Name Section */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <FormInput
                                        id="firstName"
                                        label="First Name *"
                                        type="text"
                                        placeholder="John"
                                        icon={FaUser}
                                        registerOptions={{ required: "First name is required" }}
                                        errors={errors}
                                    />
                                    <FormInput
                                        id="lastName"
                                        label="Last Name *"
                                        type="text"
                                        placeholder="Doe"
                                        icon={FaUser}
                                        registerOptions={{ required: "Last name is required" }}
                                        errors={errors}
                                    />
                                </div>

                                {/* Date of Birth */}
                                <FormInput
                                    id="dateOfBirth"
                                    label="Date of Birth *"
                                    type="date"
                                    defaultValue={new Date().toISOString().split('T')[0]}
                                    icon={FaCalendarAlt}
                                    registerOptions={{
                                        required: "Date of birth is required",
                                        validate: (value) => {
                                            const birthDate = new Date(value);
                                            const today = new Date();
                                            const age = today.getFullYear() - birthDate.getFullYear();
                                            const m = today.getMonth() - birthDate.getMonth();
                                            const isOldEnough =
                                                age > 12 || (age === 12 && m >= 0 && today.getDate() >= birthDate.getDate());

                                            return isOldEnough || "You must be at least 12 years old";
                                        },
                                    }}
                                    errors={errors}
                                />

                                {/* Address Section */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <FormInput
                                        id="address"
                                        label="Street Address *"
                                        type="text"
                                        placeholder="123 Main St"
                                        icon={FaMapMarkerAlt}
                                        registerOptions={{ required: "Address is required" }}
                                        errors={errors}
                                    />
                                    <FormInput
                                        id="city"
                                        label="City *"
                                        type="text"
                                        placeholder="New York"
                                        icon={FaCity}
                                        registerOptions={{ required: "City is required" }}
                                        errors={errors}
                                    />
                                </div>

                                {/* City, State, Country */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <FormInput
                                        id="state"
                                        label="State/Province *"
                                        type="text"
                                        placeholder="NY"
                                        icon={FaMapMarkerAlt}
                                        registerOptions={{ required: "State is required" }}
                                        errors={errors}
                                    />
                                    <FormInput
                                        id="postalCode"
                                        label="Postal Code *"
                                        type="text"
                                        placeholder="1000"
                                        icon={FaCity}
                                        registerOptions={{ required: "Postal Code is required" }}
                                        errors={errors}
                                    />
                                    <div className="mb-4">
                                        <label htmlFor="country" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                            Country *
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <FaGlobeAmericas aria-hidden className="text-gray-400 dark:text-gray-500" />
                                            </div>
                                            <select
                                                id="country"
                                                {...register("country", { required: "Country is required" })}
                                                className={`w-full pl-10 pr-3 py-2 rounded-lg border ${errors.country ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                                                    } focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white appearance-none transition-colors duration-300`}
                                            >
                                                <option value="">Select Country</option>
                                                {countryCodes.map((country) => (
                                                    <option key={country.code} value={country.name.toLocaleLowerCase()}>
                                                        {country.name}
                                                    </option>
                                                ))}
                                            </select>
                                            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                                <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                </svg>
                                            </div>
                                        </div>
                                        {errors.country && (
                                            <p className="mt-1 text-sm text-red-500 dark:text-red-400">{errors.country.message}</p>
                                        )}
                                    </div>
                                </div>

                                {/* Contact Info */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <FormInput
                                        id="email"
                                        label="Email *"
                                        type="email"
                                        placeholder="your@email.com"
                                        icon={FaEnvelope}
                                        registerOptions={{
                                            required: "Email is required",
                                            pattern: { value: /^\S+@\S+$/i, message: "Invalid email" }
                                        }}
                                        errors={errors}
                                    />
                                    <div className="mb-4">
                                        <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                            Phone Number *
                                        </label>
                                        <div className="flex">
                                            {/* Country Code */}
                                            <div className="relative w-24 mr-2">
                                                <select
                                                    {...register("countryCode", { required: true })}
                                                    className="w-full pl-2 pr-6 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:focus:ring-blue-600 appearance-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-300"
                                                >
                                                    <option value="">Country Code</option>
                                                    {countryCodes.map((code) => (
                                                        <option key={code.code} value={code.dial_code}>
                                                            {code.code} {code.dial_code}
                                                        </option>
                                                    ))}
                                                </select>
                                                <div className="absolute inset-y-0 right-0 flex items-center pr-1 pointer-events-none">
                                                    <svg className="h-3 w-3 text-gray-400 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                    </svg>
                                                </div>
                                            </div>

                                            {/* Phone Number */}
                                            <div className="relative flex-1">
                                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                    <FaPhone aria-hidden className="text-gray-400 dark:text-gray-500 text-sm" />
                                                </div>
                                                <input
                                                    id="phoneNumber"
                                                    type="tel"
                                                    {...register("phoneNumber", {
                                                        required: "Required",
                                                        pattern: { value: /^[0-9]{8,15}$/, message: "Invalid phone" }
                                                    })}
                                                    className={`w-full pl-9 pr-3 py-2 text-sm rounded-lg border ${errors.phone ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                                                        } focus:outline-none focus:ring-1 focus:ring-blue-500 dark:focus:ring-blue-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-colors duration-300`}
                                                    placeholder="Phone number"
                                                />
                                            </div>
                                        </div>
                                        {errors.phone && (
                                            <p className="mt-1 text-xs text-red-500 dark:text-red-400">{errors.phone.message}</p>
                                        )}
                                    </div>
                                </div>

                                {/* Password Section */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <FormInput
                                        id="password"
                                        label="Password *"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="••••••••"
                                        icon={FaLock}
                                        registerOptions={{
                                            required: "Password is required",
                                            minLength: { value: 8, message: "Minimum 8 characters" }
                                        }}
                                        errors={errors}
                                        showPasswordToggle={true}
                                        isPasswordVisible={showPassword}
                                        onTogglePassword={() => setShowPassword(!showPassword)}
                                    />
                                    <FormInput
                                        id="confirmPassword"
                                        label="Confirm Password *"
                                        type={showConfirmPassword ? "text" : "password"}
                                        placeholder="••••••••"
                                        icon={FaLock}
                                        registerOptions={{
                                            required: "Please confirm your password",
                                            validate: value =>
                                                value === watch('password') || "Passwords don't match"
                                        }}
                                        errors={errors}
                                        showPasswordToggle={true}
                                        isPasswordVisible={showConfirmPassword}
                                        onTogglePassword={() => setShowConfirmPassword(!showConfirmPassword)}
                                    />
                                </div>

                                <div className="flex items-start">
                                    <div className="flex items-center h-4">
                                        <input
                                            id="terms"
                                            type="checkbox"
                                            {...register("terms", { required: "You must accept the terms" })}
                                            className="h-3 w-3 text-blue-600 dark:text-blue-500 focus:ring-blue-500 dark:focus:ring-blue-600 border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700"
                                        />
                                    </div>
                                    <div className="ml-2 text-xs">
                                        <label htmlFor="terms" className="text-gray-700 dark:text-gray-300">
                                            I agree to the{' '}
                                            <a href="/terms" className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300">
                                                Terms
                                            </a>{' '}
                                            and{' '}
                                            <a href="/privacy" className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300">
                                                Privacy Policy
                                            </a>
                                        </label>
                                        {errors.terms && (
                                            <p className="mt-1 text-xs text-red-500 dark:text-red-400">{errors.terms.message}</p>
                                        )}
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <div className="pt-2">
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        type="submit"
                                        disabled={isSubmitting}
                                        className={`w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-700 dark:to-indigo-700 text-white font-medium rounded-lg shadow-md hover:from-blue-700 hover:to-indigo-700 dark:hover:from-blue-800 dark:hover:to-indigo-800 transition-all duration-300 ${isSubmitting ? 'opacity-80 cursor-not-allowed' : ''
                                            }`}
                                    >
                                        {isSubmitting ? (
                                            <span className="flex items-center justify-center">
                                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Processing...
                                            </span>
                                        ) : (
                                            'Sign Up'
                                        )}
                                    </motion.button>
                                </div>
                                <div className="mt-4 text-center text-xs">
                                    <p className="text-gray-600 dark:text-gray-400">
                                        Already have an account?{' '}
                                        <a href="/auth/signin" className="font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300">
                                            Sign in
                                        </a>
                                    </p>
                                </div>
                            </form>
                        </div>
                    </div>
                </motion.div>
            </main>
        </>
    );
}