import { DanhMucRepository } from "../repositories/danhmuc.repository.js";
import { DanhMucDTO } from "../dtos/danhmuc/danhmuc.dto.js";
import { logger } from "../config/logger.js";

export const DanhMucService = {
  getAllDanhMucs: async () => {
    logger.info("Service: Getting all DanhMucs");
    const DanhMucs = await DanhMucRepository.getAll();
    return DanhMucs.map((u) => new DanhMucDTO(u));
  },

  getByMaDanhMuc: async (TenDanhMuc) => {
    logger.info(`Service: Getting DanhMuc by TenDanhMuc ${TenDanhMuc}`);
    const DanhMuc = await DanhMucRepository.getByMaDanhMuc(TenDanhMuc);

    if (!DanhMuc) {
      logger.warn(`Service Warning: DanhMuc ${TenDanhMuc} not found`);
      throw new Error("DanhMuc not found");
    }

    return new DanhMucDTO(DanhMuc);
  },

  createDanhMuc: async (dto) => {
    logger.info(`Service: Creating new DanhMuc ${dto.email}`);
    const created = await DanhMucRepository.create(dto);
    return new DanhMucDTO(created);
  },

  updateDanhMuc: async (TenDanhMuc, dto) => {
    logger.info(`Service: Updating DanhMuc ${TenDanhMuc}`);

    const existing = await DanhMucRepository.getByTenDanhMuc(TenDanhMuc);
    if (!existing) {
      logger.warn(`Service Warning: Cannot update. DanhMuc ${TenDanhMuc} not found`);
      throw new Error("DanhMuc not found");
    }

    const updated = await DanhMucRepository.update(TenDanhMuc, dto);
    return new DanhMucDTO(updated);
  },

  deleteDanhMuc: async (TenDanhMuc) => {
    logger.info(`Service: Deleting DanhMuc ${TenDanhMuc}`);

    const existing = await DanhMucRepository.getByTenDanhMuc(TenDanhMuc);
    if (!existing) {
      logger.warn(`Service Warning: Cannot delete. DanhMuc ${TenDanhMuc} not found`);
      throw new Error("DanhMuc not found");
    }

    await DanhMucRepository.delete(TenDanhMuc);
    return { message: "DanhMuc deleted successfully" };
  },
};
