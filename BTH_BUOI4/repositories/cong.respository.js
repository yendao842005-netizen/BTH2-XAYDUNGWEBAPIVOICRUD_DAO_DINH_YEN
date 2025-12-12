import { pool } from "../config/database.js";
import { logger } from "../config/logger.js";

export const CongRepository = {
  getAll: async () => {
    logger.info("Repository: Fetching all Cong");
    try {
      const db = await pool;
      const [rows] = await db.query("SELECT * FROM Cong");
      return rows;
    } catch (err) {
      logger.error("Repository Error: getAll failed", err);
      throw err;
    }
  },

  getBySLNGAYCONG: async (SLNGAYCONG) => {
    logger.info(`Repository: Fetching Cong with SLNGAYCONG ${SLNGAYCONG}`);
    try {
      const db = await pool;
      const [rows] = await db.query("SELECT * from Cong WHERE SLNGAYCONG = ?", [SLNGAYCONG]);
      return rows[0];
    } catch (err) {
      logger.error(`Repository Error: getBySLNGAYCONG failed for SLNGAYCONG ${SLNGAYCONG}`, err);
      throw err;
    }
  },

  

  create: async ({ SLNGAYCONG,  MANV, MACT }) => {
    logger.info(`Repository: Creating Cong ${SLNGAYCONG}`);
    try {
      const db = await pool;
      await db.query(
        "INSERT INTO Cong (SLNGAYCONG,  MANV, MACT) VALUES (?, ?, ?)",
        [SLNGAYCONG, MANV, MACT]
      );
      return { SLNGAYCONG, MANV, MACT};
    } catch (err) {
      logger.error("Repository Error: create failed", err);
      throw err;
    }
  },

  update: async (SLNGAYCONG, {  MANV, MACT}) => {
    logger.info(`Repository: Updating Cong ${SLNGAYCONG}`);
    try {
      const db = await pool;
      await db.query(
        "UPDATE Cong SET MANV = ?,MACT = ? WHERE SLNGAYCONG = ?",
        [MANV, MACT, SLNGAYCONG]
      );
      return { SLNGAYCONG,  MANV, MACT};
    } catch (err) {
      logger.error(`Repository Error: update failed for SLNGAYCONG ${SLNGAYCONG}`, err);
      throw err;
    }
  },

  delete: async (SLNGAYCONG) => {
    logger.info(`Repository: Deleting Cong ${SLNGAYCONG}`);
    try {
      const db = await pool;
      await db.query("DELETE FROM Cong WHERE SLNGAYCONG = ?", [SLNGAYCONG]);
      return true;
    } catch (err) {
      logger.error(`Repository Error: delete failed for SLNGAYCONG ${SLNGAYCONG}`, err);
      throw err;
    }
  },
};
