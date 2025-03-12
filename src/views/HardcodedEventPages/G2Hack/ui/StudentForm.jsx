"use client";

import { useState, useEffect, useRef } from "react";
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
  const [isOthers, setIsOthers] = useState(
    formData?.department === "Others" || false
  );
  const [currentErrorField, setCurrentErrorField] = useState(null);
  const customDepartmentRef = useRef(null);

  useEffect(() => {
    setIsHosteller(formData?.accommodation === "hosteller");
  }, [formData?.accommodation]);

  useEffect(() => {
    // Focus the custom department input when "Others" is selected
    if (isOthers && customDepartmentRef.current) {
      customDepartmentRef.current.focus();
    }
  }, [isOthers]);

  const validateField = (name, value) => {
    try {
      // Handle special case for hostel fields
      if (
        (name === "hostelName" || name === "roomNo" || name === "wardenName") &&
        formData?.accommodation !== "hosteller"
      ) {
        setErrors((prev) => ({ ...prev, [name]: "" }));
        return true;
      }

      // Handle special case for disability details
      if (name === "disabilityDetails" && !formData?.hasDisabilities) {
        setErrors((prev) => ({ ...prev, [name]: "" }));
        return true;
      }

      // For department, if it's a custom department, validate the actual value
      if (name === "department" && isOthers && formData?.customDepartment) {
        studentSchema.shape[name].parse(formData.customDepartment);
      } else {
        studentSchema.shape[name].parse(value);
      }

      setErrors((prev) => ({ ...prev, [name]: "" }));
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errorMessage = error.errors[0]?.message || "Invalid input";
        setErrors((prev) => ({ ...prev, [name]: errorMessage }));

        // Scroll to the error field
        // const errorElement = document.getElementById(`${name}-${index}`);

        // if (errorElement) {
        //   errorElement.scrollIntoView({ behavior: "smooth", block: "center" });
        //   errorElement.focus();
        // }
      }
      return false;
    }
  };

  const validateAllFields = () => {
    const fieldsToValidate = [
      "name",
      "registerNumber",
      "phoneNumber",
      "email",
      "department",
      "year",
      "accommodation",
    ];

    // Add conditional fields
    if (isHosteller) {
      fieldsToValidate.push("hostelName", "roomNo", "wardenName");
    }

    if (hasDisabilities) {
      fieldsToValidate.push("disabilityDetails");
    }

    let isValid = true;
    const newErrors = {};

    fieldsToValidate.forEach((field) => {
      let value = formData?.[field];

      // Special case for department with "Others"
      if (field === "department" && isOthers) {
        value = formData?.customDepartment || "";
      }

      try {
        studentSchema.shape[field].parse(value);
      } catch (error) {
        if (error instanceof z.ZodError) {
          newErrors[field] = error.errors[0]?.message || "Invalid input";
          isValid = false;
        }
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    // Special handling for department field
    if (name === "department") {
      if (value === "Others") {
        setIsOthers(true);
        const newData = {
          ...formData,
          department: "Others",
          customDepartment: "",
        };
        onChange(newData);
        return;
      } else {
        setIsOthers(false);
      }
    }

    // Special handling for custom department
    if (name === "customDepartment") {
      const newData = {
        ...formData,
        customDepartment: value,
        department: value, // Set the actual department to the custom value
      };
      onChange(newData);
      validateField("department", value);
      return;
    }

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

    validateField(name, newValue);
    onChange(newData);
  };

  const renderError = (field) => {
    return errors[field] ? (
      <p className="mt-1 text-sm text-red-600 animate-pulse">{errors[field]}</p>
    ) : null;
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          { label: "Name", name: "name", type: "text" },
          { label: "Register Number", name: "registerNumber", type: "text" },
          { label: "Phone Number", name: "phoneNumber", type: "tel" },
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
                errors[name]
                  ? "border-red-300 ring-1 ring-red-300"
                  : "border-gray-300"
              } bg-white px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500`}
              onChange={handleChange}
              value={formData?.[name] || ""}
              onBlur={(e) => validateField(name, e.target.value)}
              id={`${name}-${index}`}
            />
            {renderError(name)}
          </div>
        ))}

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Department
          </label>
          {isOthers ? (
            <div className="mt-1 relative">
              <input
                type="text"
                name="customDepartment"
                id={`department-${index}`}
                ref={customDepartmentRef}
                className={`block w-full rounded-md border ${
                  errors.department
                    ? "border-red-300 ring-1 ring-red-300"
                    : "border-gray-300"
                } bg-white px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500`}
                placeholder="Enter your department"
                value={formData?.customDepartment || ""}
                onChange={handleChange}
                onBlur={(e) => validateField("department", e.target.value)}
              />
              <button
                type="button"
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                onClick={() => {
                  setIsOthers(false);
                  const newData = {
                    ...formData,
                    department: "",
                    customDepartment: "",
                  };
                  onChange(newData);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          ) : (
            <select
              name="department"
              id={`department-${index}`}
              className={`mt-1 block w-full rounded-md border ${
                errors.department
                  ? "border-red-300 ring-1 ring-red-300"
                  : "border-gray-300"
              } bg-white px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500`}
              onChange={handleChange}
              value={formData?.department || ""}
              onBlur={(e) => validateField("department", e.target.value)}
            >
              <option value="">Select Department</option>
              <option value="CSE">CSE</option>
              <option value="ECE">ECE</option>
              <option value="IT">IT</option>
              <option value="Others">Others</option>
            </select>
          )}
          {renderError("department")}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Year
          </label>
          <select
            name="year"
            id={`year-${index}`}
            className={`mt-1 block w-full rounded-md border ${
              errors.year
                ? "border-red-300 ring-1 ring-red-300"
                : "border-gray-300"
            } bg-white px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500`}
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
          Stay
        </label>
        <div
          className={
            errors.accommodation
              ? "p-2 border border-red-300 rounded-md bg-red-50"
              : ""
          }
        >
          {[
            { label: "Hosteller", value: "hosteller" },
            { label: "Day Scholar", value: "dayScholar" },
          ].map(({ label, value }) => (
            <label key={value} className="inline-flex items-center mr-4">
              <input
                type="radio"
                name="accommodation"
                id={`accommodation-${value}-${index}`}
                value={value}
                checked={formData?.accommodation === value}
                onChange={handleChange}
                className="text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-2">{label}</span>
            </label>
          ))}
          {renderError("accommodation")}
        </div>
      </div>

      {isHosteller && (
        <div className="space-y-4 animate-slideDown p-4 bg-blue-50 rounded-lg border border-blue-100">
          <h3 className="font-medium text-blue-800">Hostel Details</h3>
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
                id={`${name}-${index}`}
                className={`mt-1 block w-full rounded-md border ${
                  errors[name]
                    ? "border-red-300 ring-1 ring-red-300"
                    : "border-gray-300"
                } bg-white px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500`}
                onChange={handleChange}
                value={formData?.[name] || ""}
                onBlur={(e) => validateField(name, e.target.value)}
              />
              {renderError(name)}
            </div>
          ))}
        </div>
      )}

      <div className="space-y-2">
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            name="hasDisabilities"
            id={`hasDisabilities-${index}`}
            checked={hasDisabilities}
            onChange={handleChange}
            className="text-blue-600 focus:ring-blue-500"
          />
          <span className="ml-2">Has Disabilities</span>
        </label>

        {hasDisabilities && (
          <div className="animate-slideDown ml-6 mt-2">
            <label className="block text-sm font-medium text-gray-700">
              Disability Details
            </label>
            <input
              type="text"
              name="disabilityDetails"
              id={`disabilityDetails-${index}`}
              className={`mt-1 block w-full rounded-md border ${
                errors.disabilityDetails
                  ? "border-red-300 ring-1 ring-red-300"
                  : "border-gray-300"
              } bg-white px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500`}
              onChange={handleChange}
              value={formData?.disabilityDetails || ""}
              onBlur={(e) => validateField("disabilityDetails", e.target.value)}
            />
            {renderError("disabilityDetails")}
          </div>
        )}
      </div>

      <div className="space-y-2">
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            name="fasting"
            id={`fasting-${index}`}
            checked={formData?.fasting || false}
            onChange={handleChange}
            className="text-blue-600 focus:ring-blue-500"
          />
          <span className="ml-2">Fasting</span>
        </label>
      </div>
    </div>
  );
}
