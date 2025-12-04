import { z } from "zod";

export const updateDonViSchema = z.object({
  
   MaSoDV: z.number({ required_error: "MaSoDV is required" }).int(),
  TenDV: z.string({ required_error: "TenDV is required" }).max(100),
  MaSoNQL: z.number().int().optional().nullable(),
  NgayBatDau: z.string().optional().nullable()
});
export function validateUpdateDonVi(data) {
  return updateDonViSchema.parse(data);
}
