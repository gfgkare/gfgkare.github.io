import { z } from "zod";

export const studentSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  registerNumber: z.preprocess(
    (val) => (typeof val === "string" ? Number(val) : val),
    z.number().min(1, { message: "Register number is required" })
  ),
  phoneNumber: z.string().regex(/^\d{10}$/, "Phone number must be 10 digits"),
  department: z.string().min(2, "Department is required"),
  year: z.string().min(1, "Year is required"),
  email: z
    .string()
    .email("Invalid email address")
    .regex(/@klu\.ac\.in$/, "Please register with your KLU email"),
  accommodation: z.enum(["hosteller", "dayScholar"]),
  gender: z.enum(["Male", "Female"], {
    errorMap: () => ({ message: "Gender must be either 'Male' or 'Female'" }),
  }),
  fasting: z.boolean().optional(),
  hasDisabilities: z.boolean().optional(),
  disabilityDetails: z.string().optional(),
  hostelName: z.string().optional(),
  roomNo: z.string().optional(),
  wardenName: z.string().optional(),
  wardenNumber: z.string().optional(),
});

export const paymentSchema = z.object({
  upiId: z
    .string()
    .min(1, "UPI ID is required")
    .refine((val) => val !== "69097701@ubin", {
      message: "This UPI ID is not allowed",
    }),
  transactionId: z
    .string()
    .regex(/^\d{12}$/, "Transaction ID must be exactly 12 digits"),
  paymentProof: z.instanceof(File, { message: "Payment proof is required" }),
});
