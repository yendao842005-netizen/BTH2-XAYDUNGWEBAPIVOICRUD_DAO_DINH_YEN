import { z } from "zod";

export const createSanPhamSchema = z.object({
  Ma: z.number({ required_error: "MA is required" }).int(),
  Ten: z.string({ required_error: "TEN is required" }).max(250),
  DonGia: z.number({ required_error: "TenLoai is required" }).min(0),
  MaDanhMuc: z.number({ required_error: "MADANHMUC is required" }).int(),
});

export function validateCreateSanPham(data) {
  return createSanPhamSchema.parse(data);
}
