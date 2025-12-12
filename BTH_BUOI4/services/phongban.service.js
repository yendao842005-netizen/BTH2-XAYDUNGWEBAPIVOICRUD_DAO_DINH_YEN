import { PhongBanRepository } from "../repositories/phongban.repository.js";
import { PhongBanDTO } from "../dtos/phongban/phongban.dto.js";
import { logger } from "../config/logger.js";

export const PhongBanService = {
  getAllPhongBans: async () => {
    logger.info("Service: Getting all PhongBans");
    const PhongBans = await PhongBanRepository.getAll();
    return PhongBans.map((u) => new PhongBanDTO(u));
  },

  getPhongBanByMAPB: async (MAPB) => {
    logger.info(`Service: Getting PhongBan by MAPB ${MAPB}`);
    const PhongBan = await PhongBanRepository.getByMAPB(MAPB);

    if (!PhongBan) {
      logger.warn(`Service Warning: PhongBan ${MAPB} not found`);
      throw new Error("PhongBan not found");
    }

    return new PhongBanDTO(PhongBan);
  },

    

  createPhongBan: async (dto) => {
    logger.info(`Service: Creating new PhongBan ${dto.MAPB}`);
    const created = await PhongBanRepository.create(dto);
    return new PhongBanDTO(created);
  },

  updatePhongBan: async (MAPB, dto) => {
    logger.info(`Service: Updating PhongBan ${MAPB}`);

    const existing = await PhongBanRepository.getByMAPB(MAPB);
    if (!existing) {
      logger.warn(`Service Warning: Cannot update. PhongBan ${MAPB} not found`);
      throw new Error("PhongBan not found");
    }

    const updated = await PhongBanRepository.update(MAPB, dto);
    return new PhongBanDTO(updated);
  },

  deletePhongBan: async (MAPB) => {
    logger.info(`Service: Deleting PhongBan ${MAPB}`);

    const existing = await PhongBanRepository.getByMAPB(MAPB);
    if (!existing) {
      logger.warn(`Service Warning: Cannot delete. PhongBan ${MAPB} not found`);
      throw new Error("PhongBan not found");
    }

    await PhongBanRepository.delete(MAPB);
    return { message: "PhongBan deleted successfully" };
  },
};
