import { z } from "zod";

export const createDanhMucSchema = z.object({
  MaDanhMuc: z.number({ required_error: "MaDanhMuc is required" }).int(),
  TenDanhMuc: z.string({ required_error: "TenDanhMuc is required" }).max(250),
  
});

export function validateCreateDanhMuc(data) {
  return createDanhMucSchema.parse(data);
}
