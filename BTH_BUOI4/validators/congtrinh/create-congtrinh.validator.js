import { z } from "zod";

export const createCongTrinhSchema = z.object({
  
   MACT: z.string({ required_error: "MACT is required" }).length(4),
  TENCT: z.string({ required_error: "TENCT is required" }).max(100),
  DIADIEM: z.string({ required_error: "DIADIEM is required" }).max(100),
  NGAYCAPGP: z.string({ required_error: "NGAYCAPGP is required" }).refine(
    (val) => !isNaN(Date.parse(val)),
    { message: "Invalid date format" }
  ),
  NGAYKC: z.string({ required_error: "NGAYKC is required" }).refine(
    (val) => !isNaN(Date.parse(val)),
    { message: "Invalid date format" }
  ),
});

export function validatecreateCongTrinh(data) {
  return createCongTrinhSchema.parse(data);
}
