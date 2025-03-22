// Team_35-AgriAuthentic/Consumer/src/components/ProductVerification.jsx
import React, { useState, useRef, useEffect } from 'react';
import { QrCode, Camera } from 'lucide-react';
import NavbarMarket from '../Pages/Header/NavbarMarket';
import { Html5QrcodeScanner } from "html5-qrcode";

export default function ProductVerification() {
  const [scanResult, setScanResult] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const scannerRef = useRef(null);

  useEffect(() => {
    if (isScanning && !scannerRef.current) {
      scannerRef.current = new Html5QrcodeScanner("reader", {
        qrbox: { width: 150, height: 200 }, fps: 5
      });
      scannerRef.current.render(success, error);
    }

    function success(result) {
      scannerRef.current.clear();
      setScanResult(result);
      setIsScanning(false);
      window.location.href = result.startsWith("http") ? result : `http://${result}`;
    }

    function error(err) {
      console.warn("QR error", err);
    }

    return () => {
      if (scannerRef.current) {
        scannerRef.current.clear();
        scannerRef.current = null;
      }
    };
  }, [isScanning]);

  return (
    <>
      <NavbarMarket />
      <div className="max-w-2xl mx-auto mt-15">
        <div className="bg-white rounded-lg border p-6">
          <h2 className="text-xl font-semibold">Product Verification</h2>
          <p className="text-gray-600 mt-1">Scan QR code or NFC tag to verify product authenticity</p>

          <div className="mt-8 border-2 border-dashed rounded-lg p-8">
            <div className="flex flex-col items-center justify-center text-gray-500">
              {!isScanning ? (
                <>
                  <QrCode size={80} strokeWidth={1} />
                  <p className="mt-4 text-center">
                    Scan a QR code on your product to verify its authenticity and view detailed information
                  </p>
                </>
              ) : (
                <div id="reader" className="w-64 h-64 border-2 border-green-500 rounded-lg"></div>
              )}
            </div>
          </div>

          <button 
            className={`mt-6 w-full py-2 px-4 rounded-lg text-white ${isScanning ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'}`}
            onClick={() => setIsScanning(prev => !prev)}
          >
            {isScanning ? 'Cancel' : 'Open Scanner'}
          </button>
        </div>
      </div>
    </>
  );
}
