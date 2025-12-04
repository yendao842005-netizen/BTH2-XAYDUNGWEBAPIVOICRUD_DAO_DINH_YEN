import { pool } from "../config/database.js";
import { logger } from "../config/logger.js";

export const GiaBanRepository = {
  getAll: async () => {
    logger.info("Repository: Fetching all GiaBan");
    try {
      const db = await pool;
      const [rows] = await db.query("SELECT * FROM GiaBan");
      return rows;
    } catch (err) {
      logger.error("Repository Error: getAll failed", err);
      throw err;
    }
  },


  getByMaGB: async (MaGB) => {
    logger.info(`Repository: Fetching GiaBan with ID ${MaGB}`);
    try {
      const db = await pool;
      const [rows] = await db.query("SELECT * FROM GiaBan WHERE MaGB = ?", [MaGB]);
      return rows[0];
    } catch (err) {
      logger.error(`Repository Error: getByMaGB failed for ID ${MaGB}`, err);
      throw err;
    }
  },






  create: async ({  MaGB, MaHang, Gia, DVTinh ,NgayBD, NgayKT}) => {
    logger.info(`Repository: Creating GiaBan ${MaGB}`);
    try {
      const db = await pool;
      await db.query(
        "INSERT INTO GiaBan (  MaGB, MaHang, Gia, DVTinh ,NgayBD, NgayKT) VALUES (?, ?, ?, ?, ?, ?)",
        [  MaGB, MaHang, Gia, DVTinh ,NgayBD, NgayKT]
      );
      return {   MaGB, MaHang, Gia, DVTinh ,NgayBD, NgayKT };
    } catch (err) {
      logger.error("Repository Error: create failed", err);
      throw err;
    }
  }, 

  update: async (MaGB, {   MaHang, Gia, DVTinh ,NgayBD, NgayKT}) => {
    logger.info(`Repository: Updating GiaBan ${MaGB}`);
    try {
      const db = await pool;
      await db.query(
        "UPDATE GiaBan SET MaHang = ?, Gia = ?, DVTinh = ?,NgayBD = ?,NgayKT = ?   WHERE MaGB = ?",
        [  MaHang, Gia, DVTinh ,NgayBD, NgayKT,MaGB]
      );
      return {MaGB, MaHang, Gia, DVTinh ,NgayBD, NgayKT  };
    } catch (err) {
      logger.error(`Repository Error: update failed for ID ${MaGB}`, err);
      throw err;
    }
  },

  delete: async (MaGB) => {
    logger.info(`Repository: Deleting GiaBan ${MaGB}`);
    try {
      const db = await pool;
      await db.query("DELETE FROM GiaBan WHERE MaGB = ?", [MaGB]);
      return true;
    } catch (err) {
      logger.error(`Repository Error: delete failed for ID ${MaGB}`, err);
      throw err;
    }
  },
};
