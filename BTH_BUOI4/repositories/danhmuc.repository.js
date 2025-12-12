import { pool } from "../config/database.js";
import { logger } from "../config/logger.js";

export const DanhMucRepository = {
  getAll: async () => {
    logger.info("Repository: Fetching all DanhMucs");
    try {
      const db = await pool;
      const [rows] = await db.query("SELECT * FROM DanhMuc");
      return rows;
    } catch (err) {
      logger.error("Repository Error: getAll failed", err);
      throw err;
    }
  },

  getByMaDanhMuc: async (MaDanhMuc) => {
    logger.info(`Repository: Fetching DanhMuc with MaDanhMuc ${MaDanhMuc}`);
    try {
      const db = await pool;
      const [rows] = await db.query("SELECT * FROM DanhMuc WHERE MaDanhMuc = ?", [MaDanhMuc]);
      return rows[0];
    } catch (err) {
      logger.error(`Repository Error: getByMaDanhMuc failed for MaDanhMuc ${MaDanhMuc}`, err);
      throw err;
    }
  },

  create: async ({ MaDanhMuc, TenDanhMuc }) => {
    logger.info(`Repository: Creating DanhMuc ${email}`);
    try {
      const db = await pool;
      await db.query(
        "INSERT INTO DanhMuc (MaDanhMuc, TenDanhMuc) VALUES (?, ?)",
        [MaDanhMuc, TenDanhMuc]
      );
      return { MaDanhMuc, TenDanhMuc };
    } catch (err) {
      logger.error("Repository Error: create failed", err);
      throw err;
    }
  },

  update: async (MaDanhMuc, {  TenDanhMuc}) => {
    logger.info(`Repository: Updating DanhMuc ${MaDanhMuc}`);
    try {
      const db = await pool;
      await db.query(
        "UPDATE DanhMuc SET TenDanhMuc = ? WHERE MaDanhMuc = ?",
        [TenDanhMuc, MaDanhMuc]
      );
      return { MaDanhMuc, TenDanhMuc };
    } catch (err) {
      logger.error(`Repository Error: update failed for MaDanhMuc ${MaDanhMuc}`, err);
      throw err;
    }
  },

  delete: async (MaDanhMuc) => {
    logger.info(`Repository: Deleting DanhMuc ${MaDanhMuc}`);
    try {
      const db = await pool;
      await db.query("DELETE FROM DanhMuc WHERE MaDanhMuc = ?", [MaDanhMuc]);
      return true;
    } catch (err) {
      logger.error(`Repository Error: delete failed for MaDanhMuc ${MaDanhMuc}`, err);
      throw err;
    }
  },
};
