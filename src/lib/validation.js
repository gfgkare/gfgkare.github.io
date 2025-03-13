import { z } from "zod";

export const studentSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  registerNumber: z.string().min(1, "Register number is required"),
  phoneNumber: z.string().regex(/^\d{10}$/, "Phone number must be 10 digits"),
  department: z.string().min(2, "Department is required"),
  year: z.string().min(1, "Year is required"),
  email: z.string().email("Invalid email address").regex(/@klu\.ac\.in$/, "Please register with your KLU email"),
  accommodation: z.enum(["hosteller", "dayScholar"]),
  fasting: z.boolean().optional(),
  hasDisabilities: z.boolean().optional(),
  disabilityDetails: z.string().optional(),
  hostelName: z.string().optional(),
  roomNo: z.string().optional(),
  wardenName: z.string().optional(),
});

export const paymentSchema = z.object({
  upiId: z.string().min(1, "UPI ID is required").regex(/^[\w.-]+@[\w.-]+$/, "Please enter a valid UPI ID").refine(val => val !== "69097701@ubin", {
    message: "You have entered our UPI ID, please enter yours.",
  }),
  transactionId: z.string().min(12, "Enter a valid Transaction ID of 12 characters").max(12, "Enter a valid Transaction ID of 12 characters"),
  paymentProof: z.instanceof(File, { message: "Payment proof is required" }),
});
