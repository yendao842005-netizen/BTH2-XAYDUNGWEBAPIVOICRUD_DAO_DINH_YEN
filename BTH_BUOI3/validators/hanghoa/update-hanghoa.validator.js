import { z } from "zod";

export const updateHangHoaSchema = z.object({
  
  MaLoai: z.number({ required_error: "MaLoai is required" }).int(),
  TenHang: z.string({ required_error: "TenHang is required" }).max(100),

  SoLuong: z.number().int().min(1, "SoLuong must be > 0"),

  SoLuongCon: z.number().int().min(0, "SoLuongCon must be >= 0")
}).refine(data => data.SoLuongCon <= data.SoLuong, {
  message: "SoLuongCon must be <= SoLuong",
  path: ["SoLuongCon"]
});

export function validateUpdateHangHoa(data) {
  return updateHangHoaSchema.parse(data);
}
