import React, { useState, useEffect } from "react";
import { studentSchema } from "../../../../lib/validation";
import { z } from "zod";

const years = ["First Year", "Second Year", "Third Year", "Fourth Year"];

export default function StudentForm({ index, formData, onChange }) {
  const [isHosteller, setIsHosteller] = useState(
    formData?.accommodation === "hosteller"
  );
  const [hasDisabilities, setHasDisabilities] = useState(
    formData?.hasDisabilities || false
  );
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setIsHosteller(formData?.accommodation === "hosteller");
  }, [formData?.accommodation]);

  const validateField = (name, value) => {
    try {
      studentSchema.shape[name].parse(value);
      setErrors((prev) => ({ ...prev, [name]: "" }));
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errorMessage = error.errors[0]?.message || "Invalid input";
        setErrors((prev) => ({ ...prev, [name]: errorMessage }));
      }
      return false;
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    validateField(name, newValue);

    const newData = {
      ...formData,
      [name]: newValue,
    };

    if (name === "accommodation") {
      const isHostellerValue = value === "hosteller";
      setIsHosteller(isHostellerValue);
      if (!isHostellerValue) {
        delete newData.hostelName;
        delete newData.roomNo;
        delete newData.wardenName;
      }
    }

    if (name === "hasDisabilities") {
      setHasDisabilities(checked);
      if (!checked) {
        delete newData.disabilityDetails;
      }
    }

    onChange(newData);
  };

  const renderError = (field) => {
    return errors[field] ? (
      <p className="mt-1 text-sm text-red-600">{errors[field]}</p>
    ) : null;
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          { label: "Name", name: "name", type: "text" },
          { label: "Register Number", name: "registerNumber", type: "text" },
          { label: "Phone Number", name: "phoneNumber", type: "tel" },
          { label: "Department", name: "department", type: "text" },
          { label: "Email", name: "email", type: "email" },
        ].map(({ label, name, type }) => (
          <div key={name}>
            <label className="block text-sm font-medium text-gray-700">
              {label}
            </label>
            <input
              type={type}
              name={name}
              className={`mt-1 block w-full rounded-md border ${
                errors[name] ? "border-red-300" : "border-gray-300"
              } bg-white px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500`}
              onChange={handleChange}
              value={formData?.[name] || ""}
              onBlur={(e) => validateField(name, e.target.value)}
            />
            {renderError(name)}
          </div>
        ))}

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Year
          </label>
          <select
            name="year"
            className="mt-1 block w-full rounded-md border bg-white px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            onChange={handleChange}
            value={formData?.year || ""}
            onBlur={(e) => validateField("year", e.target.value)}
          >
            <option value="">Select Year</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
          {renderError("year")}
        </div>
      </div>

      <div className="space-y-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Accommodation
        </label>
        {[
          { label: "Hosteller", value: "hosteller" },
          { label: "Day Scholar", value: "dayScholar" },
        ].map(({ label, value }) => (
          <label key={value} className="inline-flex items-center mr-4">
            <input
              type="radio"
              name={`accommodation-${index}`} // Ensures independent selection per form
              value={value}
              checked={formData?.accommodation === value}
              onChange={(e) =>
                handleChange({
                  target: { name: "accommodation", value: e.target.value },
                })
              }
              className="text-blue-600 focus:ring-blue-500"
            />
            <span className="ml-2">{label}</span>
          </label>
        ))}
        {renderError("accommodation")}
      </div>

      {isHosteller && (
        <div className="space-y-4 animate-slideDown">
          {[
            { label: "Hostel Name", name: "hostelName" },
            { label: "Room Number", name: "roomNo" },
            { label: "Warden Name", name: "wardenName" },
          ].map(({ label, name }) => (
            <div key={name}>
              <label className="block text-sm font-medium text-gray-700">
                {label}
              </label>
              <input
                type="text"
                name={name}
                className="mt-1 block w-full rounded-md border bg-white px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                onChange={handleChange}
                value={formData?.[name] || ""}
                onBlur={(e) => validateField(name, e.target.value)}
              />
              {renderError(name)}
            </div>
          ))}
        </div>
      )}

      <label className="inline-flex items-center">
        <input
          type="checkbox"
          name="hasDisabilities"
          checked={hasDisabilities}
          onChange={handleChange}
          className="text-blue-600 focus:ring-blue-500"
        />
        <span className="ml-2">Has Disabilities</span>
      </label>

      {hasDisabilities && (
        <div className="animate-slideDown">
          <label className="block text-sm font-medium text-gray-700">
            Disability Details
          </label>
          <input
            type="text"
            name="disabilityDetails"
            className="mt-1 block w-full rounded-md border bg-white px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            onChange={handleChange}
            value={formData?.disabilityDetails || ""}
          />
          {renderError("disabilityDetails")}
        </div>
      )}
    </div>
  );
}
