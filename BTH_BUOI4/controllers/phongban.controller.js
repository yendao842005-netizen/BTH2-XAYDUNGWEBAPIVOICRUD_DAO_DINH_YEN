import { CreatePhongBanDTO } from "../dtos/phongban/create-phongban.dto.js";
import { UpdatePhongBanDTO } from "../dtos/phongban/update-phongban.dto.js";
import { PhongBanService } from "../services/phongban.service.js";

import { validateCreatePhongBan } from "../validators/phongban/create-phongban.validator.js";
import { validateUpdatePhongBan } from "../validators/phongban/update-phongban.validator.js";

import { logger } from "../config/logger.js";

export const PhongBanController = {
  getAll: async (req, res) => {
    try {
      logger.info("Controller: GET /PhongBans");
      const PhongBans = await PhongBanService.getAllPhongBans();
      res.json(PhongBans);
    } catch (err) {
      logger.error("Controller Error: getAll failed", err);
      res.status(500).json({ message: err.message });
    }
  },

  getByMAPB: async (req, res) => {
    const MAPB = +req.params.MAPB;
    logger.info(`Controller: GET /PhongBans/${MAPB}`);

    try {
      const PhongBan = await PhongBanService.getPhongBanByMAPB(MAPB);
      res.json(PhongBan);
    } catch (err) {
      logger.error(`Controller Error: getByMAPB failed (${MAPB})`, err);
      res.status(404).json({ message: err.message });
    }
  },


  create: async (req, res) => {
    try {
      logger.info("Controller: POST /PhongBans");

      // VALMAPBATE INPUT
      const valMAPBData = validateCreatePhongBan(req.body);

      // CREATE DTO
      const dto = new CreatePhongBanDTO(valMAPBData);

      const PhongBan = await PhongBanService.createPhongBan(dto);
      res.status(201).json(PhongBan);
    } catch (err) {
      logger.error("Controller Error: create failed", err);
      res.status(400).json({ message: err.message });
    }
  },

  update: async (req, res) => {
    const MAPB = +req.params.MAPB;
    logger.info(`Controller: PUT /PhongBans/${MAPB}`);

    try {
      // VALMAPBATE INPUT
      const valMAPBData = validateUpdatePhongBan(req.body);

      // CREATE DTO
      const dto = new UpdatePhongBanDTO(valMAPBData);

      const PhongBan = await PhongBanService.updatePhongBan(MAPB, dto);
      res.json(PhongBan);
    } catch (err) {
      logger.error(`Controller Error: update failed (${MAPB})`, err);
      res.status(400).json({ message: err.message });
    }
  },

  delete: async (req, res) => {
    const MAPB = +req.params.MAPB;
    logger.info(`Controller: DELETE /PhongBans/${MAPB}`);

    try {
      const result = await PhongBanService.deletePhongBan(MAPB);
      res.json(result);
    } catch (err) {
      logger.error(`Controller Error: delete failed (${MAPB})`, err);
      res.status(404).json({ message: err.message });
    }
  },
};
