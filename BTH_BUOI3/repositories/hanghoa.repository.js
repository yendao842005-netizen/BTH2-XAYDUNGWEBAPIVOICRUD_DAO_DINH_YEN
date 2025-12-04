import { pool } from "../config/database.js";
import { logger } from "../config/logger.js";

export const HangHoaRepository = {
  getAll: async () => {
    logger.info("Repository: Fetching all HangHoa");
    try {
      const db = await pool;
      const [rows] = await db.query("SELECT * FROM HangHoa");
      return rows;
    } catch (err) {
      logger.error("Repository Error: getAll failed", err);
      throw err;
    }
  },

    getByMahang: async (Mahang) => {
    logger.info(`Repository: Fetching HangHoa with ID ${Mahang}`);
    try {
      const db = await pool;
      const [rows] = await db.query("SELECT * FROM HangHoa WHERE MaHang = ?", [Mahang]);
      return rows[0];
    } catch (err) {
      logger.error(`Repository Error: getByMaHang failed for ID ${MaHang}`, err);
      throw err;
    }
  },

  getByMaloai: async (Maloai) => {
    logger.info(`Repository: Fetching HangHoa with ID ${Maloai}`);
    try {
      const db = await pool;
      const [rows] = await db.query("SELECT * FROM HangHoa WHERE Maloai = ?", [Maloai]);
      return rows[0];
    } catch (err) {
      logger.error(`Repository Error: getByMaloai failed for ID ${Maloai}`, err);
      throw err;
    }
  },

  //Get cac hang hoa theo ten loai 
  getByTenloai: async (Tenloai) => {
    logger.info(`Repository: Fetching HangHoa with Name ${Tenloai}`);
    try {
      const db = await pool;
      const [rows] = await db.query("select * from HangHoa inner join loaihang on HangHoa.MaLoai = loaihang.MaLoai where loaihang.TenLoai = ?", [Tenloai]);
      return rows;
    } catch (err) {
      logger.error(`Repository Error: getByTenloai failed for Name ${Tenloai}`, err);
      throw err;
    }
  },

  //Get cac hang hoa sap het so luong con < 150
  getSapHetHang: async () => {
    logger.info(`Repository: Fetching HangHoa sap het hang`);
    try {
      const db = await pool;
      const [rows] = await db.query("SELECT * FROM HangHoa where SoLuongCon < 150");
      return rows;
    }
    catch (err) {
      logger.error(`Repository Error: getSapHetHang failed`, err);
      throw err;
    }
  },

  //get thong tin GiaBan cua HangHoa co MaHang vao thoi diem hien tai
  getGiaBanByMaHang: async (MaHang) => {
    logger.info(`Repository: Fetching GiaBan for HangHoa with MaHang ${MaHang}`);
    try {
      const db = await pool;
      const [rows] = await db.query("select * from HangHoa inner join GiaBan on HangHoa.MaHang = GiaBan.MaHang where HangHoa.MaHang = ?", [MaHang]);
      return rows;
    } catch (err) {
      logger.error(`Repository Error: getGiaBanByMaHang failed for MaHang ${MaHang}`, err);
      throw err;
    }
  },

  //Get thong tin cua cac hang hoa co gia ban trong khoang gban min den gban max
  getGiaBanminmax: async (gban_min, gban_max) => {
    logger.info(`Repository: Fetching HangHoa with GiaBan between ${gban_min} and ${gban_max}`);
    try {
      const db = await pool;
      const [rows] = await db.query("select * from HangHoa inner join GiaBan on HangHoa.MaHang = GiaBan.MaHang where GiaBan.Gia between ? and ?", [gban_min, gban_max]);
      return rows;
    } catch (err) {
      logger.error(`Repository Error: getGiaBanminmax failed for range ${gban_min} - ${gban_max}`, err);
      throw err;
    }
  },

  //Lay toan bo thong tin gia ban theo ma hang
  getGiaBanByMaHangAll: async (MaHang) => {
    logger.info(`Repository: Fetching all GiaBan for HangHoa with MaHang ${MaHang}`);
    try {
      const db = await pool;
      const [rows] = await db.query("select * from GiaBan inner join HangHoa on GiaBan.MaHang = HangHoa.MaHang where HangHoa.MaHang = ?", [MaHang]);
      return rows;
    } catch (err) {
      logger.error(`Repository Error: getGiaBanByMaHangAll failed for MaHang ${MaHang}`, err);
      throw err;
    }
  },

  create: async ({ MaHang, MaLoai, TenHang, SoLuong ,SoLuongCon}) => {
    logger.info(`Repository: Creating HangHoa ${MaHang}`);
    try {
      const db = await pool;
      await db.query(
        "INSERT INTO HangHoa ( MaHang, MaLoai, TenHang, SoLuong ,SoLuongCon) VALUES (?, ?, ?, ?, ?)",
        [ MaHang, MaLoai, TenHang, SoLuong ,SoLuongCon]
      );
      return {  MaHang, MaLoai, TenHang, SoLuong ,SoLuongCon };
    } catch (err) {
      logger.error("Repository Error: create failed", err);
      throw err;
    }
  }, 

  update: async (MaHang, { MaLoai, TenHang, SoLuong ,SoLuongCon }) => {
    logger.info(`Repository: Updating HangHoa ${MaHang}`);
    try {
      const db = await pool;
      await db.query(
        "UPDATE HangHoa SET MaLoai = ?, TenHang = ?, SoLuong = ?, SoLuongCon = ? WHERE MaHang = ?",
        [MaLoai, TenHang, SoLuong ,SoLuongCon,MaHang]
      );
      return { MaHang, MaLoai, TenHang, SoLuong ,SoLuongCon };
    } catch (err) {
      logger.error(`Repository Error: update failed for ID ${MaHang}`, err);
      throw err;
    }
  },

  delete: async (MaHang) => {
    logger.info(`Repository: Deleting HangHoa ${MaHang}`);
    try {
      const db = await pool;
      await db.query("DELETE FROM HangHoa WHERE MaHang = ?", [MaHang]);
      return true;
    } catch (err) {
      logger.error(`Repository Error: delete failed for ID ${MaHang}`, err);
      throw err;
    }
  },
};
