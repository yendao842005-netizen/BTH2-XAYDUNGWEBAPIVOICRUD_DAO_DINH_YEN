import { CreateCongDTO } from "../dtos/cong/create-cong.dto.js";
import { UpdateCongDTO } from "../dtos/cong/update-cong.dto.js";
import { CongService } from "../services/cong.service.js";

import { validateCreateCong } from "../validators/cong/create-cong.validator.js";
import { validateupdateCong } from "../validators/cong/update-cong.validator.js";

import { logger } from "../config/logger.js";

export const CongController = {
  getAll: async (req, res) => {
    try {
      logger.info("Controller: GET /Congs");
      const Congs = await CongService.getAllCongs();
      res.json(Congs);
    } catch (err) {
      logger.error("Controller Error: getAll failed", err);
      res.status(500).json({ message: err.message });
    }
  },

  getBySLNGAYCONG: async (req, res) => {
    const SLNGAYCONG = +req.params.SLNGAYCONG;
    logger.info(`Controller: GET /Congs/${SLNGAYCONG}`);

    try {
      const Cong = await CongService.getCongBySLNGAYCONG(SLNGAYCONG);
      res.json(Cong);
    } catch (err) {
      logger.error(`Controller Error: getBySLNGAYCONG failed (${SLNGAYCONG})`, err);
      res.status(404).json({ message: err.message });
    }
  },


  create: async (req, res) => {
    try {
      logger.info("Controller: POST /Congs");

      // VALSLNGAYCONGATE INPUT
      const valSLNGAYCONGData = validateCreateCong(req.body);

      // CREATE DTO
      const dto = new CreateCongDTO(valSLNGAYCONGData);

      const Cong = await CongService.createCong(dto);
      res.status(201).json(Cong);
    } catch (err) {
      logger.error("Controller Error: create failed", err);
      res.status(400).json({ message: err.message });
    }
  },

  update: async (req, res) => {
    const SLNGAYCONG = +req.params.SLNGAYCONG;
    logger.info(`Controller: PUT /Congs/${SLNGAYCONG}`);

    try {
      // VALSLNGAYCONGATE INPUT
      const valSLNGAYCONGData = validateupdateCong(req.body);

      // CREATE DTO
      const dto = new UpdateCongDTO(valSLNGAYCONGData);

      const Cong = await CongService.updateCong(SLNGAYCONG, dto);
      res.json(Cong);
    } catch (err) {
      logger.error(`Controller Error: update failed (${SLNGAYCONG})`, err);
      res.status(400).json({ message: err.message });
    }
  },

  delete: async (req, res) => {
    const SLNGAYCONG = +req.params.SLNGAYCONG;
    logger.info(`Controller: DELETE /Congs/${SLNGAYCONG}`);

    try {
      const result = await CongService.deleteCong(SLNGAYCONG);
      res.json(result);
    } catch (err) {
      logger.error(`Controller Error: delete failed (${SLNGAYCONG})`, err);
      res.status(404).json({ message: err.message });
    }
  },
};
