import { z } from "zod";

export const createCongSchema = z.object({
 SLNGAYCONG: z.string({ required_error: "SINGAYCONG is required" }).length(6),
  MANV: z.string({ required_error: "MAN is required" }).length(4),
  MACT: z.string({ required_error: "MACT is required" }).length(4),
  NGAYCONG: z.string({ required_error: "NGAYCONG is required" }).refine(
    (val) => !isNaN(Date.parse(val)),
    { message: "Invalid date format" }
  ),
  SOGIOLAM: z.number({ required_error: "SOGIOLAM is required" })
    .min(0)
    .max(24)
    .refine(val => {
      const decimalPart = val.toString().split('.')[1];
      return !decimalPart || decimalPart.length <= 2;
    }, { message: "SOGIOLAM can have max 2 decimal places" }),
});

export function validateCreateCong(data) {
  return createCongSchema.parse(data);
}
