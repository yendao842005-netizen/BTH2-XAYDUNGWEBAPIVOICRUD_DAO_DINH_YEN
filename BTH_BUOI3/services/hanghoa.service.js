import { HangHoaRepository } from "../repositories/hanghoa.repository.js";
import { HanghoaDTO } from "../dtos/hanghoas/hanghoa.dto.js";
import { logger } from "../config/logger.js";

export const HangHoaService = {
  getAllHangHoas: async () => {
    logger.info("Service: Getting all HangHoas");
    const HangHoas = await HangHoaRepository.getAll();
    return HangHoas.map((u) => new HanghoaDTO(u));
  },

  getHangHoaByMahang: async (id) => {
    logger.info(`Service: Getting HangHoa by ID ${id}`);
    const HangHoa = await HangHoaRepository.getByMahang(id);

    if (!HangHoa) {
      logger.warn(`Service Warning: HangHoa ${id} not found`);
      throw new Error("HangHoa not found");
    }

    return new HanghoaDTO(HangHoa);
  },

  getHangHoaByMaloai: async (id) => {
    logger.info(`Service: Getting HangHoa by ID ${id}`);
    const HangHoa = await HangHoaRepository.getByMaloai(id);

    if (!HangHoa) {
      logger.warn(`Service Warning: HangHoa ${id} not found`);
      throw new Error("HangHoa not found");
    }

    return new HanghoaDTO(HangHoa);
  },
  //Get cac hang hoa theo ten loai
  getByTenloai: async (Tenloai) => {
    logger.info(`Service: Getting HangHoa by Name ${Tenloai}`);
    const HangHoa = await HangHoaRepository.getByTenloai(Tenloai);
    if (!HangHoa) {
      logger.warn(`Service Warning: HangHoa ${Tenloai} not found`);
      throw new Error("HangHoa not found");
    }
    //return new HanghoaDTO(HangHoa);
    return HangHoa.map(u => new HanghoaDTO(u));
  },

  //get cac hang hoa sap het so luong
  getSapHetHang: async () => {
    logger.info(`Service: Getting HangHoa sap het hang`);
    const HangHoa = await HangHoaRepository.getSapHetHang();
    return HangHoa.map(u => new HanghoaDTO(u));
  },


  // get thong tin GiaBan cua HangHoa co maHang vao thoi diem hien tai
  getGiaBanByMaHang: async (MaHang) => {
    logger.info(`Service: Getting GiaBan for HangHoa ${MaHang}`);
    const GiaBan = await HangHoaRepository.getGiaBanByMaHang(MaHang);
    if (!GiaBan) {
      logger.warn(`Service Warning: GiaBan for HangHoa ${MaHang} not found`);
      throw new Error("GiaBan not found");
    }
    return GiaBan.map(u => new HanghoaDTO(u));
  },

  //Get thong tin cac hang hoa co gia ban trong khoang gban min den gban max
  getGiaBanminmax: async (gbanMin, gbanMax) => {
    logger.info(`Service: Getting HangHoa with GiaBan between ${gbanMin} and ${gbanMax}`);
    const HangHoa = await HangHoaRepository.getGiaBanminmax(gbanMin, gbanMax);
    return HangHoa.map(u => new HanghoaDTO(u));
  },

  ////Lay toan bo thong tin gia ban theo ma hang
  getGiaBanByMaHangAll: async (MaHang) => {
    logger.info(`Service: Getting all GiaBan for HangHoa ${MaHang}`);
    const GiaBan = await HangHoaRepository.getGiaBanByMaHangAll(MaHang);
    if (!GiaBan) {
      logger.warn(`Service Warning: GiaBan for HangHoa ${MaHang} not found`);
      throw new Error("GiaBan not found");
    }
    return GiaBan.map(u => new HanghoaDTO(u));
  },

  createHangHoa: async (dto) => {
    logger.info(`Service: Creating new HangHoa ${dto.MaHang}`);
    const created = await HangHoaRepository.create(dto);
    return new HanghoaDTO(created);
    
  },

  updateHangHoa: async (MaHang, dto) => {
    logger.info(`Service: Updating HangHoa ${MaHang}`);

    const existing = await HangHoaRepository.getByMahang(MaHang);
    if (!existing) {
      logger.warn(`Service Warning: Cannot update. HangHoa ${MaHang} not found`);
      throw new Error("HangHoa not found");
    }

    const updated = await HangHoaRepository.update(MaHang, dto);
    return new HanghoaDTO(updated);
  },

  deleteHangHoa: async (MaHang) => {
    logger.info(`Service: Deleting HangHoa ${MaHang}`);

    const existing = await HangHoaRepository.getByMahang(MaHang);
    if (!existing) {
      logger.warn(`Service Warning: Cannot delete. HangHoa ${MaHang} not found`);
      throw new Error("HangHoa not found");
    }

    await HangHoaRepository.delete(MaHang);
    return { message: "HangHoa deleted successfully" };
  },
};
