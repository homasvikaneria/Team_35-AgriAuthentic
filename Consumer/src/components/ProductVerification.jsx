import React from 'react';
import { QrCode } from 'lucide-react';
import NavbarMarket from '../Pages/Header/NavbarMarket';

export default function ProductVerification() {
  return (
    <>
    <NavbarMarket/>
    <div className="max-w-2xl mx-auto mt-15">
      <div className="bg-white rounded-lg border p-6">
        <h2 className="text-xl font-semibold">Product Verification</h2>
        <p className="text-gray-600 mt-1">Scan QR code or NFC tag to verify product authenticity</p>

        <div className="mt-8 border-2 border-dashed rounded-lg p-8">
          <div className="flex flex-col items-center justify-center text-gray-500">
            <QrCode size={80} strokeWidth={1} />
            <p className="mt-4 text-center">
              Scan a QR code on your product to verify its authenticity and view detailed information
            </p>
          </div>
        </div>

        <button className="mt-6 w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700">
          Open Scanner
        </button>
      </div>
    </div>
    </>
  );
}