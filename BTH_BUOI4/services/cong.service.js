import { CongRepository } from "../repositories/cong.respository.js";
import { CongDTO } from "../dtos/cong/cong.dto.js";
import { logger } from "../config/logger.js";

export const CongService = {
  getAllCongs: async () => {
    logger.info("Service: Getting all Congs");
    const Congs = await CongRepository.getAll();
    return Congs.map((u) => new CongDTO(u));
  },

  getCongBySLNGAYCONG: async (SLNGAYCONG) => {
    logger.info(`Service: Getting Cong by SLNGAYCONG ${SLNGAYCONG}`);
    const Cong = await CongRepository.getBySLNGAYCONG(SLNGAYCONG);

    if (!Cong) {
      logger.warn(`Service Warning: Cong ${SLNGAYCONG} not found`);
      throw new Error("Cong not found");
    }

    return new CongDTO(Cong);
  },

    

  createCong: async (dto) => {
    logger.info(`Service: Creating new Cong ${dto.SLNGAYCONG}`);
    const created = await CongRepository.create(dto);
    return new CongDTO(created);
  },

  updateCong: async (SLNGAYCONG, dto) => {
    logger.info(`Service: Updating Cong ${SLNGAYCONG}`);

    const existing = await CongRepository.getBySLNGAYCONG(SLNGAYCONG);
    if (!existing) {
      logger.warn(`Service Warning: Cannot update. Cong ${SLNGAYCONG} not found`);
      throw new Error("Cong not found");
    }

    const updated = await CongRepository.update(SLNGAYCONG, dto);
    return new CongDTO(updated);
  },

  deleteCong: async (SLNGAYCONG) => {
    logger.info(`Service: Deleting Cong ${SLNGAYCONG}`);

    const existing = await CongRepository.getBySLNGAYCONG(SLNGAYCONG);
    if (!existing) {
      logger.warn(`Service Warning: Cannot delete. Cong ${SLNGAYCONG} not found`);
      throw new Error("Cong not found");
    }

    await CongRepository.delete(SLNGAYCONG);
    return { message: "Cong deleted successfully" };
  },
};
