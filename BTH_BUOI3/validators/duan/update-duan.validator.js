import { z } from "zod";

export const updateDuAnSchema = z.object({
  
  MaDA: z.number().int(),
  TenDA: z.string().max(200),
  DiaDiemDA: z.string().max(200).optional().nullable(),
  MaSoDV: z.number().int().optional().nullable()
});
export function validateUpdateDuAn(data) {
  return updateDuAnSchema.parse(data);
}
