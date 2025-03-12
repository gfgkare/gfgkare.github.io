import { useState } from "react";
import { QrCode } from "lucide-react";
import StudentForm from "./ui/StudentForm";
import PaymentForm from "./ui/PaymentForm";
import { supabase } from "../../../lib/supabase";
import { studentSchema } from "@/lib/validation";
import { paymentSchema } from "@/lib/validation";
import { z } from "zod";
import { useNavigate } from "react-router-dom";

function G2Registration() {
  const navigate = useNavigate();
  const [teamSize, setTeamSize] = useState(null);
  const [formData, setFormData] = useState([]);
  const [paymentData, setPaymentData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleTeamSizeChange = (size) => {
    setTeamSize(size);
    setFormData(Array(size).fill({}));
  };

  const handleStudentFormChange = (index, data) => {
    const newFormData = [...formData];
    newFormData[index] = data;
    setFormData(newFormData);
  };

  const handlePaymentFormChange = (data) => {
    setPaymentData(data);
  };

  const validateForm = () => {
    let errors = {};

    formData.forEach((student, index) => {
      Object.keys(studentSchema.shape).forEach((field) => {
        try {
          studentSchema.shape[field].parse(student[field]);
        } catch (error) {
          if (error instanceof z.ZodError) {
            errors[`student-${index}-${field}`] =
              error.errors[0]?.message || "Invalid input";
          }
        }
      });
    });

    Object.keys(paymentSchema.shape).forEach((field) => {
      try {
        paymentSchema.shape[field].parse(paymentData[field]);
      } catch (error) {
        if (error instanceof z.ZodError) {
          errors[field] = error.errors[0]?.message || "Invalid input";
        }
      }
    });

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    const errors = validateForm();

    if (Object.keys(errors).length > 0) {
      console.error("Validation Errors:", errors);
      setError("Please fix the highlighted errors before submitting.");
      setIsSubmitting(false);
      return;
    }

    try {
      //   const validatedStudents = formData.map((student, index) => {
      //     const result = studentSchema.safeParse(student);
      //     if (!result.success) {
      //       const fieldErrors = result.error.flatten().fieldErrors;
      //       throw new Error(
      //         `Member ${index + 1}: ${Object.values(fieldErrors)[0]}`
      //       );
      //     }
      //     return result.data;
      //   });

      //   // Validate payment data
      //   const paymentResult = paymentSchema.safeParse(paymentData);
      //   if (!paymentResult.success) {
      //     const paymentErrors = paymentResult.error.flatten().fieldErrors;
      //     throw new Error(Object.values(paymentErrors)[0]);
      //   }

      const { data: teamData, error: teamError } = await supabase
        .from("teams")
        .insert([{ size: teamSize }])
        .select()
        .single();

      if (teamError) throw teamError;

      const studentsWithTeam = formData.map((student) => ({
        ...student,
        team_id: teamData.id,
      }));

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

      setTeamSize(null);
      setFormData([]);
      setPaymentData({});

      navigate("/success");
    } catch (error) {
      console.error("Registration error:", error);
      setError(error.message || "An error occurred during registration");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto p-6 space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Register for G2HackFest
          </h1>
          <p className="text-gray-600">Fill out all fields carefully</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="bg-white rounded-lg shadow-sm border p-6 space-y-6">
            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700">
                Select Team Size
              </label>
              <div className="flex gap-4">
                {[3, 4].map((size) => (
                  <button
                    type="button"
                    key={size}
                    onClick={() => handleTeamSizeChange(size)}
                    className={`flex-1 py-3 px-4 rounded-lg border transition-all duration-300 ${
                      teamSize === size
                        ? "border-blue-500 bg-blue-50 text-blue-700"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    {size} Members
                  </button>
                ))}
              </div>
            </div>

            {teamSize && (
              <div className="space-y-8">
                {formData.map((_, index) => (
                  <div
                    key={index}
                    className="animate-slideIn"
                    style={{
                      animationDelay: `${index * 0.1}s`,
                    }}
                  >
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">
                      Team Member {index + 1}
                    </h2>
                    <StudentForm
                      index={index}
                      formData={formData[index]}
                      onChange={(data) => handleStudentFormChange(index, data)}
                    />
                  </div>
                ))}

                <div className="pt-8 border-t">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">
                    Payment Details
                  </h2>
                  <PaymentForm
                    onChange={handlePaymentFormChange}
                    formData={paymentData}
                  />
                </div>

                {error && (
                  <div className="text-red-600 text-sm p-4 bg-red-50 rounded-md">
                    {error}
                  </div>
                )}

                <div className="pt-6">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-3 px-6 rounded-lg text-white transition-colors duration-300 ${
                      isSubmitting
                        ? "bg-blue-400 cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-700"
                    }`}
                  >
                    {isSubmitting
                      ? "Submitting..."
                      : "Submit Team Registration"}
                  </button>
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
