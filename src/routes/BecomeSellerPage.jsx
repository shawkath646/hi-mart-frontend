import { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useAuth } from '../libs/useAuth';
import { toast } from 'react-toastify';
import { FaStore, FaChartLine, FaWallet, FaShieldAlt, FaCheck, FaArrowRight, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import sellerIllustration from '../assets/deepseek_svg_20250503_b60764.svg';


const BecomeSellerPage = () => {
    const [activeStep, setActiveStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();
    const { fetchSession } = useAuth();

    const businessTypes = ['Retail', 'Wholesale', 'Manufacturer', 'Service Provider', 'Artisan/Creator'];

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isValid: isStepValid },
        trigger
    } = useForm({
        defaultValues: {
            businessName: '',
            businessType: '',
            businessDescription: '',
            email: '',
            phone: '',
            address: '',
            taxId: '',
            acceptedTerms: false
        }
    });

    const nextStep = async () => {
        // Validate current step before proceeding
        let isValid = false;

        switch (activeStep) {
            case 1:
                isValid = await trigger(['businessName', 'businessType']);
                break;
            case 2:
                isValid = await trigger(['email', 'phone', 'address']);
                break;
            case 3:
                isValid = await trigger(['taxId', 'acceptedTerms']);
                break;
            default:
                isValid = true;
        }

        if (isValid) {
            setActiveStep(prev => Math.min(prev + 1, 5));
        }
    };

    const prevStep = () => setActiveStep(prev => Math.max(prev - 1, 1));

    const onSubmit = async (data) => {
        setIsSubmitting(true);
        try {
            const baseURL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";
            await axios.post('/seller/register', data, { baseURL, withCredentials: true });
            await fetchSession();
            return navigate("/seller/dashboard", { replace: true });
        } catch (error) {
            const errorMessage = error.response?.data?.error || error.message || "Submission failed. Please try again.";
            toast.error(errorMessage);
        } finally {
            setIsSubmitting(false);
        }
    };

    // Reusable Input Component
    const FormInput = ({ name, label, type = 'text', placeholder, required = true, validation = {}, icon: Icon }) => (
        <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 mb-2">
                {label} {required && '*'}
            </label>
            <div className="relative">
                {Icon && (
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Icon className="text-gray-400 dark:text-gray-500" />
                    </div>
                )}
                <input
                    type={type}
                    {...register(name, { required: required && `${label} is required`, ...validation })}
                    className={`w-full ${Icon ? 'pl-10' : 'pl-3'} pr-3 py-3 rounded-lg border ${errors[name] ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                        } focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800 transition bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                    placeholder={placeholder}
                />
            </div>
            {errors[name] && (
                <p className="mt-1 text-sm text-red-500 dark:text-red-400">{errors[name].message}</p>
            )}
        </div>
    );

    return (
        <main className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 pt-24 pb-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Start Selling on Our Marketplace</h1>
                    <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                        Join thousands of sellers growing their business with our platform. Get access to millions of customers.
                    </p>
                </motion.div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Benefits Sidebar */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="lg:w-1/3 bg-white dark:bg-gray-800 rounded-xl shadow-lg dark:shadow-gray-900 p-6 h-fit sticky top-8 transition-colors duration-300"
                    >
                        <div className="mb-8">
                            <img
                                src={sellerIllustration}
                                alt="Seller illustration"
                                className="w-full h-auto"
                            />
                        </div>

                        <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-white">Why Sell With Us?</h2>

                        <div className="space-y-5">
                            {[
                                {
                                    icon: <FaStore className="text-blue-500 dark:text-blue-400 text-xl" />,
                                    title: "Easy Setup",
                                    text: "Get your store running in minutes with our simple onboarding"
                                },
                                {
                                    icon: <FaChartLine className="text-blue-500 dark:text-blue-400 text-xl" />,
                                    title: "Growing Marketplace",
                                    text: "Access millions of active buyers on our platform"
                                },
                                {
                                    icon: <FaWallet className="text-blue-500 dark:text-blue-400 text-xl" />,
                                    title: "Competitive Fees",
                                    text: "Low commission rates with no hidden charges"
                                },
                                {
                                    icon: <FaShieldAlt className="text-blue-500 dark:text-blue-400 text-xl" />,
                                    title: "Seller Protection",
                                    text: "Secure payments and fraud protection"
                                },
                            ].map((item, index) => (
                                <motion.div
                                    key={index}
                                    whileHover={{ scale: 1.02 }}
                                    className="flex gap-4 p-3 rounded-lg hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors"
                                >
                                    <div className="flex-shrink-0 mt-1">{item.icon}</div>
                                    <div>
                                        <h3 className="font-medium text-gray-800 dark:text-white">{item.title}</h3>
                                        <p className="text-gray-600 dark:text-gray-300 text-sm">{item.text}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Form Section */}
                    <div className="lg:w-2/3">
                        {/* Progress Steps */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            className="mb-8"
                        >
                            <div className="flex justify-between relative">
                                <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 dark:bg-gray-700 -z-10"></div>
                                {[1, 2, 3, 4].map((step) => (
                                    <div key={step} className="flex flex-col items-center">
                                        <button
                                            onClick={() => activeStep > step && setActiveStep(step)}
                                            className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-medium 
                        ${activeStep >= step ? 'bg-blue-600 dark:bg-blue-500' : 'bg-gray-400 dark:bg-gray-600'} 
                        ${activeStep > step ? 'cursor-pointer' : 'cursor-default'}`}
                                        >
                                            {activeStep > step ? <FaCheck /> : step}
                                        </button>
                                        <span className={`text-sm mt-2 ${activeStep >= step ? 'text-gray-800 dark:text-white font-medium' : 'text-gray-500 dark:text-gray-400'}`}>
                                            {['Business Info', 'Contact Details', 'Documents', 'Review'][step - 1]}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Form Content */}
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeStep}
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -50 }}
                                transition={{ duration: 0.3 }}
                                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg dark:shadow-gray-900 overflow-hidden transition-colors duration-300"
                            >
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    {/* Step 1: Business Information */}
                                    {activeStep === 1 && (
                                        <div className="p-6 sm:p-8">
                                            <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-white">Business Information</h2>
                                            <div className="space-y-5">
                                                <FormInput
                                                    name="businessName"
                                                    label="Business Name"
                                                    placeholder="Your business name"
                                                    icon={FaStore}
                                                    validation={{
                                                        minLength: {
                                                            value: 3,
                                                            message: "Business name must be at least 3 characters"
                                                        }
                                                    }}
                                                />

                                                <div>
                                                    <label className="block text-gray-700 dark:text-gray-300 mb-2">Business Type *</label>
                                                    <select
                                                        {...register("businessType", { required: "Business type is required" })}
                                                        className={`w-full px-4 py-3 rounded-lg border ${errors.businessType ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                                                            } focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800 transition bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                                                    >
                                                        <option value="">Select your business type</option>
                                                        {businessTypes.map((type, index) => (
                                                            <option key={index} value={type.toLowerCase()}>{type}</option>
                                                        ))}
                                                    </select>
                                                    {errors.businessType && (
                                                        <p className="mt-1 text-sm text-red-500 dark:text-red-400">{errors.businessType.message}</p>
                                                    )}
                                                </div>

                                                <div>
                                                    <label className="block text-gray-700 dark:text-gray-300 mb-2">Tell us about your business</label>
                                                    <textarea
                                                        {...register("businessDescription", {
                                                            minLength: {
                                                                value: 20,
                                                                message: "Description must be at least 20 characters"
                                                            }
                                                        })}
                                                        className={`w-full px-4 py-3 rounded-lg border ${errors.businessDescription ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                                                            } focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800 transition min-h-[120px] bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
                                                        placeholder="What products/services do you offer?"
                                                    ></textarea>
                                                    {errors.businessDescription && (
                                                        <p className="mt-1 text-sm text-red-500 dark:text-red-400">{errors.businessDescription.message}</p>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="mt-8 flex justify-end">
                                                <button
                                                    type="button"
                                                    onClick={nextStep}
                                                    className={`px-6 py-3 rounded-lg font-medium flex items-center gap-2 
                                        ${isStepValid ? 'bg-blue-600 dark:bg-blue-500 text-white hover:bg-blue-700 dark:hover:bg-blue-600' : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'} 
                                        transition-colors`}
                                                >
                                                    Next <FaArrowRight />
                                                </button>
                                            </div>
                                        </div>
                                    )}

                                    {/* Step 2: Contact Details */}
                                    {activeStep === 2 && (
                                        <div className="p-6 sm:p-8">
                                            <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-white">Contact Details</h2>
                                            <div className="space-y-5">
                                                <FormInput
                                                    name="email"
                                                    label="Email Address"
                                                    type="email"
                                                    placeholder="your@email.com"
                                                    icon={FaEnvelope}
                                                    validation={{
                                                        pattern: {
                                                            value: /^\S+@\S+\.\S+$/,
                                                            message: "Please enter a valid email address"
                                                        }
                                                    }}
                                                />

                                                <FormInput
                                                    name="phone"
                                                    label="Phone Number"
                                                    type="tel"
                                                    placeholder="+1 (123) 456-7890"
                                                    icon={FaPhone}
                                                    validation={{
                                                        pattern: {
                                                            value: /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/,
                                                            message: "Please enter a valid phone number"
                                                        }
                                                    }}
                                                />

                                                <FormInput
                                                    name="address"
                                                    label="Business Address"
                                                    placeholder="123 Business St, City, Country"
                                                    icon={FaMapMarkerAlt}
                                                    validation={{
                                                        minLength: {
                                                            value: 10,
                                                            message: "Address must be at least 10 characters"
                                                        }
                                                    }}
                                                />
                                            </div>

                                            <div className="mt-8 flex justify-between">
                                                <button
                                                    type="button"
                                                    onClick={prevStep}
                                                    className="px-6 py-3 rounded-lg font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                                >
                                                    Back
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={nextStep}
                                                    className={`px-6 py-3 rounded-lg font-medium flex items-center gap-2 
                                        ${isStepValid ? 'bg-blue-600 dark:bg-blue-500 text-white hover:bg-blue-700 dark:hover:bg-blue-600' : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'} 
                                        transition-colors`}
                                                >
                                                    Next <FaArrowRight />
                                                </button>
                                            </div>
                                        </div>
                                    )}

                                    {/* Step 3: Documents */}
                                    {activeStep === 3 && (
                                        <div className="p-6 sm:p-8">
                                            <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-white">Business Documents</h2>
                                            <div className="space-y-5">
                                                <FormInput
                                                    name="taxId"
                                                    label="Tax Identification Number"
                                                    placeholder="Enter your tax ID"
                                                    validation={{
                                                        pattern: {
                                                            value: /^[A-Za-z0-9-]+$/,
                                                            message: "Please enter a valid tax ID"
                                                        }
                                                    }}
                                                />

                                                <div className="flex items-start">
                                                    <input
                                                        type="checkbox"
                                                        {...register("acceptedTerms", {
                                                            required: "You must accept the terms to continue"
                                                        })}
                                                        id="termsCheckbox"
                                                        className="mt-1 mr-3 text-blue-600 dark:text-blue-500 bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:ring-blue-500 dark:focus:ring-blue-600"
                                                    />
                                                    <label htmlFor="termsCheckbox" className="text-gray-700 dark:text-gray-300">
                                                        I agree to the <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline">Terms of Service</a> and <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline">Seller Agreement</a> *
                                                    </label>
                                                </div>
                                                {errors.acceptedTerms && (
                                                    <p className="text-sm text-red-500 dark:text-red-400">{errors.acceptedTerms.message}</p>
                                                )}
                                            </div>

                                            <div className="mt-8 flex justify-between">
                                                <button
                                                    type="button"
                                                    onClick={prevStep}
                                                    className="px-6 py-3 rounded-lg font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                                >
                                                    Back
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={nextStep}
                                                    className={`px-6 py-3 rounded-lg font-medium flex items-center gap-2 
                                        ${isStepValid ? 'bg-blue-600 dark:bg-blue-500 text-white hover:bg-blue-700 dark:hover:bg-blue-600' : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed'} 
                                        transition-colors`}
                                                >
                                                    Next <FaArrowRight />
                                                </button>
                                            </div>
                                        </div>
                                    )}

                                    {/* Step 4: Review */}
                                    {activeStep === 4 && (
                                        <div className="p-6 sm:p-8">
                                            <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-white">Review Your Information</h2>

                                            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 mb-6">
                                                <h3 className="font-medium text-lg mb-4 text-gray-800 dark:text-white">Business Information</h3>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                                    <div>
                                                        <p className="text-gray-500 dark:text-gray-400 text-sm">Business Name</p>
                                                        <p className="font-medium dark:text-white">{watch('businessName')}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-gray-500 dark:text-gray-400 text-sm">Business Type</p>
                                                        <p className="font-medium dark:text-white">{watch('businessType')}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-gray-500 dark:text-gray-400 text-sm">Business Description</p>
                                                        <p className="font-medium dark:text-white">{watch('businessDescription')}</p>
                                                    </div>
                                                </div>

                                                <h3 className="font-medium text-lg mb-4 text-gray-800 dark:text-white">Contact Details</h3>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                                    <div>
                                                        <p className="text-gray-500 dark:text-gray-400 text-sm">Email</p>
                                                        <p className="font-medium dark:text-white">{watch('email')}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-gray-500 dark:text-gray-400 text-sm">Phone</p>
                                                        <p className="font-medium dark:text-white">{watch('phone')}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-gray-500 dark:text-gray-400 text-sm">Address</p>
                                                        <p className="font-medium dark:text-white">{watch('address')}</p>
                                                    </div>
                                                </div>

                                                <h3 className="font-medium text-lg mb-4 text-gray-800 dark:text-white">Documents</h3>
                                                <div>
                                                    <p className="text-gray-500 dark:text-gray-400 text-sm">Tax ID</p>
                                                    <p className="font-medium dark:text-white">{watch('taxId')}</p>
                                                </div>
                                            </div>

                                            <div className="mt-8 flex justify-between">
                                                <button
                                                    type="button"
                                                    onClick={prevStep}
                                                    className="px-6 py-3 rounded-lg font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                                >
                                                    Back
                                                </button>
                                                <button
                                                    type="submit"
                                                    disabled={isSubmitting}
                                                    className={`px-6 py-3 rounded-lg font-medium flex items-center gap-2 
                                        ${isSubmitting ? 'bg-green-500' : 'bg-green-600 dark:bg-green-500'} text-white hover:bg-green-700 dark:hover:bg-green-600 transition-colors`}
                                                >
                                                    {isSubmitting ? (
                                                        <>
                                                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                            </svg>
                                                            Processing...
                                                        </>
                                                    ) : (
                                                        <>
                                                            Submit Application <FaCheck />
                                                        </>
                                                    )}
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </form>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default BecomeSellerPage;