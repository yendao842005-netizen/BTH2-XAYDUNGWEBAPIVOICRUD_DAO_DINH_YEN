import { z } from "zod";

export const updateSanPhamSchema = z.object({
  
  Ten: z.string({ required_error: "TEN is required" }).max(250),
  DonGia: z.number({ required_error: "TenLoai is required" }).min(0),
  MaDanhMuc: z.number({ required_error: "MADANHMUC is required" }).int(),
});

export function validateUpdateSanPham(data) {
  return updateSanPhamSchema.parse(data);
}
