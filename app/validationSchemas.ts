import { number, optional, string, z } from "zod";

const ProviderTitleEnum = z.enum([
  "NP",
  "MD",
  "DNP",
  "DO",
  "AMFT",
  "APCC",
  "LCSW",
  "PhD",
  "PsyD",
]);
const GenderEnum = z.enum(["MALE", "FEMALE"]);
const RoleEnum = z.enum(["PSYCHIATRIST", "THERAPIST", "RESIDENCY"]);
const UserRoleEnum = z.enum(["USER", "ADMIN"]);

export const providerSchema = z.object({
  firstName: z
    .string()
    .min(1, { message: "First name is required" })
    .max(20, { message: "Name can't exceed 20 characters" }),
  lastName: z
    .string()
    .min(1, { message: "Last name is required" })
    .max(20, { message: "Name can't exceed 20 characters" }),
  title: ProviderTitleEnum,
  role: RoleEnum,
  gender: GenderEnum,
  evaluation: z.string().min(1).max(60),
  languages: z.string().min(3).max(60),
  followUp: z.string().min(1).max(60),
  ageRange: z.string().min(1, { message: "Age range is required" }),
  workingHours: z.string().min(1, { message: "Working hours are required" }),
  link: z.string().min(1).max(50),
  handlerId: z.number().optional(),
  schedulerId: z.number().optional(),
  transcriberId: z.number().optional(),
});

export const userSchema = z.object({
  firstName: z
    .string()
    .min(1, { message: "First name is required" })
    .max(20, { message: "Name can't exceed 20 characters" }),
  lastName: z
    .string()
    .min(1, { message: "Last name is required" })
    .max(20, { message: "Name can't exceed 20 characters" }),
  username: z
    .string()
    .min(1, { message: "username is required" })
    .max(20, { message: "Name can't exceed 20 characters" }),
  nickname: z
    .string()
    .min(1, { message: "nickname is required" })
    .max(20, { message: "Name can't exceed 20 characters" }),
  password: z.string().min(1, { message: "username is required" }).max(12),
  title: z.string().min(1, { message: "Title is required" }),
  gender: GenderEnum,
  role: UserRoleEnum,
});

export const handlerSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
});

// Schema for validating login request
export const loginSchema = z.object({
  username: z.string().min(1, { message: "Username is required" }),
  password: z.string().min(1, { message: "Password is required" }).max(12),
});

export const reminderSchema = z.object({
  description: z
    .string()
    .min(5, { message: " Description is required" })
    .max(200),
  creator: z.string().min(1, { message: " Description is required" }),
});
