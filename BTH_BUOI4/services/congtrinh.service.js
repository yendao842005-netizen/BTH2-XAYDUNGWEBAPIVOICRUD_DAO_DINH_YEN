import { CongTrinhRepository } from "../repositories/congtrinh.repository.js";
import { CongTrinhDTO } from "../dtos/congtrinh/congtrinh.dto.js";
import { logger } from "../config/logger.js";

export const CongTrinhService = {
  getAllCongTrinhs: async () => {
    logger.info("Service: Getting all CongTrinhs");
    const CongTrinhs = await CongTrinhRepository.getAll();
    return CongTrinhs.map((u) => new CongTrinhDTO(u));
  },

  getCongTrinhByMACT: async (MACT) => {
    logger.info(`Service: Getting CongTrinh by MACT ${MACT}`);
    const CongTrinh = await CongTrinhRepository.getByMACT(MACT);

    if (!CongTrinh) {
      logger.warn(`Service Warning: CongTrinh ${MACT} not found`);
      throw new Error("CongTrinh not found");
    }

    return new CongTrinhDTO(CongTrinh);
  },

    

  createCongTrinh: async (dto) => {
    logger.info(`Service: Creating new CongTrinh ${dto.MACT}`);
    const created = await CongTrinhRepository.create(dto);
    return new CongTrinhDTO(created);
  },

  updateCongTrinh: async (MACT, dto) => {
    logger.info(`Service: Updating CongTrinh ${MACT}`);

    const existing = await CongTrinhRepository.getByMACT(MACT);
    if (!existing) {
      logger.warn(`Service Warning: Cannot update. CongTrinh ${MACT} not found`);
      throw new Error("CongTrinh not found");
    }

    const updated = await CongTrinhRepository.update(MACT, dto);
    return new CongTrinhDTO(updated);
  },

  deleteCongTrinh: async (MACT) => {
    logger.info(`Service: Deleting CongTrinh ${MACT}`);

    const existing = await CongTrinhRepository.getByMACT(MACT);
    if (!existing) {
      logger.warn(`Service Warning: Cannot delete. CongTrinh ${MACT} not found`);
      throw new Error("CongTrinh not found");
    }

    await CongTrinhRepository.delete(MACT);
    return { message: "CongTrinh deleted successfully" };
  },
};
