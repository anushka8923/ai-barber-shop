"use client";

import { useRouter } from "next/navigation";
import { BuildingOffice2Icon, ScissorsIcon, ClockIcon, PlusCircleIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import LogoutButton from "../../../components/LogoutButton";

const AdminPage = () => {
  const router = useRouter();

  const handleNavigation = (path) => {
    router.push(path);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl">
        {/* Header Section */}
        <div className="bg-indigo-600 p-6 pl-20 sm:pl-6 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <BuildingOffice2Icon className="h-12 w-12 text-white" />
            <div>
              <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
              <p className="text-indigo-100">Manage your barbershop operations</p>
            </div>
          </div>
          <LogoutButton />
        </div>

        {/* Main Content */}
        <div className="p-8 space-y-6">
          {/* Action Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Service Add Card */}
            <div 
              onClick={() => handleNavigation("/admin/create-services")}
              className="group cursor-pointer bg-white rounded-lg border border-gray-200 p-6 hover:border-indigo-500 hover:bg-indigo-50 transition-all duration-200"
            >
              <div className="flex items-center space-x-4">
                <div className="bg-indigo-100 p-3 rounded-lg">
                  <ScissorsIcon className="h-8 w-8 text-indigo-600 group-hover:text-indigo-700" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">Add Service</h3>
                  <p className="text-sm text-gray-500">Create new barber services</p>
                </div>
              </div>
            </div>

            {/* Create Barber Card */}
            <div 
              onClick={() => handleNavigation("/admin/CreateBarber")}
              className="group cursor-pointer bg-white rounded-lg border border-gray-200 p-6 hover:border-green-500 hover:bg-green-50 transition-all duration-200"
            >
              <div className="flex items-center space-x-4">
                <div className="bg-green-100 p-3 rounded-lg">
                  <UserCircleIcon className="h-8 w-8 text-green-600 group-hover:text-green-700" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">Manage Barbers</h3>
                  <p className="text-sm text-gray-500">Add/update barber profiles</p>
                </div>
              </div>
            </div>

            {/* Create Slot Card */}
            <div 
              onClick={() => handleNavigation("/admin/createSlot")}
              className="group cursor-pointer bg-white rounded-lg border border-gray-200 p-6 hover:border-blue-500 hover:bg-blue-50 transition-all duration-200"
            >
              <div className="flex items-center space-x-4">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <ClockIcon className="h-8 w-8 text-blue-600 group-hover:text-blue-700" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">Time Slots</h3>
                  <p className="text-sm text-gray-500">Manage appointment availability</p>
                </div>
              </div>
            </div>

            {/* Service Form Card */}
            <div 
              onClick={() => handleNavigation("/admin/createAndDeleteServices")}
              className="group cursor-pointer bg-white rounded-lg border border-gray-200 p-6 hover:border-red-500 hover:bg-red-50 transition-all duration-200"
            >
              <div className="flex items-center space-x-4">
                <div className="bg-red-100 p-3 rounded-lg">
                  <PlusCircleIcon className="h-8 w-8 text-red-600 group-hover:text-red-700" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">Add AND Delete Service</h3>
                  <p className="text-sm text-gray-500">Customize service templates</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats Footer */}
          <div className="bg-gray-50 p-4 rounded-lg flex items-center justify-between">
            <div className="text-center">
              <p className="text-sm text-gray-500">Active Services</p>
              <p className="text-2xl font-bold text-gray-800">24</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-500">Total Barbers</p>
              <p className="text-2xl font-bold text-gray-800">8</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-500">Appointments</p>
              <p className="text-2xl font-bold text-gray-800">142</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;