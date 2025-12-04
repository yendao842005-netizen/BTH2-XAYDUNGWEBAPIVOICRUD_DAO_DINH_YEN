import { z } from "zod";

export const createDuAnSchema = z.object({
  MaDA: z.number().int(),
  TenDA: z.string().max(200),
  DiaDiemDA: z.string().max(200).optional().nullable(),
  MaSoDV: z.number().int().optional().nullable()
})


export function validateCreateDuAn(data) {
  return createDuAnSchema.parse(data);
}
