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
  // disabilityDetails: z.string().optional(),

  // Hostel fields conditionally required
  hostelName: z
    .string()
    .or(z.undefined())
    .refine((val, ctx) => {
      if (ctx.parent.accommodation === "hosteller" && !val) {
        return ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Hostel name is required for hostellers",
        });
      }
      return true;
    }),
  roomNo: z
    .string()
    .or(z.undefined())
    .refine((val, ctx) => {
      if (ctx.parent.accommodation === "hosteller" && !val) {
        return ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Room number is required for hostellers",
        });
      }
      return true;
    }),
  wardenName: z
    .string()
    .or(z.undefined())
    .refine((val, ctx) => {
      if (ctx.parent.accommodation === "hosteller" && !val) {
        return ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Warden name is required for hostellers",
        });
      }
      return true;
    }),
  wardenNumber: z
    .string()
    .or(z.undefined())
    .refine((val, ctx) => {
      if (ctx.parent.accommodation === "hosteller" && !val) {
        return ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Warden number is required for hostellers",
        });
      }
      return true;
    }),

  // Disability details conditionally required
  disabilityDetails: z
    .string()
    .or(z.undefined())
    .refine((val, ctx) => {
      if (ctx.parent.hasDisabilities && !val) {
        return ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message:
            "Disability details are required when disabilities are indicated",
        });
      }
      return true;
    }),
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

export function validateUniqueFields(formData) {
  const errors = [];
  const registerNumbers = new Set();
  const emails = new Set();

  formData.forEach((student, index) => {
    if (student.registerNumber) {
      if (registerNumbers.has(student.registerNumber)) {
        errors.push({
          index,
          field: "registerNumber",
          message: "Register number must be unique across team members",
        });
      } else {
        registerNumbers.add(student.registerNumber);
      }
    }

    if (student.email) {
      if (emails.has(student.email)) {
        errors.push({
          index,
          field: "email",
          message: "Email must be unique across team members",
        });
      } else {
        emails.add(student.email);
      }
    }
  });

  return errors;
}
