import { z } from "zod";

export const updateLoaiHangSchema = z.object({
  
  MaLoai: z.number({ required_error: "MaLoai is required" }).int(),
  TenLoai: z.string({ required_error: "TenLoai is required" }).max(100),
    MoTa: z.string({ required_error: "MoTa is required" }).max(255)

});
export function validateUpdateLoaiHang(data) {
  return updateLoaiHangSchema.parse(data);
}
