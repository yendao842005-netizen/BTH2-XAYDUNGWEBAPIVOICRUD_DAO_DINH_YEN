import { CreateCongTrinhDTO } from "../dtos/congtrinh/create-congtrinh.dto.js";
import { UpdateCongTrinhDTO } from "../dtos/congtrinh/update-congtrinh.dto.js";
import { CongTrinhService } from "../services/congtrinh.service.js";

import { validatecreateCongTrinh } from "../validators/congtrinh/create-congtrinh.validator.js";
import { validateUpdateCongTrinh } from "../validators/congtrinh/update-congtrinh.validator.js";

import { logger } from "../config/logger.js";

export const CongTrinhController = {
  getAll: async (req, res) => {
    try {
      logger.info("Controller: GET /CongTrinhs");
      const CongTrinhs = await CongTrinhService.getAllCongTrinhs();
      res.json(CongTrinhs);
    } catch (err) {
      logger.error("Controller Error: getAll failed", err);
      res.status(500).json({ message: err.message });
    }
  },

  getByMACT: async (req, res) => {
    const MACT = +req.params.MACT;
    logger.info(`Controller: GET /CongTrinhs/${MACT}`);

    try {
      const CongTrinh = await CongTrinhService.getCongTrinhByMACT(MACT);
      res.json(CongTrinh);
    } catch (err) {
      logger.error(`Controller Error: getByMACT failed (${MACT})`, err);
      res.status(404).json({ message: err.message });
    }
  },


  create: async (req, res) => {
    try {
      logger.info("Controller: POST /CongTrinhs");

      // VALMACTATE INPUT
      const valMACTData = validatecreateCongTrinh(req.body);

      // CREATE DTO
      const dto = new CreateCongTrinhDTO(valMACTData);

      const CongTrinh = await CongTrinhService.createCongTrinh(dto);
      res.status(201).json(CongTrinh);
    } catch (err) {
      logger.error("Controller Error: create failed", err);
      res.status(400).json({ message: err.message });
    }
  },

  update: async (req, res) => {
    const MACT = +req.params.MACT;
    logger.info(`Controller: PUT /CongTrinhs/${MACT}`);

    try {
      // VALMACTATE INPUT
      const valMACTData = validateUpdateCongTrinh(req.body);

      // CREATE DTO
      const dto = new UpdateCongTrinhDTO(valMACTData);

      const CongTrinh = await CongTrinhService.updateCongTrinh(MACT, dto);
      res.json(CongTrinh);
    } catch (err) {
      logger.error(`Controller Error: update failed (${MACT})`, err);
      res.status(400).json({ message: err.message });
    }
  },

  delete: async (req, res) => {
    const MACT = +req.params.MACT;
    logger.info(`Controller: DELETE /CongTrinhs/${MACT}`);

    try {
      const result = await CongTrinhService.deleteCongTrinh(MACT);
      res.json(result);
    } catch (err) {
      logger.error(`Controller Error: delete failed (${MACT})`, err);
      res.status(404).json({ message: err.message });
    }
  },
};
