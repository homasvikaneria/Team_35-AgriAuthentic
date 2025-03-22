// Team_35-AgriAuthentic/Verification/vite-project/src/Components/MainCompo.jsx
import { CheckCircle, MapPin, Calendar,Tractor,Award } from "lucide-react";

const MainCompo = () => {
    return (
            <div className=" top-0 left-0 w-full    text-center pt-10  -mt-5">
                <h1 className="text-3xl font-bold text-green-700 mb-5">Organic Product Verification</h1>
                <p className="text-gray-600 text-l -mt-4">
                    Verify the authenticity of your organic products and trace their journey from farm to table.
                </p>

                <div className="bg-white shadow-lg rounded-lg p-6 mt-6 w-[65%] h-[230px] mx-auto border-1 border-green-500">
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl font-semibold">Organic Red Quinoa</h2>
                        <span className="bg-green-600 text-white px-3 py-1 rounded-full flex items-center text-sm">
                            <CheckCircle className="w-4 h-4 mr-1" /> Verified Organic
                        </span>
                    </div>
                    <p className="text-gray-600 mt-1 items-start text-left space-y-4 text-sm">ID: ORG-12345-ABCDE</p>
                    <div className="grid grid-cols-4 gap-5 mt-4 items-start text-left space-y-4">
                        <div className="bg-gray-100 p-3 rounded-md">
                            <p className="text-gray-500 text-sm">Batch Number</p>
                            <p className="font-semibold text-md">BATCH-2025-03-001</p>
                        </div>
                        <div className="bg-gray-100 p-3 rounded-md">
                            <p className="text-gray-500 text-sm">Harvest Date</p>
                            <p className="font-semibold text-md">2025-02-10</p>
                        </div>
                        <div className="bg-gray-100 p-3 rounded-md">
                            <p className="text-gray-500 text-sm">Packaging Date</p>
                            <p className="font-semibold text-md">2025-02-15</p>
                        </div>
                        <div className="bg-gray-100 p-3 rounded-md">
                            <p className="text-gray-500 text-sm">Expiry Date</p>
                            <p className="font-semibold text-md">2026-02-15</p>
                        </div>
                    </div>
                    <div className="flex flex-wrap items-center text-gray-700 space-x-6 mt-1">
                        <div className="flex items-center">
                            <Tractor className="w-5 h-5 text-green-700" />
                            <p className=" text-sm ml-2">Sunrise Organic Farm</p>
                        </div>
                        <div className="flex items-center">
                            <MapPin className="w-5 h-5 text-green-600" />
                            <p className=" text-sm ml-2">Himachal Pradesh, India</p>
                        </div>
                        <div className="flex items-center">
                            <Award className="w-5 h-5 text-green-600" />
                            <p className=" text-sm ml-2">Level 3 Certified</p>
                        </div>
                        <div className="flex items-center">
                            <Calendar className="w-5 h-5 text-green-600" />
                            <p className=" text-sm ml-2">Verified on 2025-03-15</p>
                        </div>
                    </div>

                </div>
        </div>
    );
};

export default MainCompo;


