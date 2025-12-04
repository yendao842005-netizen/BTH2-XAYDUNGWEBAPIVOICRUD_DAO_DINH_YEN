import { pool } from "../config/database.js";
import { logger } from "../config/logger.js";

export const DuAnRepository = {
  getAll: async () => {
    logger.info("Repository: Fetching all DuAn");
    try {
      const db = await pool;
      const [rows] = await db.query("SELECT * FROM DuAn");
      return rows;
    } catch (err) {
      logger.error("Repository Error: getAll failed", err);
      throw err;
    }
  },


  getByMaDA: async (MaDA) => {
    logger.info(`Repository: Fetching DuAn with ID ${MaDA}`);
    try {
      const db = await pool;
      const [rows] = await db.query("SELECT * FROM DuAn WHERE MaDA = ?", [MaDA]);
      return rows[0];
    } catch (err) {
      logger.error(`Repository Error: getByMaDA failed for ID ${MaDA}`, err);
      throw err;
    }
  },






  create: async ({ MaDA, TenDA, DiaDiemDA, MaSoDV}) => {
    logger.info(`Repository: Creating DuAn ${MaDA}`);
    try {
      const db = await pool;
      await db.query(
        "INSERT INTO DuAn ( MaDA, TenDA, DiaDiemDA, MaSoDV) VALUES (?, ?, ?, ?)",
        [ MaDA, TenDA, DiaDiemDA, MaSoDV]
      );
      return {  MaDA, TenDA, DiaDiemDA, MaSoDV };
    } catch (err) {
      logger.error("Repository Error: create failed", err);
      throw err;
    }
  }, 

  update: async (MaDA, { TenDA, DiaDiemDA, MaSoDV }) => {
    logger.info(`Repository: Updating DuAn ${MaDA}`);
    try {
      const db = await pool;
      await db.query(
        "UPDATE DuAn SET TenDA = ?, TenDA = ?,MaSoDV = ? WHERE MaDA = ?",
        [TenDA, DiaDiemDA, MaSoDV ,MaDA]
      );
      return {MaDA, TenDA, DiaDiemDA, MaSoDV  };
    } catch (err) {
      logger.error(`Repository Error: update failed for ID ${MaDA}`, err);
      throw err;
    }
  },

  delete: async (MaDA) => {
    logger.info(`Repository: Deleting DuAn ${MaDA}`);
    try {
      const db = await pool;
      await db.query("DELETE FROM DuAn WHERE MaDA = ?", [MaDA]);
      return true;
    } catch (err) {
      logger.error(`Repository Error: delete failed for ID ${MaDA}`, err);
      throw err;
    }
  },
};
