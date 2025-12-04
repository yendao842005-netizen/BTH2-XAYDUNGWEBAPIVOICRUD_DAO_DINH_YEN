import { z } from "zod";

export const createGiaBanSchema = z.object({
  MaGB: z.number({ required_error: "MaLoai is required" }).int(),
MaHang: z.number({ required_error: "MaLoai is required" }).int(),

    Gia: z.number({ required_error: "TenLoai is required" }).min(0),
    DVTinh: z.string({ required_error: "MoTa is required" }).max(50),
    NgayBD: z.string({ required_error: "MoTa is required" }).max(10),
    NgayKT: z.string({ required_error: "MoTa is required" }).max(10)
})


export function validateCreateGiaBan(data) {
  return createGiaBanSchema.parse(data);
}