// Team_35-AgriAuthentic/Verification/vite-project/src/Components/QrScanner.jsx
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Html5QrcodeScanner } from "html5-qrcode";
import { Camera } from "lucide-react";

function QrScanner() {
    const [scanResult, setScanResult] = useState(null);
    const [isScanning, setIsScanning] = useState(false);
    const scannerRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (isScanning && !scannerRef.current) {
            scannerRef.current = new Html5QrcodeScanner("reader", {
                qrbox: { width: 150, height: 200 }, fps: 5
            });

            scannerRef.current.render(success, error)
        }
        function success(result) {
            scannerRef.current.clear();
            setScanResult(result)
            setIsScanning(false)

            window.location.href = result.startsWith("http") ? result : `http://${result}`;

        }
        function error(err) {
            console.warn("Qr error", err);
        }
        return () => {
            if (scannerRef.current) {
                scannerRef.current.clear();
                scannerRef.current = null;
            }
        }
    }, [isScanning]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-green-50 pb-7 -mt-5 ">
            <div className="text-center pt-10">
                <h1 className="text-3xl font-bold text-green-700  mb-5">Organic Product Verification</h1>
                <p className="text-gray-600 text-l -mt-3">Verify the authenticity of your organic products and trace their journey from farm to table.</p>
            </div>

            <div className="bg-white shadow-lg rounded-2xl p-6 max-w-xl w-full text-center mt-7">
                <h2 className="text-xl font-semibold text-gray-700">Scan Product Qr Code</h2>

                <div className="mt-3">
                    {!isScanning ? (
                        <div className="w-64 h-64 mx-auto flex items-center justify-center border-2 border-dashed border-green-500 rounded-lg bg-gray-100">
                            <Camera className="w-16 h-16 text-green-600" />
                        </div>
                    ) : (
                        <div className="relative w-64 h-64 mx-auto border-2 border-green-500 rounded-lg overflow-hidden">
                            <div id="reader" className="w-full h-full"></div>
                        </div>
                    )}

                    <div className="mt-4">
                        {!isScanning ? (
                            <button
                                className="bg-green-600 text-white px-6 py-1 rounded-lg hover:bg-green-700 transition w-65 h-10"
                                onClick={() => setIsScanning(true)}
                            >
                                Scan QR Code
                            </button>
                        ) : (
                            <button
                                className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition w-65 h-10"
                                onClick={() => {
                                    scannerRef.current?.clear();
                                    setIsScanning(false);
                                }}
                            >
                                Cancel
                            </button>
                        )}
                    </div>

                </div>

            </div>
        </div>
    );
}

export default QrScanner;

