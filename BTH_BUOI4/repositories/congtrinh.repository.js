import { pool } from "../config/database.js";
import { logger } from "../config/logger.js";

export const CongTrinhRepository = {
  getAll: async () => {
    logger.info("Repository: Fetching all CongTrinh");
    try {
      const db = await pool;
      const [rows] = await db.query("SELECT * FROM CongTrinh");
      return rows;
    } catch (err) {
      logger.error("Repository Error: getAll failed", err);
      throw err;
    }
  },

  getByMACT: async (MACT) => {
    logger.info(`Repository: Fetching CongTrinh with MACT ${MACT}`);
    try {
      const db = await pool;
      const [rows] = await db.query("SELECT * from CongTrinh WHERE MACT = ?", [MACT]);
      return rows[0];
    } catch (err) {
      logger.error(`Repository Error: getByMACT failed for MACT ${MACT}`, err);
      throw err;
    }
  },

  

  create: async ({ MACT,  TENCT, DIADIEM, NGAYCAPGP, NGAYKC }) => {
    logger.info(`Repository: Creating CongTrinh ${MACT}`);
    try {
      const db = await pool;
      await db.query(
        "INSERT INTO CongTrinh (MACT,  TENCT, DIADIEM, NGAYCAPGP, NGAYKC) VALUES (?, ?, ?, ?, ?)",
        [MACT, TENCT, DIADIEM, NGAYCAPGP, NGAYKC]
      );
      return { MACT, TENCT, DIADIEM, NGAYCAPGP, NGAYKC};
    } catch (err) {
      logger.error("Repository Error: create failed", err);
      throw err;
    }
  },

  update: async (MACT, {  TENCT, DIADIEM, NGAYCAPGP, NGAYKC}) => {
    logger.info(`Repository: Updating CongTrinh ${MACT}`);
    try {
      const db = await pool;
      await db.query(
        "UPDATE CongTrinh SET TENCT = ?,DIADIEM = ?,NGAYCAPGP = ?,NGAYKC = ? WHERE MACT = ?",
        [TENCT, DIADIEM, NGAYCAPGP, NGAYKC, MACT]
      );
      return { MACT,  TENCT, DIADIEM, NGAYCAPGP, NGAYKC};
    } catch (err) {
      logger.error(`Repository Error: update failed for MACT ${MACT}`, err);
      throw err;
    }
  },

  delete: async (MACT) => {
    logger.info(`Repository: Deleting CongTrinh ${MACT}`);
    try {
      const db = await pool;
      await db.query("DELETE FROM CongTrinh WHERE MACT = ?", [MACT]);
      return true;
    } catch (err) {
      logger.error(`Repository Error: delete failed for MACT ${MACT}`, err);
      throw err;
    }
  },
};
