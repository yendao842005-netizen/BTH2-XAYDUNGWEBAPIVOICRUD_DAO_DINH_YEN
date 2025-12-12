import { SanPhamRepository } from "../repositories/sanpham.repository.js";
import { SanPhamDTO } from "../dtos/sanpham/sanpham.dto.js";
import { logger } from "../config/logger.js";

export const SanPhamService = {
  getAllSanPhams: async () => {
    logger.info("Service: Getting all SanPhams");
    const SanPhams = await SanPhamRepository.getAll();
    return SanPhams.map((u) => new SanPhamDTO(u));
  },

  getSanPhamByMa: async (Ma) => {
    logger.info(`Service: Getting SanPham by Ma ${Ma}`);
    const SanPham = await SanPhamRepository.getByMa(Ma);

    if (!SanPham) {
      logger.warn(`Service Warning: SanPham ${Ma} not found`);
      throw new Error("SanPham not found");
    }

    return new SanPhamDTO(SanPham);
  },

    getByTen: async (Ten) => {
    logger.info(`Service: Getting SanPham by Ma ${Ten}`);
    const SanPham = await SanPhamRepository.getByTen(Ten);

    if (!SanPham) {
      logger.warn(`Service Warning: SanPham ${Ten} not found`);
      throw new Error("SanPham not found");
    }

    return new SanPhamDTO(SanPham);
  },

  getSXDonGia: async (sl,kieusx,trang) => {
    logger.info("Service: Getting getSXDonGia SanPhams");
    const SanPhams = await SanPhamRepository.getSXDonGia(sl,kieusx,trang);
    return SanPhams.map((u) => new SanPhamDTO(u));
  },

  Thongketheodanhmuc: async () => {
    logger.info("Service: Getting getSXDonGia SanPhams");
    const SanPhams = await SanPhamRepository.Thongketheodanhmuc();
      return SanPhams.map((r) => ({
    maDanhMuc: r.MaDanhMuc,
    tenDanhMuc: r.TenDanhMuc,
    soLuongSanPham: r.SoLuongSanPham
  }));
  },

  createSanPham: async (dto) => {
    logger.info(`Service: Creating new SanPham ${dto.Ma}`);
    const created = await SanPhamRepository.create(dto);
    return new SanPhamDTO(created);
  },

  updateSanPham: async (Ma, dto) => {
    logger.info(`Service: Updating SanPham ${Ma}`);

    const existing = await SanPhamRepository.getByMa(Ma);
    if (!existing) {
      logger.warn(`Service Warning: Cannot update. SanPham ${Ma} not found`);
      throw new Error("SanPham not found");
    }

    const updated = await SanPhamRepository.update(Ma, dto);
    return new SanPhamDTO(updated);
  },

  deleteSanPham: async (Ma) => {
    logger.info(`Service: Deleting SanPham ${Ma}`);

    const existing = await SanPhamRepository.getByMa(Ma);
    if (!existing) {
      logger.warn(`Service Warning: Cannot delete. SanPham ${Ma} not found`);
      throw new Error("SanPham not found");
    }

    await SanPhamRepository.delete(Ma);
    return { message: "SanPham deleted successfully" };
  },
};
