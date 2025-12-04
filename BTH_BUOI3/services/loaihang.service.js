import { LoaiHangRepository } from "../repositories/loaihang.repository.js";
import { LoaiHangDTO } from "../dtos/loaihang/loaihang.dto.js";
import { logger } from "../config/logger.js";

export const LoaiHangService = {
  getAllLoaiHangs: async () => {
    logger.info("Service: Getting all LoaiHangs");
    const LoaiHangs = await LoaiHangRepository.getAll();
    return LoaiHangs.map((u) => new LoaiHangDTO(u));
  },

  getLoaiHangByMaloai: async (id) => {
    logger.info(`Service: Getting LoaiHang by ID ${id}`);
    const LoaiHang = await LoaiHangRepository.getByMaloai(id);

    if (!LoaiHang) {
      logger.warn(`Service Warning: LoaiHang ${id} not found`);
      throw new Error("LoaiHang not found");
    }

    return new LoaiHangDTO(LoaiHang);
  },
  
  createLoaiHang: async (dto) => {
    logger.info(`Service: Creating new LoaiHang ${dto.MaLoai}`);
    const created = await LoaiHangRepository.create(dto);
    return new LoaiHangDTO(created);
    
  },

  updateLoaiHang: async (MaLoai, dto) => {
    logger.info(`Service: Updating LoaiHang ${MaLoai}`);

    const existing = await LoaiHangRepository.getByMaLoai(MaLoai);
    if (!existing) {
      logger.warn(`Service Warning: Cannot update. LoaiHang ${MaLoai} not found`);
      throw new Error("LoaiHang not found");
    }

    const updated = await LoaiHangRepository.update(MaLoai, dto);
    return new LoaiHangDTO(updated);
  },

  deleteLoaiHang: async (MaLoai) => {
    logger.info(`Service: Deleting LoaiHang ${MaLoai}`);

    const existing = await LoaiHangRepository.getByMaLoai(MaLoai);
    if (!existing) {
      logger.warn(`Service Warning: Cannot delete. LoaiHang ${MaLoai} not found`);
      throw new Error("LoaiHang not found");
    }

    await LoaiHangRepository.delete(MaLoai);
    return { message: "LoaiHang deleted successfully" };
  },
};
