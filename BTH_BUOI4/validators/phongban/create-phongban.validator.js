import { z } from "zod";

export const createPhongBanSchema = z.object({
  MAPB: z.string({ required_error: "MAPB is required" }).length(4),
  TENPB: z.string({ required_error: "TENPB is required" }).max(50),
});

export function validateCreatePhongBan(data) {
  return createPhongBanSchema.parse(data);
}
