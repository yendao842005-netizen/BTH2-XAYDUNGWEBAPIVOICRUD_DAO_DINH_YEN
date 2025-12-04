import { GiaBanRepository } from "../repositories/giaban.repository.js";
import { GiaBanDTO } from "../dtos/giaban/giaban.dto.js";
import { logger } from "../config/logger.js";

export const GiaBanService = {
  getAllGiaBans: async () => {
    logger.info("Service: Getting all GiaBans");
    const GiaBans = await GiaBanRepository.getAll();
    return GiaBans.map((u) => new GiaBanDTO(u));
  },

  getGiaBanByMaGB: async (id) => {
    logger.info(`Service: Getting GiaBan by ID ${id}`);
    const GiaBan = await GiaBanRepository.getByMaGB(id);

    if (!GiaBan) {
      logger.warn(`Service Warning: GiaBan ${id} not found`);
      throw new Error("GiaBan not found");
    }

    return new GiaBanDTO(GiaBan);
  },
  
  createGiaBan: async (dto) => {
    logger.info(`Service: Creating new GiaBan ${dto.MaGB}`);
    const created = await GiaBanRepository.create(dto);
    return new GiaBanDTO(created);
    
  },

  updateGiaBan: async (MaGB, dto) => {
    logger.info(`Service: Updating GiaBan ${MaGB}`);

    const existing = await GiaBanRepository.getByMaGB(MaGB);
    if (!existing) {
      logger.warn(`Service Warning: Cannot update. GiaBan ${MaGB} not found`);
      throw new Error("GiaBan not found");
    }

    const updated = await GiaBanRepository.update(MaGB, dto);
    return new GiaBanDTO(updated);
  },

  deleteGiaBan: async (MaGB) => {
    logger.info(`Service: Deleting GiaBan ${MaGB}`);

    const existing = await GiaBanRepository.getByMaGB(MaGB);
    if (!existing) {
      logger.warn(`Service Warning: Cannot delete. GiaBan ${MaGB} not found`);
      throw new Error("GiaBan not found");
    }

    await GiaBanRepository.delete(MaGB);
    return { message: "GiaBan deleted successfully" };
  },
};
