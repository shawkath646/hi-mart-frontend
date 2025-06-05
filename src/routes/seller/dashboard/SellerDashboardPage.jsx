import React from 'react';
import { motion } from 'framer-motion';
import { Menu, MenuItems, MenuItem, Transition } from '@headlessui/react';
import {
    FiDollarSign, FiPackage, FiUsers,
    FiShoppingCart, FiChevronDown, FiPlus,
    FiEdit, FiList
} from 'react-icons/fi';
import { FaBoxOpen } from 'react-icons/fa';
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const SellerDashboardPage = () => {

    const stats = [
        { title: "Total Revenue", value: "$12,345", change: "+12%", icon: <FiDollarSign size={24} />, color: "bg-green-100 text-green-600" },
        { title: "Total Orders", value: "189", change: "+5%", icon: <FiShoppingCart size={24} />, color: "bg-blue-100 text-blue-600" },
        { title: "Products", value: "42", change: "+3", icon: <FiPackage size={24} />, color: "bg-purple-100 text-purple-600" },
        { title: "Customers", value: "1,234", change: "+8%", icon: <FiUsers size={24} />, color: "bg-yellow-100 text-yellow-600" }
    ];

    const recentOrders = [
        { id: "#ORD-001", customer: "John Doe", date: "2023-06-15", amount: "$125.99", status: "shipped" },
        { id: "#ORD-002", customer: "Jane Smith", date: "2023-06-14", amount: "$89.50", status: "processing" },
        { id: "#ORD-003", customer: "Robert Johnson", date: "2023-06-14", amount: "$234.00", status: "delivered" },
        { id: "#ORD-004", customer: "Emily Davis", date: "2023-06-13", amount: "$56.75", status: "shipped" },
        { id: "#ORD-005", customer: "Michael Wilson", date: "2023-06-12", amount: "$189.99", status: "delivered" }
    ];

    const topProducts = [
        { name: "Wireless Headphones", sales: 124, revenue: "$2,480" },
        { name: "Smart Watch", sales: 98, revenue: "$1,960" },
        { name: "Bluetooth Speaker", sales: 87, revenue: "$1,305" },
        { name: "Phone Case", sales: 156, revenue: "$780" },
        { name: "USB-C Cable", sales: 203, revenue: "$609" }
    ];

    const chartData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
            {
                label: 'Sales',
                data: [4500, 5200, 4800, 6100, 7300, 8200],
                backgroundColor: 'rgba(59, 130, 246, 0.7)',
                borderRadius: 4
            }
        ]
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    callback: function (value) {
                        return '$' + value.toLocaleString();
                    }
                }
            }
        }
    };

    const getStatusBadge = (status) => {
        const classes = {
            shipped: "bg-blue-100 text-blue-800",
            processing: "bg-yellow-100 text-yellow-800",
            delivered: "bg-green-100 text-green-800"
        };
        return (
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${classes[status]}`}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
        );
    };

    return (
        <main className="min-h-screen bg-gray-50 p-4 lg:p-6 mt-[65px]">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6"
            >
                {stats.map((stat, index) => (
                    <motion.div
                        key={index}
                        whileHover={{ y: -5 }}
                        className="bg-white p-4 rounded-lg shadow-sm"
                    >
                        <div className="flex justify-between">
                            <div>
                                <p className="text-sm text-gray-500">{stat.title}</p>
                                <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
                                <p className="text-sm text-green-600 mt-1">{stat.change}</p>
                            </div>
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${stat.color}`}>
                                {stat.icon}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </motion.div>

            {/* Charts and Tables */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="lg:col-span-2 bg-white p-4 rounded-lg shadow-sm"
                >
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-semibold">Sales Overview</h2>
                        <Menu as="div" className="relative">
                            <Menu.Button className="text-sm border border-gray-300 rounded px-2 py-1 flex items-center">
                                Last 7 days
                                <FiChevronDown className="ml-1" />
                            </Menu.Button>
                            <Transition
                                as={React.Fragment}
                                enter="transition ease-out duration-100"
                                enterFrom="transform opacity-0 scale-95"
                                enterTo="transform opacity-100 scale-100"
                                leave="transition ease-in duration-75"
                                leaveFrom="transform opacity-100 scale-100"
                                leaveTo="transform opacity-0 scale-95"
                            >
                                <MenuItems className="absolute right-0 mt-2 w-40 origin-top-right bg-white rounded-md shadow-lg py-1 z-50 focus:outline-none">
                                    <MenuItem>
                                        {({ focus }) => (
                                            <button
                                                className={`block w-full text-left px-4 py-2 text-sm ${focus ? 'bg-gray-100' : ''}`}
                                            >
                                                Last 7 days
                                            </button>
                                        )}
                                    </MenuItem>
                                    <MenuItem>
                                        {({ focus }) => (
                                            <button
                                                className={`block w-full text-left px-4 py-2 text-sm ${focus ? 'bg-gray-100' : ''}`}
                                            >
                                                Last 30 days
                                            </button>
                                        )}
                                    </MenuItem>
                                    <MenuItem>
                                        {({ focus }) => (
                                            <button
                                                className={`block w-full text-left px-4 py-2 text-sm ${focus ? 'bg-gray-100' : ''}`}
                                            >
                                                Last 90 days
                                            </button>
                                        )}
                                    </MenuItem>
                                </MenuItems>
                            </Transition>
                        </Menu>
                    </div>
                    <div className="h-64">
                        <Bar data={chartData} options={chartOptions} />
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="bg-white p-4 rounded-lg shadow-sm"
                >
                    <h2 className="text-lg font-semibold mb-4">Top Products</h2>
                    <div className="space-y-4">
                        {topProducts.map((product, index) => (
                            <div key={index} className="flex justify-between items-center">
                                <div className="flex items-center">
                                    <div className="w-8 h-8 rounded bg-blue-100 flex items-center justify-center text-blue-600 mr-3">
                                        <FaBoxOpen aria-hidden size={14} />
                                    </div>
                                    <span className="text-sm font-medium">{product.name}</span>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-medium">{product.sales} sales</p>
                                    <p className="text-xs text-gray-500">{product.revenue}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-xl shadow-sm overflow-hidden mb-6"
            >
                <div className="p-6">
                    <div className="flex items-center mb-4">
                        <div className="p-3 rounded-lg bg-blue-100 text-blue-600 mr-4">
                            <FiPackage size={24} />
                        </div>
                        <h2 className="text-xl font-bold text-gray-800">Product Management</h2>
                    </div>
                    <p className="text-gray-600 mb-6">
                        Manage your product catalog, inventory, and listings in one place.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                        {[
                            {
                                icon: <FiPlus size={20} className="text-blue-600" />,
                                title: "Add New Product",
                                href: "/seller/add-product",
                                description: "Create new product listings"
                            },
                            {
                                icon: <FiEdit size={20} className="text-purple-600" />,
                                title: "Edit Products",
                                href: "/seller/edit-product",
                                description: "Update existing product details"
                            },
                            {
                                icon: <FiList size={20} className="text-green-600" />,
                                title: "Inventory",
                                href: "/seller/inventory",
                                description: "Manage stock levels"
                            }
                        ].map((feature, index) => (
                            <motion.a
                                key={index}
                                href={feature.href}
                                whileHover={{ y: -5 }}
                                className="p-4 border border-gray-200 rounded-lg hover:border-blue-200 hover:bg-blue-50 transition-colors cursor-pointer"
                            >
                                <div className="flex items-center mb-3">
                                    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center mr-3">
                                        {feature.icon}
                                    </div>
                                    <h3 className="font-medium text-gray-800">{feature.title}</h3>
                                </div>
                                <p className="text-sm text-gray-600">{feature.description}</p>
                            </motion.a>
                        ))}
                    </div>
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="bg-white p-4 rounded-lg shadow-sm"
            >
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">Recent Orders</h2>
                    <button className="text-sm text-blue-600 hover:text-blue-800">View All</button>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead>
                            <tr>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {recentOrders.map((order, index) => (
                                <motion.tr
                                    key={index}
                                    whileHover={{ backgroundColor: "rgba(249, 250, 251, 1)" }}
                                    className="hover:bg-gray-50"
                                >
                                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{order.id}</td>
                                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{order.customer}</td>
                                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{order.date}</td>
                                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{order.amount}</td>
                                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                                        {getStatusBadge(order.status)}
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </motion.div>
        </main>
    );
};

export default SellerDashboardPage;