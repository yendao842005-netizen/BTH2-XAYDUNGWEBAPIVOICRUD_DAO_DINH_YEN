import { DuAnRepository } from "../repositories/duan.repository.js";
import { DuAnDTO } from "../dtos/duan/duan.dto.js";
import { logger } from "../config/logger.js";

export const DuAnService = {
  getAllDuAns: async () => {
    logger.info("Service: Getting all DuAns");
    const DuAns = await DuAnRepository.getAll();
    return DuAns.map((u) => new DuAnDTO(u));
  },

  getDuAnByMaDA: async (id) => {
    logger.info(`Service: Getting DuAn by ID ${id}`);
    const DuAn = await DuAnRepository.getByMaDA(id);

    if (!DuAn) {
      logger.warn(`Service Warning: DuAn ${id} not found`);
      throw new Error("DuAn not found");
    }

    return new DuAnDTO(DuAn);
  },
  
  createDuAn: async (dto) => {
    logger.info(`Service: Creating new DuAn ${dto.MaDA}`);
    const created = await DuAnRepository.create(dto);
    return new DuAnDTO(created);
    
  },

  updateDuAn: async (MaDA, dto) => {
    logger.info(`Service: Updating DuAn ${MaDA}`);

    const existing = await DuAnRepository.getByMaDA(MaDA);
    if (!existing) {
      logger.warn(`Service Warning: Cannot update. DuAn ${MaDA} not found`);
      throw new Error("DuAn not found");
    }

    const updated = await DuAnRepository.update(MaDA, dto);
    return new DuAnDTO(updated);
  },

  deleteDuAn: async (MaDA) => {
    logger.info(`Service: Deleting DuAn ${MaDA}`);

    const existing = await DuAnRepository.getByMaDA(MaDA);
    if (!existing) {
      logger.warn(`Service Warning: Cannot delete. DuAn ${MaDA} not found`);
      throw new Error("DuAn not found");
    }

    await DuAnRepository.delete(MaDA);
    return { message: "DuAn deleted successfully" };
  },
};
