import { pool } from "../config/database.js";
import { logger } from "../config/logger.js";

export const LoaiHangRepository = {
  getAll: async () => {
    logger.info("Repository: Fetching all LoaiHang");
    try {
      const db = await pool;
      const [rows] = await db.query("SELECT * FROM LoaiHang");
      return rows;
    } catch (err) {
      logger.error("Repository Error: getAll failed", err);
      throw err;
    }
  },


  getByMaloai: async (Maloai) => {
    logger.info(`Repository: Fetching LoaiHang with ID ${Maloai}`);
    try {
      const db = await pool;
      const [rows] = await db.query("SELECT * FROM LoaiHang WHERE Maloai = ?", [Maloai]);
      return rows[0];
    } catch (err) {
      logger.error(`Repository Error: getByMaloai failed for ID ${Maloai}`, err);
      throw err;
    }
  },






  create: async ({ MaLoai, TenLoai, MoTa}) => {
    logger.info(`Repository: Creating LoaiHang ${MaLoai}`);
    try {
      const db = await pool;
      await db.query(
        "INSERT INTO LoaiHang ( MaLoai, TenLoai, MoTa) VALUES (?, ?, ?)",
        [ MaLoai, TenLoai, MoTa]
      );
      return {  MaLoai, TenLoai, MoTa };
    } catch (err) {
      logger.error("Repository Error: create failed", err);
      throw err;
    }
  }, 

  update: async (MaLoai, { TenLoai, MoTa }) => {
    logger.info(`Repository: Updating LoaiHang ${MaLoai}`);
    try {
      const db = await pool;
      await db.query(
        "UPDATE LoaiHang SET TenLoai = ?, MoTa = ? WHERE MaLoai = ?",
        [TenLoai, MoTa ,MaLoai]
      );
      return {MaLoai, TenLoai, MoTa  };
    } catch (err) {
      logger.error(`Repository Error: update failed for ID ${MaLoai}`, err);
      throw err;
    }
  },

  delete: async (MaLoai) => {
    logger.info(`Repository: Deleting LoaiHang ${MaLoai}`);
    try {
      const db = await pool;
      await db.query("DELETE FROM LoaiHang WHERE MaLoai = ?", [MaLoai]);
      return true;
    } catch (err) {
      logger.error(`Repository Error: delete failed for ID ${MaLoai}`, err);
      throw err;
    }
  },
};
