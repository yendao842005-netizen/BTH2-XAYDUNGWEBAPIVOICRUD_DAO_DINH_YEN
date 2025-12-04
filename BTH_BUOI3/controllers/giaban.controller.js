import { CreateGiaBanDTO } from "../dtos/giaban/create-GiaBan.dto.js";
import { UpdateGiaBanDTO } from "../dtos/giaban/update-GiaBan.dto.js";
import { GiaBanService } from "../services/giaban.service.js";

import { validateCreateGiaBan } from "../validators/giaban/create-GiaBan.validator.js";
import { validateUpdateGiaBan } from "../validators/giaban/update-GiaBan.validator.js";

import { logger } from "../config/logger.js";

export const GiaBanController = {
  getAll: async (req, res) => {
    try {
      logger.info("Controller: GET /GiaBans");
      const GiaBans = await GiaBanService.getAllGiaBans();
      res.json(GiaBans);
    } catch (err) {
      logger.error("Controller Error: getAll failed", err);
      res.status(500).json({ message: err.message });
    }
  },


  
  getByMaGB: async (req, res) => {
    const id = +req.params.id;
    logger.info(`Controller: GET /GiaBans/${id}`);

    try {
      const GiaBan = await GiaBanService.getGiaBanByMaGB(id);
      res.json(GiaBan);
    } catch (err) {
      logger.error(`Controller Error: getById failed (${id})`, err);
      res.status(404).json({ message: err.message });
    }
  },


  create: async (req, res) => {
    try {
      logger.info("Controller: POST /GiaBans");

      // VALIDATE INPUT
      const validData = validateCreateGiaBan(req.body);

      // CREATE DTO
      const dto = new CreateGiaBanDTO(validData);

      const GiaBan = await GiaBanService.createGiaBan(dto);
      res.status(201).json(GiaBan);
    } catch (err) {
      logger.error("Controller Error: create failed", err);
      res.status(400).json({ message: err.message });
    }
  },

  update: async (req, res) => {
    const MaGB = +req.params.MaGB;
    logger.info(`Controller: PUT /GiaBans/${MaGB}`);

    try {
      // VALIDATE INPUT
      const validData = validateUpdateGiaBan(req.body);

      // CREATE DTO
      const dto = new UpdateGiaBanDTO(validData);

      const GiaBan = await GiaBanService.updateGiaBan(MaGB, dto);
      res.json(GiaBan);
    } catch (err) {
      logger.error(`Controller Error: update failed (${MaGB})`, err);
      res.status(400).json({ message: err.message });
    }
  },

  delete: async (req, res) => {
    const MaGB = +req.params.MaGB;
    logger.info(`Controller: DELETE /GiaBans/${MaGB}`);

    try {
      const result = await GiaBanService.deleteGiaBan(MaGB);
      res.json(result);
    } catch (err) {
      logger.error(`Controller Error: delete failed (${MaGB})`, err);
      res.status(404).json({ message: err.message });
    }
  },
};
