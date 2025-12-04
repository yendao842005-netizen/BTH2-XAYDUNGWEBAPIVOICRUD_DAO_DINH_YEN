import { pool } from "../config/database.js";
import { logger } from "../config/logger.js";

export const DonViRepository = {
  getAll: async () => {
    logger.info("Repository: Fetching all DonVi");
    try {
      const db = await pool;
      const [rows] = await db.query("SELECT * FROM DonVi");
      return rows;
    } catch (err) {
      logger.error("Repository Error: getAll failed", err);
      throw err;
    }
  },


  getByMaSoDV: async (MaSoDV) => {
    logger.info(`Repository: Fetching DonVi with ID ${MaSoDV}`);
    try {
      const db = await pool;
      const [rows] = await db.query("SELECT * FROM DonVi WHERE MaSoDV = ?", [MaSoDV]);
      return rows[0];
    } catch (err) {
      logger.error(`Repository Error: getByMaSoDV failed for ID ${MaSoDV}`, err);
      throw err;
    }
  },






  create: async ({ MaSoDV, TenDV, MaSoNQL, NgayBatDau}) => {
    logger.info(`Repository: Creating DonVi ${MaSoDV}`);
    try {
      const db = await pool;
      await db.query(
        "INSERT INTO DonVi ( MaSoDV, TenDV, MaSoNQL, NgayBatDau) VALUES (?, ?, ?, ?)",
        [ MaSoDV, TenDV, MaSoNQL, NgayBatDau]
      );
      return {  MaSoDV, TenDV, MaSoNQL, NgayBatDau };
    } catch (err) {
      logger.error("Repository Error: create failed", err);
      throw err;
    }
  }, 

  update: async (MaSoDV, {  TenDV, MaSoNQL, NgayBatDau }) => {
    logger.info(`Repository: Updating DonVi ${MaSoDV}`);
    try {
      const db = await pool;
      await db.query(
        "UPDATE DonVi SET TenDV = ?, MaSoNQL = ?, NgayBatDau = ? WHERE MaSoDV = ?",
        [TenDV, MaSoNQL, NgayBatDau,MaSoDV]
      );
      return {MaSoDV, TenDV, MaSoNQL, NgayBatDau };
    } catch (err) {
      logger.error(`Repository Error: update failed for ID ${MaSoDV}`, err);
      throw err;
    }
  },

  delete: async (MaSoDV) => {
    logger.info(`Repository: Deleting DonVi ${MaSoDV}`);
    try {
      const db = await pool;
      await db.query("DELETE FROM DonVi WHERE MaSoDV = ?", [MaSoDV]);
      return true;
    } catch (err) {
      logger.error(`Repository Error: delete failed for ID ${MaSoDV}`, err);
      throw err;
    }
  },
};
