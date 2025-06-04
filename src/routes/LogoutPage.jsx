import { useState, useMemo, useCallback } from 'react';
import { useLocation } from 'react-router';
import { toast } from 'react-toastify';
import { useAuth } from '../libs/useAuth';
import { FiLogOut, FiUser, FiMail, FiKey } from 'react-icons/fi';

const LogoutPage = () => {
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const { session, loading, logout } = useAuth();
    const location = useLocation();

    const redirectPath = useMemo(() => {
        const queryParams = new URLSearchParams(location.search);
        return queryParams.get('redirect');
    }, [location.search]);


    const handleLogout = useCallback(async () => {
        setIsLoggingOut(true);
        try {
            await logout({ redirect: redirectPath });
        } catch (error) {
            const errorMessage = error?.response?.data?.message || error.message || "Logout failed. Please try again.";
            toast.error(errorMessage);
        } finally {
            setIsLoggingOut(false);
        }
    }, [logout, redirectPath]);

    if (loading) {
        return <FullScreenMessage message="Loading session..." />;
    }

    if (!session && !loading) {
        return <FullScreenMessage message="No session found." />;
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
            <div className="w-full max-w-md p-8 rounded-lg shadow-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-white transition-all duration-300">
                <UserSession session={session} isLoggingOut={isLoggingOut} handleLogout={handleLogout} />
            </div>
        </div>
    );
};

const FullScreenMessage = ({ message }) => (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center text-gray-600 dark:text-gray-300">{message}</div>
    </div>
);

const UserSession = ({ session, isLoggingOut, handleLogout }) => (
    <>
        <div className="flex flex-col items-center mb-6">
            <div className="w-20 h-20 rounded-full flex items-center justify-center mb-4 bg-gray-100 dark:bg-gray-700">
                <FiUser size={32} className="text-gray-500 dark:text-gray-300" />
            </div>
            <h2 className="text-2xl font-bold">
                {session.user.firstName} {session.user.lastName}
            </h2>
        </div>

        <div className="space-y-4 mb-8">
            <InfoRow icon={<FiKey />} label="User ID" value={session.user.id} />
            <InfoRow icon={<FiMail />} label="Email" value={session.user.email} />
        </div>

        <p className="mb-6 text-center">Do you want to logout?</p>

        <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className={`w-full py-3 px-4 rounded-lg flex items-center justify-center space-x-2 transition-colors ${isLoggingOut ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                } text-white`}
        >
            {isLoggingOut ? (
                <>
                    <Spinner />
                    <span>Logging out...</span>
                </>
            ) : (
                <>
                    <FiLogOut />
                    <span>Logout</span>
                </>
            )}
        </button>
    </>
);

const InfoRow = ({ icon, label, value }) => (
    <div className="flex items-center">
        <div className="mr-3 text-gray-500 dark:text-gray-400">{icon}</div>
        <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
            <p>{value}</p>
        </div>
    </div>
);

const Spinner = () => (
    <svg
        role="status"
        aria-hidden="true"
        className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
    >
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
        <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
        />
    </svg>
);

export default LogoutPage;
