import { pool } from "../config/database.js";
import { logger } from "../config/logger.js";

export const NhanVienRepository = {
  getAll: async () => {
    logger.info("Repository: Fetching all NhanVien");
    try {
      const db = await pool;
      const [rows] = await db.query("SELECT * FROM NhanVien");
      return rows;
    } catch (err) {
      logger.error("Repository Error: getAll failed", err);
      throw err;
    }
  },

  getByMANV: async (MANV) => {
    logger.info(`Repository: Fetching NhanVien with MANV ${MANV}`);
    try {
      const db = await pool;
      const [rows] = await db.query("SELECT * from NhanVien WHERE MANV = ?", [MANV]);
      return rows[0];
    } catch (err) {
      logger.error(`Repository Error: getByMANV failed for MANV ${MANV}`, err);
      throw err;
    }
  },

  

  create: async ({ MANV,  HOTEN, NGAYSINH, PHAI, DIACHI, MAPB }) => {
    logger.info(`Repository: Creating NhanVien ${MANV}`);
    try {
      const db = await pool;
      await db.query(
        "INSERT INTO NhanVien (MANV,  HOTEN, NGAYSINH, PHAI, DIACHI, MAPB) VALUES (?, ?, ?, ?, ?, ?)",
        [MANV, HOTEN, NGAYSINH, PHAI, DIACHI, MAPB]
      );
      return { MANV, HOTEN, NGAYSINH, PHAI, DIACHI, MAPB };
    } catch (err) {
      logger.error("Repository Error: create failed", err);
      throw err;
    }
  },

  update: async (MANV, { HOTEN, NGAYSINH, PHAI, DIACHI, MAPB}) => {
    logger.info(`Repository: Updating NhanVien ${MANV}`);
    try {
      const db = await pool;
      await db.query(
        "UPDATE NhanVien SET HOTEN = ?,NGAYSINH = ?,PHAI = ?,DIACHI = ?,MAPB = ? WHERE MANV = ?",
        [HOTEN, NGAYSINH, PHAI, DIACHI, MAPB, MANV]
      );
      return { MANV, HOTEN, NGAYSINH, PHAI, DIACHI, MAPB};
    } catch (err) {
      logger.error(`Repository Error: update failed for MANV ${MANV}`, err);
      throw err;
    }
  },

  delete: async (MANV) => {
    logger.info(`Repository: Deleting NhanVien ${MANV}`);
    try {
      const db = await pool;
      await db.query("DELETE FROM NhanVien WHERE MANV = ?", [MANV]);
      return true;
    } catch (err) {
      logger.error(`Repository Error: delete failed for MANV ${MANV}`, err);
      throw err;
    }
  },
};
