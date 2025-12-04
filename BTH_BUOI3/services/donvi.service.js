import { DonViRepository } from "../repositories/donvi.repository.js";
import { DonViDTO } from "../dtos/donvi/donvi.dto.js";
import { logger } from "../config/logger.js";

export const DonViService = {
  getAllDonVis: async () => {
    logger.info("Service: Getting all DonVis");
    const DonVis = await DonViRepository.getAll();
    return DonVis.map((u) => new DonViDTO(u));
  },

  getDonViByMaSoDV: async (id) => {
    logger.info(`Service: Getting DonVi by ID ${id}`);
    const DonVi = await DonViRepository.getByMaSoDV(id);

    if (!DonVi) {
      logger.warn(`Service Warning: DonVi ${id} not found`);
      throw new Error("DonVi not found");
    }

    return new DonViDTO(DonVi);
  },
  
  createDonVi: async (dto) => {
    logger.info(`Service: Creating new DonVi ${dto.MaSoDV}`);
    const created = await DonViRepository.create(dto);
    return new DonViDTO(created);
    
  },

  updateDonVi: async (MaSoDV, dto) => {
    logger.info(`Service: Updating DonVi ${MaSoDV}`);

    const existing = await DonViRepository.getByMaSoDV(MaSoDV);
    if (!existing) {
      logger.warn(`Service Warning: Cannot update. DonVi ${MaSoDV} not found`);
      throw new Error("DonVi not found");
    }

    const updated = await DonViRepository.update(MaSoDV, dto);
    return new DonViDTO(updated);
  },

  deleteDonVi: async (MaSoDV) => {
    logger.info(`Service: Deleting DonVi ${MaSoDV}`);

    const existing = await DonViRepository.getByMaSoDV(MaSoDV);
    if (!existing) {
      logger.warn(`Service Warning: Cannot delete. DonVi ${MaSoDV} not found`);
      throw new Error("DonVi not found");
    }

    await DonViRepository.delete(MaSoDV);
    return { message: "DonVi deleted successfully" };
  },
};
