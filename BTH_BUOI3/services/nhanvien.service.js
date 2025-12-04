import { NhanVienRepository } from "../repositories/nhanvien.repository.js";
import { NhanVienDTO } from "../dtos/nhanvien/nhanvien.dto.js";
import { logger } from "../config/logger.js";

export const NhanVienService = {
  getAllNhanViens: async () => {
    logger.info("Service: Getting all NhanViens");
    const NhanViens = await NhanVienRepository.getAll();
    return NhanViens.map((u) => new NhanVienDTO(u));
  },

  getNhanVienByMaSoNV: async (id) => {
    logger.info(`Service: Getting NhanVien by ID ${id}`);
    const NhanVien = await NhanVienRepository.getByMaSoNV(id);

    if (!NhanVien) {
      logger.warn(`Service Warning: NhanVien ${id} not found`);
      throw new Error("NhanVien not found");
    }

    return new NhanVienDTO(NhanVien);
  },
  
  createNhanVien: async (dto) => {
    logger.info(`Service: Creating new NhanVien ${dto.MaSoNV}`);
    const created = await NhanVienRepository.create(dto);
    return new NhanVienDTO(created);
    
  },

  updateNhanVien: async (MaSoNV, dto) => {
    logger.info(`Service: Updating NhanVien ${MaSoNV}`);

    const existing = await NhanVienRepository.getByMaSoNV(MaSoNV);
    if (!existing) {
      logger.warn(`Service Warning: Cannot update. NhanVien ${MaSoNV} not found`);
      throw new Error("NhanVien not found");
    }

    const updated = await NhanVienRepository.update(MaSoNV, dto);
    return new NhanVienDTO(updated);
  },

  deleteNhanVien: async (MaSoNV) => {
    logger.info(`Service: Deleting NhanVien ${MaSoNV}`);

    const existing = await NhanVienRepository.getByMaSoNV(MaSoNV);
    if (!existing) {
      logger.warn(`Service Warning: Cannot delete. NhanVien ${MaSoNV} not found`);
      throw new Error("NhanVien not found");
    }

    await NhanVienRepository.delete(MaSoNV);
    return { message: "NhanVien deleted successfully" };
  },
};
