import { z } from "zod";

export const createNhanVienSchema = z.object({
  MaSoNV: z.number({ required_error: "MaSoNV required" }).int(),
  HoDem: z.string().max(50),
  Ten: z.string().max(50),
  NgaySinh: z.string().optional().nullable(),
  DiaChi: z.string().max(200).optional().nullable(),
  Luong: z.number().optional().nullable(),
  GioiTinh: z.string().optional().nullable(),
  MaSoNGS: z.number().int().optional().nullable(),
  MaSoDV: z.number().int().optional().nullable()
});
export function validateCreateNhanVien(data) {
  return createNhanVienSchema.parse(data);
}
