import { pool } from "../config/database.js";
import { logger } from "../config/logger.js";

export const SanPhamRepository = {
  getAll: async () => {
    logger.info("Repository: Fetching all SanPhams");
    try {
      const db = await pool;
      const [rows] = await db.query("SELECT * FROM SanPham");
      return rows;
    } catch (err) {
      logger.error("Repository Error: getAll failed", err);
      throw err;
    }
  },

  getByMa: async (Ma) => {
    logger.info(`Repository: Fetching SanPham with Ma ${Ma}`);
    try {
      const db = await pool;
      const [rows] = await db.query("SELECT sp.Ma,sp.Ten,sp.DonGia,dm.MaDanhMuc,dm.TenDanhMuc FROM SanPham sp JOIN DanhMuc dm ON sp.MaDanhMuc = dm.MaDanhMuc WHERE sp.Ma = ?", [Ma]);
      return rows[0];
    } catch (err) {
      logger.error(`Repository Error: getByMa failed for Ma ${Ma}`, err);
      throw err;
    }
  },

  getByTen: async (Ten) => {
    logger.info(`Repository: Fetching SanPham with Ma ${Ten}`);
    try {
      const db = await pool;
      const [rows] = await db.query( "SELECT * FROM SanPham WHERE Ten LIKE ?",[`%${Ten}%`]);
      return rows[0];
    } catch (err) {
      logger.error(`Repository Error: getByTen failed for Ma ${Ten}`, err);
      throw err;
    }
  },

    getSXDonGia: async (sl,kieusx,trang) => {
    logger.info(`Repository: Fetching SanPham with sl ${sl}`);
    try {
      const db = await pool;
      if(kieusx === 'DESC')
      {
        const [rows] = await db.query( "select * from SanPham order by DonGia DESC limit ? offset ?;",[sl,(trang -1) * sl]);
        return rows;
      }
      else
        {
        const [rows] = await db.query( "select * from SanPham order by DonGia ASC limit ? offset ?;",[sl,(trang -1) * sl]);
        return rows;
      }
      
    } catch (err) {
      logger.error(`Repository Error: getByTen failed for sl ${Ten}`, err);
      throw err;
    }
  },

  Thongketheodanhmuc: async () => {
    logger.info(`Repository: Fetching SanPham with Ma `);
    try {
      const db = await pool;
      const [rows] = await db.query( "SELECT dm.MaDanhMuc, dm.TenDanhMuc, COUNT(sp.Ma) AS SoLuongSanPham FROM DanhMuc dm LEFT JOIN SanPham sp ON dm.MaDanhMuc = sp.MaDanhMuc GROUP BY dm.MaDanhMuc, dm.TenDanhMuc;");
      return rows;
    } catch (err) {
      logger.error(`Repository Error: getByTen failed for Ma`, err);
      throw err;
    }
  },

  

  create: async ({ Ma, Ten, DonGia, MaDanhMuc }) => {
    logger.info(`Repository: Creating SanPham ${Ma}`);
    try {
      const db = await pool;
      await db.query(
        "INSERT INTO SanPham (Ma, Ten, DonGia, MaDanhMuc) VALUES (?, ?, ?, ?)",
        [Ma, Ten, DonGia, MaDanhMuc]
      );
      return { Ma, Ten, DonGia, MaDanhMuc };
    } catch (err) {
      logger.error("Repository Error: create failed", err);
      throw err;
    }
  },

  update: async (Ma, {Ten, DonGia, MaDanhMuc}) => {
    logger.info(`Repository: Updating SanPham ${Ma}`);
    try {
      const db = await pool;
      await db.query(
        "UPDATE SanPham SET Ten = ?, DonGia = ?, MaDanhMuc = ? WHERE Ma = ?",
        [Ten, DonGia, MaDanhMuc, Ma]
      );
      return { Ma, Ten, DonGia, MaDanhMuc };
    } catch (err) {
      logger.error(`Repository Error: update failed for Ma ${Ma}`, err);
      throw err;
    }
  },

  delete: async (Ma) => {
    logger.info(`Repository: Deleting SanPham ${Ma}`);
    try {
      const db = await pool;
      await db.query("DELETE FROM SanPham WHERE Ma = ?", [Ma]);
      return true;
    } catch (err) {
      logger.error(`Repository Error: delete failed for Ma ${Ma}`, err);
      throw err;
    }
  },
};
