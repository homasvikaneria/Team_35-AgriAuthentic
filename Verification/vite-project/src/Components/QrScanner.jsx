// Team_35-AgriAuthentic/Verification/vite-project/src/Components/QrScanner.jsx
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Html5QrcodeScanner } from "html5-qrcode";
import { Camera } from "lucide-react";

function QrScanner() {
    const [scanResult, setScanResult] = useState(null);
    const [isScanning, setIsScanning] = useState(false);
    const scannerRef = useRef(null);
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-green-50">
            <h1 className="text-3xl font-bold text-green-700">QR Code Scanner</h1>
            <h1></h1>
        </div>
    );
}

export default QrScanner;

