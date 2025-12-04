import { CreateDuAnDTO } from "../dtos/duan/create-duan.dto.js";
import { UpdateDuAnDTO } from "../dtos/duan/update-duan.dto.js";
import { DuAnService } from "../services/duan.service.js";

import { validateCreateDuAn } from "../validators/duan/create-duan.validator.js";
import { validateUpdateDuAn } from "../validators/duan/update-duan.validator.js";

import { logger } from "../config/logger.js";

export const DuAnController = {
  getAll: async (req, res) => {
    try {
      logger.info("Controller: GET /DuAns");
      const DuAns = await DuAnService.getAllDuAns();
      res.json(DuAns);
    } catch (err) {
      logger.error("Controller Error: getAll failed", err);
      res.status(500).json({ message: err.message });
    }
  },


  
  getByMaDA: async (req, res) => {
    const id = +req.params.id;
    logger.info(`Controller: GET /DuAns/${id}`);

    try {
      const DuAn = await DuAnService.getDuAnByMaDA(id);
      res.json(DuAn);
    } catch (err) {
      logger.error(`Controller Error: getById failed (${id})`, err);
      res.status(404).json({ message: err.message });
    }
  },


  create: async (req, res) => {
    try {
      logger.info("Controller: POST /DuAns");

      // VALIDATE INPUT
      const validData = validateCreateDuAn(req.body);

      // CREATE DTO
      const dto = new CreateDuAnDTO(validData);

      const DuAn = await DuAnService.createDuAn(dto);
      res.status(201).json(DuAn);
    } catch (err) {
      logger.error("Controller Error: create failed", err);
      res.status(400).json({ message: err.message });
    }
  },

  update: async (req, res) => {
    const MaDA = +req.params.MaDA;
    logger.info(`Controller: PUT /DuAns/${MaDA}`);

    try {
      // VALIDATE INPUT
      const validData = validateUpdateDuAn(req.body);

      // CREATE DTO
      const dto = new UpdateDuAnDTO(validData);

      const DuAn = await DuAnService.updateDuAn(MaDA, dto);
      res.json(DuAn);
    } catch (err) {
      logger.error(`Controller Error: update failed (${MaDA})`, err);
      res.status(400).json({ message: err.message });
    }
  },

  delete: async (req, res) => {
    const MaDA = +req.params.MaDA;
    logger.info(`Controller: DELETE /DuAns/${MaDA}`);

    try {
      const result = await DuAnService.deleteDuAn(MaDA);
      res.json(result);
    } catch (err) {
      logger.error(`Controller Error: delete failed (${MaDA})`, err);
      res.status(404).json({ message: err.message });
    }
  },
};
