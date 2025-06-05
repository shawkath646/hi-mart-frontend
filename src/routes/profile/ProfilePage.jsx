import { useState } from 'react';
import { Helmet } from '@dr.pogodin/react-helmet';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { useAuth } from '@/contexts/useAuth';
import { FaUser, FaEnvelope, FaPhone, FaBirthdayCake, FaMapMarkerAlt, FaEdit, FaSave, FaTimes, FaEye, FaEyeSlash, FaGoogle } from 'react-icons/fa';



const ProfilePage = () => {
  const [editMode, setEditMode] = useState(false);

  const { session } = useAuth();

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    defaultValues: {
      firstName: session.user.firstName,
      lastName: session.user.lastName,
      email: session.user.email,
      phoneNumber: session.user.phoneNumber,
      dateOfBirth: session.user.dateOfBirth,
      street: session.user.addresses[0].street,
      city: session.user.addresses[0].city,
      state: session.user.addresses[0].state,
      postalCode: session.user.addresses[0].postalCode,
      country: session.user.addresses[0].country
    }
  });

  const onSubmit = (data) => {
    console.log('Updated data:', data);
    // Here you would typically send the data to your backend
    setEditMode(false);
  };

  const toggleEditMode = () => {
    if (editMode) {
      reset();
    }
    setEditMode(!editMode);
  };

  const formatJoinDate = (timestamp) => {
    const date = new Date(timestamp._seconds * 1000);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <>
      <Helmet>
        <title>Profile | HiMart</title>
      </Helmet>
      <main className="min-h-screen bg-gray-100 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8 transition-colors duration-300 pt-18">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
          >
            {/* Profile Header */}
            <div className="bg-blue-600 dark:bg-blue-700 p-6 text-white">
              <div className="flex flex-col sm:flex-row items-center justify-between">
                <div className="flex items-center space-x-4 mb-4 sm:mb-0">
                  <div className="relative">
                    <img
                      src={session.user.picture}
                      alt="Profile"
                      className="w-20 h-20 rounded-full border-4 border-white dark:border-gray-300"
                    />
                    {session.user.googleId && (
                      <div className="absolute -bottom-2 -right-2 bg-white dark:bg-gray-700 p-1 rounded-full">
                        <FaGoogle aria-hidden className="text-red-500" />
                      </div>
                    )}
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold">
                      {session.user.firstName} {session.user.lastName}
                    </h1>
                    <p className="text-blue-100 dark:text-blue-200">
                      {session.user.isSeller ? 'Seller' : 'Buyer'} • Joined {formatJoinDate(session.user.joinedOn)}
                    </p>
                  </div>
                </div>
                <button
                  onClick={toggleEditMode}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${editMode ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'} transition-colors duration-300`}
                >
                  {editMode ? (
                    <>
                      <FaTimes aria-hidden /> <span>Cancel</span>
                    </>
                  ) : (
                    <>
                      <FaEdit aria-hidden /> <span>Edit Profile</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Profile Content */}
            <div className="p-6">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Personal Information */}
                  <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
                    <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
                      Personal Information
                    </h2>

                    {editMode ? (
                      <>
                        <FormInput
                          id="firstName"
                          label="First Name"
                          type="text"
                          placeholder="First Name"
                          icon={FaUser}
                          registerOptions={{ required: "First name is required" }}
                          errors={errors}
                        />
                        <FormInput
                          id="lastName"
                          label="Last Name"
                          type="text"
                          placeholder="Last Name"
                          icon={FaUser}
                          registerOptions={{ required: "Last name is required" }}
                          errors={errors}
                        />
                        <FormInput
                          id="dateOfBirth"
                          label="Date of Birth"
                          type="date"
                          placeholder="Date of Birth"
                          icon={FaBirthdayCake}
                          registerOptions={{ required: "Date of birth is required" }}
                          errors={errors}
                        />
                      </>
                    ) : (
                      <>
                        <ProfileField label="First Name" value={session.user.firstName} icon={FaUser} />
                        <ProfileField label="Last Name" value={session.user.lastName} icon={FaUser} />
                        <ProfileField label="Date of Birth" value={new Date(session.user.dateOfBirth).toLocaleDateString()} icon={FaBirthdayCake} />
                      </>
                    )}
                  </div>

                  {/* Contact Information */}
                  <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
                    <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
                      Contact Information
                    </h2>

                    {editMode ? (
                      <>
                        <FormInput
                          id="email"
                          label="Email"
                          type="email"
                          placeholder="Email"
                          icon={FaEnvelope}
                          registerOptions={{
                            required: "Email is required",
                            pattern: {
                              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                              message: "Invalid email address"
                            }
                          }}
                          errors={errors}
                        />
                        <div className="flex items-center mb-2">
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            Email {session.user.emailVerified ? 'verified' : 'not verified'}
                          </span>
                          {!session.user.emailVerified && (
                            <button className="ml-2 text-sm text-blue-600 dark:text-blue-400 hover:underline">
                              Verify now
                            </button>
                          )}
                        </div>
                        <FormInput
                          id="phoneNumber"
                          label="Phone Number"
                          type="tel"
                          placeholder="Phone Number"
                          icon={FaPhone}
                          registerOptions={{
                            required: "Phone number is required",
                            pattern: {
                              value: /^[0-9]{10,15}$/,
                              message: "Invalid phone number"
                            }
                          }}
                          errors={errors}
                        />
                      </>
                    ) : (
                      <>
                        <ProfileField label="Email" value={session.user.email} icon={FaEnvelope} />
                        <div className="flex items-center mb-4">
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            Email {session.user.emailVerified ? 'verified' : 'not verified'}
                          </span>
                          {!session.user.emailVerified && (
                            <button className="ml-2 text-sm text-blue-600 dark:text-blue-400 hover:underline">
                              Verify now
                            </button>
                          )}
                        </div>
                        <ProfileField label="Phone Number" value={session.user.phoneNumber} icon={FaPhone} />
                      </>
                    )}
                  </div>

                  {/* Address */}
                  <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg md:col-span-2">
                    <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
                      Address
                    </h2>

                    {editMode ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormInput
                          id="street"
                          label="Street"
                          type="text"
                          placeholder="Street Address"
                          icon={FaMapMarkerAlt}
                          registerOptions={{ required: "Street address is required" }}
                          errors={errors}
                        />
                        <FormInput
                          id="city"
                          label="City"
                          type="text"
                          placeholder="City"
                          icon={FaMapMarkerAlt}
                          registerOptions={{ required: "City is required" }}
                          errors={errors}
                        />
                        <FormInput
                          id="state"
                          label="State/Province"
                          type="text"
                          placeholder="State/Province"
                          icon={FaMapMarkerAlt}
                          registerOptions={{ required: "State is required" }}
                          errors={errors}
                        />
                        <FormInput
                          id="postalCode"
                          label="Postal Code"
                          type="text"
                          placeholder="Postal Code"
                          icon={FaMapMarkerAlt}
                          registerOptions={{ required: "Postal code is required" }}
                          errors={errors}
                        />
                        <FormInput
                          id="country"
                          label="Country"
                          type="text"
                          placeholder="Country"
                          icon={FaMapMarkerAlt}
                          registerOptions={{ required: "Country is required" }}
                          errors={errors}
                        />
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <ProfileField label="Street" value={session.user.addresses[0].street} icon={FaMapMarkerAlt} />
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
                          <ProfileField label="City" value={session.user.addresses[0].city} />
                          <ProfileField label="State" value={session.user.addresses[0].state} />
                          <ProfileField label="Postal Code" value={session.user.addresses[0].postalCode} />
                          <ProfileField label="Country" value={session.user.addresses[0].country} />
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {editMode && (
                  <div className="mt-6 flex justify-end">
                    <button
                      type="submit"
                      className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors duration-300"
                    >
                      <FaSave aria-hidden /> <span>Save Changes</span>
                    </button>
                  </div>
                )}
              </form>
            </div>
          </motion.div>
        </div>
      </main>
    </>
  );
};

// Profile Field Component (for view mode)
const ProfileField = ({ label, value, icon: Icon }) => (
  <div className="mb-4">
    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-1">
      {Icon && <Icon className="mr-2" />}
      {label}
    </div>
    <div className="text-gray-800 dark:text-gray-200 font-medium">
      {value}
    </div>
  </div>
);

// Form Input Component (for edit mode)
const FormInput = ({
  id,
  label,
  type,
  placeholder,
  icon: Icon,
  registerOptions,
  errors,
  showPasswordToggle = false,
  isPasswordVisible = false,
  onTogglePassword = null
}) => {
  const { register } = useForm(); // This should come from the parent component's useForm

  return (
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
          className={`w-full ${Icon ? 'pl-10' : 'pl-3'} pr-${showPasswordToggle ? '10' : '3'} py-2 rounded-lg border ${errors[id] ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
            } focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition-colors duration-300`}
          placeholder={placeholder}
        />
        {showPasswordToggle && (
          <button
            type="button"
            onClick={onTogglePassword}
            aria-label={isPasswordVisible ? 'Hide password' : 'Show password'}
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
};

export default ProfilePage;