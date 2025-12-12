import { z } from "zod";

export const createNhanVienSchema = z.object({
  MANV: z.string({ required_error: "MAN is required" }).length(4),
  HOTEN: z.string({ required_error: "HOTEN is required" }).max(50),
  NGAYSINH: z.string({ required_error: "NGAYSINH is required" }).refine(
    (val) => !isNaN(Date.parse(val)),
    { message: "Invalid date format" }
  ),
  PHAI: z.enum(['Nam', 'Nữ'], { required_error: "PHAI is required" }),
  DIACHI: z.string({ required_error: "DIACHI is required" }).max(100),
  MAPB: z.string({ required_error: "MAPB is required" }).length(4),
});

export function validateCreateNhanVien(data) {
  return createNhanVienSchema.parse(data);
}
