import { pool } from "../config/database.js";
import { logger } from "../config/logger.js";

export const PhongBanRepository = {
  getAll: async () => {
    logger.info("Repository: Fetching all PhongBan");
    try {
      const db = await pool;
      const [rows] = await db.query("SELECT * FROM PhongBan");
      return rows;
    } catch (err) {
      logger.error("Repository Error: getAll failed", err);
      throw err;
    }
  },

  getByMAPB: async (MAPB) => {
    logger.info(`Repository: Fetching PhongBan with MAPB ${MAPB}`);
    try {
      const db = await pool;
      const [rows] = await db.query("SELECT * from PhongBan WHERE MAPB = ?", [MAPB]);
      return rows[0];
    } catch (err) {
      logger.error(`Repository Error: getByMAPB failed for MAPB ${MAPB}`, err);
      throw err;
    }
  },

  

  create: async ({ MAPB, TENPB }) => {
    logger.info(`Repository: Creating PhongBan ${MAPB}`);
    try {
      const db = await pool;
      await db.query(
        "INSERT INTO PhongBan (MAPB, TENPB) VALUES (?, ?)",
        [MAPB, TENPB]
      );
      return { MAPB, TENPB };
    } catch (err) {
      logger.error("Repository Error: create failed", err);
      throw err;
    }
  },

  update: async (MAPB, { TENPB}) => {
    logger.info(`Repository: Updating PhongBan ${MAPB}`);
    try {
      const db = await pool;
      await db.query(
        "UPDATE PhongBan SET TENPB = ? WHERE MAPB = ?",
        [TENPB, MAPB]
      );
      return { MAPB, TENPB };
    } catch (err) {
      logger.error(`Repository Error: update failed for MAPB ${MAPB}`, err);
      throw err;
    }
  },

  delete: async (MAPB) => {
    logger.info(`Repository: Deleting PhongBan ${MAPB}`);
    try {
      const db = await pool;
      await db.query("DELETE FROM PhongBan WHERE MAPB = ?", [MAPB]);
      return true;
    } catch (err) {
      logger.error(`Repository Error: delete failed for MAPB ${MAPB}`, err);
      throw err;
    }
  },
};
