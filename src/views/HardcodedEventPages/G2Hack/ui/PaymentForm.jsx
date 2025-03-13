"use client";

import { useState } from "react";
import { QrCode, Upload, CreditCard } from "lucide-react";
import { paymentSchema } from "../../../../lib/validation";
import { z } from "zod";
import upiQrCode from "./upiQrCode.jpeg";

export default function PaymentForm({ formData, onChange }) {
  const [errors, setErrors] = useState({});

  const validateField = (name, value) => {
    try {
      paymentSchema.shape[name].parse(value);
      setErrors((prev) => ({ ...prev, [name]: "" })); // Clear the error if valid
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errorMessage = error.errors[0]?.message || "Invalid input"; // Extract just the message
        setErrors((prev) => ({ ...prev, [name]: errorMessage }));
      }
      return false;
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    validateField(name, value);
    onChange({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      validateField("paymentProof", file);
      onChange({ ...formData, paymentProof: file });
    }
  };

  const renderError = (field) => {
    return errors[field] ? (
      <p className="mt-1 text-sm text-red-600">{errors[field]}</p>
    ) : null;
  };

  return (
    <div className="space-y-6">
      <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
        <div className="flex items-center space-x-4">
          <QrCode className="w-8 h-8 text-blue-600" />
          <div>
            <h3 className="font-medium text-gray-900">Payment Instructions</h3>
            <p className="text-sm text-gray-600">
              Scan the QR code or use the UPI ID below to make the payment
            </p>
          </div>
        </div>

        <div className="mt-4 flex justify-center">
          <img
            src={upiQrCode}
            alt="QR Code"
            className="w-48 h-48 object-cover rounded-lg shadow-sm"
          />
        </div>

        {/* Add this payment information box */}
        <div className="mt-6 bg-blue-50 p-4 rounded-lg border border-blue-200">
          <h3 className="font-medium text-blue-800 flex items-center">
            <CreditCard className="w-5 h-5 mr-2" />
            Payment Information
          </h3>
          <div className="mt-2 flex justify-between items-center">
            <div>
              <p className="text-sm text-blue-700">
                Registration Fee per Member
              </p>
              <p className="text-sm text-blue-700">Total Team Members</p>
              <p className="font-medium text-blue-900 mt-2">Total Amount</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-blue-700">₹300</p>
              <p className="text-sm text-blue-700">{window.teamSize || 0}</p>
              <p className="font-medium text-blue-900 mt-2">
                ₹{(window.teamSize || 0) * 300}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            UPI ID
          </label>
          <input
            type="text"
            name="upiId"
            className={`mt-1 block w-full rounded-md border ${
              errors.upiId ? "border-red-300" : "border-gray-300"
            } bg-white px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500`}
            placeholder="yourUpiId@upi"
            onChange={handleChange}
            value={formData?.upiId || ""}
            onBlur={(e) => validateField("upiId", e.target.value)}
          />
          {renderError("upiId")}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Transaction ID
          </label>
          <input
            type="text"
            name="transactionId"
            className={`mt-1 block w-full rounded-md border ${
              errors.transactionId ? "border-red-300" : "border-gray-300"
            } bg-white px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500`}
            placeholder="Enter transaction ID"
            onChange={handleChange}
            value={formData?.transactionId || ""}
            onBlur={(e) => validateField("transactionId", e.target.value)}
          />
          {renderError("transactionId")}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Payment Proof Screenshot
          </label>
          <div
            className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 ${
              errors.paymentProof ? "border-red-300" : "border-gray-300"
            } border-dashed rounded-lg hover:border-gray-400 transition-colors duration-300`}
          >
            <div className="space-y-1 text-center">
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <div className="flex text-sm text-gray-600">
                <label
                  htmlFor="file-upload"
                  className="relative cursor-pointer rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                >
                  <span>Upload a file</span>
                  <input
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    className="sr-only"
                    onChange={handleFileChange}
                    accept="image/png,image/jpeg,application/pdf"
                  />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-500">PNG, JPG, PDF up to 10MB</p>
            </div>
          </div>
          {formData?.paymentProof && (
            <p className="mt-2 text-sm text-gray-600">
              Selected file: {formData.paymentProof.name}
            </p>
          )}
          {renderError("paymentProof")}
        </div>
      </div>
    </div>
  );
}
