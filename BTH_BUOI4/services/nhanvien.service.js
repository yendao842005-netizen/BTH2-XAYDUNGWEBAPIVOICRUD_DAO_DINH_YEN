import { NhanVienRepository } from "../repositories/nhanvien.repository.js";
import { NhanVienDTO } from "../dtos/nhanvien/nhanvien.dto.js";
import { logger } from "../config/logger.js";

export const NhanVienService = {
  getAllNhanViens: async () => {
    logger.info("Service: Getting all NhanViens");
    const NhanViens = await NhanVienRepository.getAll();
    return NhanViens.map((u) => new NhanVienDTO(u));
  },

  getNhanVienByMANV: async (MANV) => {
    logger.info(`Service: Getting NhanVien by MANV ${MANV}`);
    const NhanVien = await NhanVienRepository.getByMANV(MANV);

    if (!NhanVien) {
      logger.warn(`Service Warning: NhanVien ${MANV} not found`);
      throw new Error("NhanVien not found");
    }

    return new NhanVienDTO(NhanVien);
  },

    

  createNhanVien: async (dto) => {
    logger.info(`Service: Creating new NhanVien ${dto.MANV}`);
    const created = await NhanVienRepository.create(dto);
    return new NhanVienDTO(created);
  },

  updateNhanVien: async (MANV, dto) => {
    logger.info(`Service: Updating NhanVien ${MANV}`);

    const existing = await NhanVienRepository.getByMANV(MANV);
    if (!existing) {
      logger.warn(`Service Warning: Cannot update. NhanVien ${MANV} not found`);
      throw new Error("NhanVien not found");
    }

    const updated = await NhanVienRepository.update(MANV, dto);
    return new NhanVienDTO(updated);
  },

  deleteNhanVien: async (MANV) => {
    logger.info(`Service: Deleting NhanVien ${MANV}`);

    const existing = await NhanVienRepository.getByMANV(MANV);
    if (!existing) {
      logger.warn(`Service Warning: Cannot delete. NhanVien ${MANV} not found`);
      throw new Error("NhanVien not found");
    }

    await NhanVienRepository.delete(MANV);
    return { message: "NhanVien deleted successfully" };
  },
};
