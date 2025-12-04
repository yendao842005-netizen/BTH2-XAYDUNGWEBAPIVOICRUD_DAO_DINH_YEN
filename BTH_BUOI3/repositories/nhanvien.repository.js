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


  getByMaSoNV: async (MaSoNV) => {
    logger.info(`Repository: Fetching NhanVien with ID ${MaSoNV}`);
    try {
      const db = await pool;
      const [rows] = await db.query("SELECT * FROM NhanVien WHERE MaSoNV = ?", [MaSoNV]);
      return rows[0];
    } catch (err) {
      logger.error(`Repository Error: getByMaSoNV failed for ID ${MaSoNV}`, err);
      throw err;
    }
  },






  create: async ({ MaSoNV, HoDem, Ten, NgaySinh, DiaChi, Luong, GioiTinh, MaSoNGS, MaSoD}) => {
    logger.info(`Repository: Creating NhanVien ${MaSoNV}`);
    try {
      const db = await pool;
      await db.query(
        "INSERT INTO NhanVien ( MaSoNV, HoDem, Ten, NgaySinh, DiaChi, Luong, GioiTinh, MaSoNGS, MaSoD) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [ MaSoNV, HoDem, Ten, NgaySinh, DiaChi, Luong, GioiTinh, MaSoNGS, MaSoD]
      );
      return {  MaSoNV, HoDem, Ten, NgaySinh, DiaChi, Luong, GioiTinh, MaSoNGS, MaSoD };
    } catch (err) {
      logger.error("Repository Error: create failed", err);
      throw err;
    }
  }, 

  update: async (MaSoNV, {  HoDem, Ten, NgaySinh, DiaChi, Luong, GioiTinh, MaSoNGS, MaSoD }) => {
    logger.info(`Repository: Updating NhanVien ${MaSoNV}`);
    try {
      const db = await pool;
      await db.query(
        "UPDATE NhanVien SET HoDem = ?, Ten = ?,NgaySinh = ?, DiaChi = ?,Luong = ?, GioiTinh = ?,MaSoNGS = ?, MaSoD = ? WHERE MaSoNV = ?",
        [ HoDem, Ten, NgaySinh, DiaChi, Luong, GioiTinh, MaSoNGS, MaSoD ,MaSoNV]
      );
      return {MaSoNV, HoDem, Ten, NgaySinh, DiaChi, Luong, GioiTinh, MaSoNGS, MaSoD };
    } catch (err) {
      logger.error(`Repository Error: update failed for ID ${MaSoNV}`, err);
      throw err;
    }
  },

  delete: async (MaSoNV) => {
    logger.info(`Repository: Deleting NhanVien ${MaSoNV}`);
    try {
      const db = await pool;
      await db.query("DELETE FROM NhanVien WHERE MaSoNV = ?", [MaSoNV]);
      return true;
    } catch (err) {
      logger.error(`Repository Error: delete failed for ID ${MaSoNV}`, err);
      throw err;
    }
  },
};
