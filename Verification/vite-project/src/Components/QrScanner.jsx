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
            <div className="flex flex-col items-center justify-center min-h-screen bg-green-50">
                <h1 className="text-3xl font-bold text-green-700">QR Code Scanner</h1>
            </div>

            <div className="bg-white shadow-lg rounded-2xl p-6 max-w-2xl w-full text-center mt-7">
                <h2 className="text-xl font-semibold text-gray-700">Scan Product Qr Code</h2>
            </div>
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
            </div>
            
            <div>

            </div>
        </div>
    );
}

export default QrScanner;

