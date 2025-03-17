"use client";

import { useState } from "react";
import {
  QrCode,
  Users,
  CreditCard,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  AlertCircle,
} from "lucide-react";
import StudentForm from "./ui/StudentForm";
import PaymentForm from "./ui/PaymentForm";
import { supabase } from "../../../lib/supabase";
import { studentSchema } from "@/lib/validation";
import { paymentSchema } from "@/lib/validation";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

import axios from "@/scripts/axiosConfig";

// Animated Background Component
const AnimatedGrid = () => {
  return (
    <div className="fixed inset-0 -z-10 opacity-10">
      <div className="absolute inset-0 grid grid-cols-12 grid-rows-12 gap-4">
        {Array.from({ length: 144 }).map((_, i) => (
          <div
            key={i}
            className="bg-primary rounded-full opacity-0 animate-pulse"
            style={{
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${3 + Math.random() * 5}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

// Animated Button Component
const AnimatedButton = ({
  children,
  onClick,
  className,
  disabled,
  type = "button",
  variant = "primary",
}) => {
  const baseClasses =
    "relative overflow-hidden rounded-lg transition-all duration-300 flex items-center justify-center";
  const primaryClasses = disabled
    ? "bg-slate-400 text-white cursor-not-allowed py-3 px-6"
    : "bg-primary text-white hover:bg-primary/90 shadow-md hover:shadow-lg hover:-translate-y-1 py-3 px-6";
  const secondaryClasses =
    "bg-transparent text-slate-600 hover:bg-slate-100 py-2 px-4";

  const variantClasses =
    variant === "primary" ? primaryClasses : secondaryClasses;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(baseClasses, variantClasses, className)}
    >
      {!disabled && variant === "primary" && (
        <span className="absolute inset-0 w-full h-full">
          <span className="absolute -inset-[100%] block w-[50%] h-full bg-white/20 skew-x-12 z-10 animate-shine" />
        </span>
      )}
      {children}
    </button>
  );
};

// Team Size Badge Component
const TeamSizeBadge = ({ size }) => {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full animate-fadeIn">
      <Users className="h-4 w-4" />
      <span className="font-medium">{size} Team Members</span>
    </div>
  );
};

function G2Registration() {
  const navigate = useNavigate();
  const [teamSize, setTeamSize] = useState(null);
  const [teamName, setTeamName] = useState("");
  const [formData, setFormData] = useState();
  const [paymentData, setPaymentData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [currentStep, setCurrentStep] = useState(1);
  const [formComplete, setFormComplete] = useState(false);
  const [formErrors, setFormErrors] = useState([]);

  const handleTeamSizeChange = (size) => {
    setTeamSize(size);
    window.teamSize = size; // Make teamSize available globally
    setFormData(Array(size).fill({}));
    setTimeout(() => {
      setCurrentStep(2);
    }, 300);
  };

  const handleTeamNameChange = (teamName) => {
    setTeamName(teamName);
  };

  const handleStudentFormChange = (index, data) => {
    const newFormData = [...formData];
    newFormData[index] = data;
    setFormData(newFormData);
  };

  // Add this function to the G2Registration component
  const validateUniqueFields = () => {
    const registerNumbers = new Set();
    const emails = new Set();
    const newFormErrors = [...formErrors];
    let isValid = true;
    let firstErrorField = null;

    formData.forEach((student, index) => {
      // Check register number uniqueness
      if (student.registerNumber) {
        if (registerNumbers.has(student.registerNumber)) {
          if (!newFormErrors[index]) newFormErrors[index] = {};
          newFormErrors[index].registerNumber =
            "Register number must be unique across team members";
          isValid = false;
          if (!firstErrorField)
            firstErrorField = { index, field: "registerNumber" };
        } else {
          registerNumbers.add(student.registerNumber);
        }
      }

      // Check email uniqueness
      if (student.email) {
        if (emails.has(student.email)) {
          if (!newFormErrors[index]) newFormErrors[index] = {};
          newFormErrors[index].email =
            "Email must be unique across team members";
          isValid = false;
          if (!firstErrorField) firstErrorField = { index, field: "email" };
        } else {
          emails.add(student.email);
        }
      }
    });

    if (!isValid) {
      setFormErrors(newFormErrors);

      if (firstErrorField) {
        setTimeout(() => {
          const errorElement = document.getElementById(
            `${firstErrorField.field}-${firstErrorField.index}`
          );
          if (errorElement) {
            errorElement.scrollIntoView({
              behavior: "smooth",
              block: "center",
            });
            errorElement.focus();
          }
        }, 100);

        setError(
          `Please fix the duplicate ${firstErrorField.field} in Team Member ${
            firstErrorField.index + 1
          }'s form`
        );
        setTimeout(() => {
          const errorElement = document.getElementById("error-label");
          if (errorElement) {
            errorElement.scrollIntoView({
              behavior: "smooth",
              block: "center",
            });
            errorElement.focus();
          }
        }, 100);
      }
    }

    return isValid;
  };

  const validateAllStudentForms = async () => {
    setError("");
    let isValid = true;
    const newFormErrors = [];
    let firstErrorField = null;

    if (teamName.trim() === "") {
      setError("Team Name is required");
      isValid = false;

      setTimeout(() => {
        const errorElement = document.getElementById("teamName");
        if (errorElement) {
          errorElement.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
          errorElement.focus();
        }
      }, 100);
      return;
    }

    // const { data: existingTeams, error: teamFetchError } = await supabase
    //   .from("teams")
    //   .select("name")
    //   .eq("name", teamName);

    // if (teamFetchError) throw teamFetchError;

    // if (existingTeams.length > 0) {
    //   setError(
    //     `The team name "${teamName}" is already taken. Please choose another.`
    //   );
    //   isValid = false;

    //   setTimeout(() => {
    //     const errorElement = document.getElementById("teamName");
    //     if (errorElement) {
    //       errorElement.scrollIntoView({
    //         behavior: "smooth",
    //         block: "center",
    //       });
    //       errorElement.focus();
    //     }
    //   }, 100);

    //   return;
    // }

    const registerNumbers = formData.map((student) => student.registerNumber);

    const { data: existingStudents, error: fetchError } = await supabase
      .from("students")
      .select("registerNumber")
      .in("registerNumber", registerNumbers);

    if (fetchError) throw fetchError;

    const existingRegisterNumbers = new Set(
      existingStudents.map((s) => s.registerNumber)
    );

    const duplicateStudent = formData.find((student) =>
      existingRegisterNumbers.has(student.registerNumber)
    );

    const duplicateIndex =
      formData.findIndex(
        (student) => student.registerNumber === duplicateStudent?.registerNumber
      ) + 1;

    if (duplicateStudent) {
      setError(
        `Team Member ${duplicateIndex}'s Register Number is already registered.`
      );
      isValid = false;
      setTimeout(() => {
        const errorElement = document.getElementById(`error-label`);
        if (errorElement) {
          errorElement.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
          errorElement.focus();
        }
      }, 100);

      return;
    }

    setFormData((prevFormData) =>
      prevFormData.map((student, index) => ({
        ...student,
        hostelName: student.hostelName || "",
        wardenName: student.wardenName || "",
        wardenNumber: student.wardenNumber || "",
        roomNo: student.roomNo || "",
      }))
    );

    formData.forEach((student, index) => {
      const studentErrors = {};

      Object.keys(studentSchema.shape).forEach((field) => {
        try {
          if (
            (field === "hostelName" ||
              field === "roomNo" ||
              field === "wardenName" ||
              field === "wardenNumber") &&
            student?.accommodation === "hosteller"
          ) {
            if (field === "wardenNumber") {
              // Regex to verify phone number
              const phoneRegex = /^\d{10}$/;

              if (!phoneRegex.test(student?.wardenNumber)) {
                setTimeout(() => {
                  const errorElement = document.getElementById("error-label");
                  if (errorElement) {
                    errorElement.scrollIntoView({
                      behavior: "smooth",
                      block: "center",
                    });
                    errorElement.focus();
                  }
                }, 100);

                setError("Please enter a valid warden number");
                isValid = false;
                return;
              }
            }

            if (student?.[field] === "") {
              setTimeout(() => {
                const errorElement = document.getElementById(
                  `${field}-${index}`
                );

                let current = true;
                if (errorElement && current) {
                  errorElement.scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                  });
                  errorElement.focus();
                  current = false;
                }
              }, 100);
              isValid = false;
              return;
            }
          }

          if (field === "department" && student.department === "Others") {
            if (!student.customDepartment) {
              studentErrors[field] = "Department is required";
              isValid = false;
              if (!firstErrorField) firstErrorField = { index, field };
            }
            return;
          }

          studentSchema.shape[field].parse(student[field]);
        } catch (error) {
          if (error instanceof z.ZodError) {
            studentErrors[field] = error.errors[0]?.message || "Invalid input";
            isValid = false;
            if (!firstErrorField) firstErrorField = { index, field };
          }
        }
      });

      if (Object.keys(studentErrors).length > 0) {
        newFormErrors[index] = studentErrors;
      }
    });

    if (isValid) {
      isValid = validateUniqueFields();
    } else {
      setFormErrors(newFormErrors);

      if (firstErrorField) {
        setTimeout(() => {
          const errorElement = document.getElementById(
            `${firstErrorField.field}-${firstErrorField.index}`
          );
          let current = true;
          if (errorElement && current) {
            errorElement.scrollIntoView({
              behavior: "smooth",
              block: "center",
            });
            errorElement.focus();
            current = false;
          }
        }, 100);

        setError(
          `Please fix the errors in Team Member ${
            firstErrorField.index + 1
          }'s form`
        );
      }
    }
    return isValid;
  };

  const handlePaymentFormChange = (data) => {
    setPaymentData(data);

    const paymentFilled =
      Object.keys(data).length >= 2 &&
      Object.values(data).some(
        (val) => val && (typeof val === "string" ? val.trim() !== "" : true)
      );

    if (paymentFilled && paymentData.paymentProof !== "") {
      setFormComplete(true);
    }
  };

  const validateForm = () => {
    const errors = {};
    let isValid = true;

    if (!validateAllStudentForms()) {
      isValid = false;
    }

    if (currentStep === 3) {
      Object.keys(paymentSchema.shape).forEach((field) => {
        try {
          paymentSchema.shape[field].parse(paymentData[field]);
        } catch (error) {
          if (error instanceof z.ZodError) {
            errors[field] = error.errors[0]?.message || "Invalid input";
            isValid = false;
          }
        }
      });
    }

    return { isValid, errors };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    const { isValid, errors } = validateForm();

    if (!isValid) {
      console.error("Validation Errors:", errors);
      if (Object.keys(errors).includes("details")) {
        setError(errors["details"]);
      } else {
        setError(errors[Object.keys(errors)[0]]);
      }
      setIsSubmitting(false);
      return;
    }

    try {
      const { data: teamData, error: teamError } = await supabase
        .from("teams")
        .insert([{ size: teamSize, name: teamName }])
        .select()
        .single();

      if (teamError) throw teamError;

      const studentsWithTeam = formData.map((student) => {
        const cleanStudent = { ...student, team_id: teamData.id };

        if (student.department === "Others" && student.customDepartment) {
          cleanStudent.department = student.customDepartment;
        }

        delete cleanStudent.customDepartment;

        if (student.accommodation === "dayScholar") {
          delete cleanStudent.hostelName;
          delete cleanStudent.roomNo;
          delete cleanStudent.wardenName;
          delete cleanStudent.wardenNumber;
        }

        return cleanStudent;
      });

      const { error: studentsError } = await supabase
        .from("students")
        .insert(studentsWithTeam);

      if (studentsError) throw studentsError;

      let paymentProofUrl = "";
      if (paymentData.paymentProof) {
        const fileExt = paymentData.paymentProof.name.split(".").pop();
        const fileName = `${Math.random()
          .toString(36)
          .substring(2)}.${fileExt}`;
        const filePath = `payment-proofs/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from("payment-proofs")
          .upload(filePath, paymentData.paymentProof);

        if (uploadError) throw uploadError;

        const {
          data: { publicUrl },
        } = supabase.storage.from("payment-proofs").getPublicUrl(filePath);

        paymentProofUrl = publicUrl;
      }

      const { error: paymentError } = await supabase.from("payments").insert([
        {
          team_id: teamData.id,
          upi_id: paymentData.upiId,
          transaction_id: paymentData.transactionId,
          payment_proof_url: paymentProofUrl,
        },
      ]);

      if (paymentError) throw paymentError;

      const teamLeaderEmail = formData[0]?.email; // Assuming the first team member is the team leader

      axios.post("/send-email", {
        teamName,
        email: teamLeaderEmail,
      });

      setTeamSize(null);
      setFormData([]);
      setPaymentData({});

      navigate("/g2hack/success");

      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, 100);
    } catch (error) {
      console.error("Registration error:", error);
      // setError(error.message || "An error occurred during registration");

      if (Object.keys(error).includes("details")) {
        setError(error["details"]);
      } else {
        setError(error["message"]);
      }
      setIsSubmitting(false);
      return;
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 overflow-hidden">
      <AnimatedGrid />

      <div className="max-w-4xl mx-auto p-6 pt-12 space-y-8">
        <div className="text-center space-y-4 animate-fadeIn">
          <div className="inline-flex items-center justify-center p-2 bg-primary/10 rounded-full mb-4">
            <QrCode className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-5xl font-bold text-slate-900 mb-2 tracking-tight">
            G2HackFest Registration
          </h1>
          <p className="text-slate-600 max-w-lg mx-auto">
            Join the most exciting hackathon of the year. Fill out all fields
            carefully to complete your registration.
          </p>
        </div>

        <div className="flex justify-between items-center max-w-md mx-auto mb-8 relative">
          {[1, 2, 3].map((step) => (
            <div key={step} className="flex flex-col items-center z-10">
              <div
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500",
                  currentStep === step
                    ? "bg-primary text-white scale-110"
                    : currentStep > step
                    ? "bg-green-500 text-white"
                    : "bg-slate-200 text-slate-500"
                )}
              >
                {currentStep > step ? (
                  <CheckCircle className="h-5 w-5" />
                ) : (
                  <span>{step}</span>
                )}
              </div>
              <span
                className={cn(
                  "text-xs mt-2 font-medium",
                  currentStep === step
                    ? "text-primary"
                    : currentStep > step
                    ? "text-green-500"
                    : "text-slate-500"
                )}
              >
                {step === 1
                  ? "Team Size"
                  : step === 2
                  ? "Team Details"
                  : "Payment"}
              </span>
            </div>
          ))}
          <div
            className={cn(
              "h-1 absolute left-1/2 -translate-x-1/2 w-64 bg-slate-200",
              "after:content-[''] after:absolute after:h-full after:bg-primary after:transition-all after:duration-500",
              currentStep === 1
                ? "after:w-0"
                : currentStep === 2
                ? "after:w-1/2"
                : "after:w-full"
            )}
          ></div>
        </div>

        {error && (
          <div
            className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-start"
            id="error-label"
          >
            <AlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium">Please fix the following errors:</p>
              <p className="text-sm">{error}</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-8 space-y-8 backdrop-blur-sm bg-white/80">
            <div
              className={cn(
                "transition-all duration-500 transform",
                currentStep === 1
                  ? "translate-x-0 opacity-100"
                  : "translate-x-[-100px] opacity-0 absolute pointer-events-none"
              )}
            >
              <div className="space-y-4">
                <div className="flex items-center space-x-3 mb-6">
                  <Users className="h-6 w-6 text-primary" />
                  <h2 className="text-xl font-semibold text-slate-900">
                    Select Your Team Size
                  </h2>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {[3, 4].map((size) => (
                    <button
                      type="button"
                      key={size}
                      onClick={() => handleTeamSizeChange(size)}
                      className={cn(
                        "py-6 px-4 rounded-xl border-2 transition-all duration-300 flex flex-col items-center justify-center hover:shadow-md group",
                        teamSize === size
                          ? "border-primary bg-primary/5 text-primary"
                          : "border-slate-200 hover:border-primary/30 hover:bg-slate-50"
                      )}
                    >
                      <span className="text-3xl font-bold mb-2 group-hover:scale-110 transition-transform">
                        {size}
                      </span>
                      <span className="text-slate-600">Team Members</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {teamSize && (
              <div
                className={cn(
                  "transition-all duration-500 transform",
                  currentStep === 2
                    ? "translate-x-0 opacity-100"
                    : currentStep < 2
                    ? "translate-x-[100px] opacity-0 absolute pointer-events-none"
                    : "translate-x-[-100px] opacity-0 absolute pointer-events-none"
                )}
              >
                <div className="space-y-8">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-3">
                      <Users className="h-6 w-6 text-primary" />
                      <h2 className="text-xl font-semibold text-slate-900">
                        Team Details
                      </h2>
                    </div>
                    <TeamSizeBadge size={teamSize} />
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h2 className="text-xl font-semibold text-slate-900">
                        Team Name
                      </h2>
                      <input
                        type="text"
                        id="teamName"
                        value={teamName}
                        onChange={(e) => handleTeamNameChange(e.target.value)}
                        className="mt-1 block w-full rounded-md border border-slate-300 shadow-sm focus:border-primary focus:ring focus:ring-primary/30 p-2"
                        placeholder="Enter your team name"
                        required
                      />
                    </div>
                  </div>

                  {formData.map((_, index) => (
                    <div
                      key={index}
                      className="animate-slideUp"
                      style={{
                        animationDelay: `${index * 0.15}s`,
                      }}
                    >
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-medium">
                          {index + 1}
                        </div>
                        <h2 className="text-xl font-semibold text-slate-900">
                          Team Member {index + 1}
                        </h2>
                      </div>
                      <div className="bg-slate-50 p-6 rounded-lg border border-slate-200">
                        <StudentForm
                          index={index}
                          formData={formData[index]}
                          onChange={(data) =>
                            handleStudentFormChange(index, data)
                          }
                        />
                      </div>
                    </div>
                  ))}

                  <div className="flex justify-between">
                    <AnimatedButton
                      onClick={() => setCurrentStep(1)}
                      variant="secondary"
                      className="group"
                    >
                      <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                      <span>Back to Team Size</span>
                    </AnimatedButton>

                    <AnimatedButton
                      onClick={async () => {
                        const isValid = await validateAllStudentForms();
                        if (isValid) {
                          setCurrentStep(3);
                        }
                      }}
                      className="group"
                    >
                      <span>Continue to Payment</span>
                      <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </AnimatedButton>
                  </div>
                </div>
              </div>
            )}

            {teamSize && (
              <div
                className={cn(
                  "transition-all duration-500 transform",
                  currentStep === 3
                    ? "translate-x-0 opacity-100"
                    : "translate-x-[100px] opacity-0 absolute pointer-events-none"
                )}
              >
                <div className="space-y-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <CreditCard className="h-6 w-6 text-primary" />
                      <h2 className="text-xl font-semibold text-slate-900">
                        Payment Details
                      </h2>
                    </div>
                    <TeamSizeBadge size={teamSize} />
                  </div>

                  <div className="bg-slate-50 p-6 rounded-lg border border-slate-200 animate-fadeIn">
                    <PaymentForm
                      onChange={handlePaymentFormChange}
                      formData={paymentData}
                    />
                  </div>

                  <div className="pt-4 flex justify-between items-center">
                    <AnimatedButton
                      onClick={() => setCurrentStep(2)}
                      variant="secondary"
                      className="group"
                    >
                      <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                      <span>Back to Team Details</span>
                    </AnimatedButton>

                    <AnimatedButton
                      type="submit"
                      disabled={isSubmitting || !formComplete}
                      className="group"
                    >
                      <span>
                        {isSubmitting
                          ? "Submitting..."
                          : "Complete Registration"}
                      </span>
                      {!isSubmitting && (
                        <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      )}
                    </AnimatedButton>
                  </div>
                </div>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default G2Registration;
