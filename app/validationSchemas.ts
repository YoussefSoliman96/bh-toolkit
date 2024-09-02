import { z } from "zod";

const ProviderTitleEnum = z.enum(["NP", "MD", "DNP", "DO"]);
const GenderEnum = z.enum(["MALE", "FEMALE"]);

export const createProviderSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  title: ProviderTitleEnum,
  gender: GenderEnum,
  evaluation: z.string().min(1).max(60),
  languages: z.string().min(3).max(60),
  followUp: z.string().min(1).max(60),
  ageRange: z.string().min(1, { message: "Age range is required" }),
  workingHours: z.string().min(1, { message: "Working hours are required" }),
});
