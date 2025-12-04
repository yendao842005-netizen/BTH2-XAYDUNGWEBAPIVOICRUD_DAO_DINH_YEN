import { CreateDonViDTO } from "../dtos/donvi/create-donvi.dto.js";
import { UpdateDonViDTO } from "../dtos/donvi/update-donvi.dto.js";
import { DonViService } from "../services/donvi.service.js";

import { validateCreateDonVi } from "../validators/donvi/create-donvi.validator.js";
import { validateUpdateDonVi } from "../validators/donvi/update-donvi.validator.js";

import { logger } from "../config/logger.js";

export const DonViController = {
  getAll: async (req, res) => {
    try {
      logger.info("Controller: GET /DonVis");
      const DonVis = await DonViService.getAllDonVis();
      res.json(DonVis);
    } catch (err) {
      logger.error("Controller Error: getAll failed", err);
      res.status(500).json({ message: err.message });
    }
  },


  
  getByMaSoDV: async (req, res) => {
    const id = +req.params.id;
    logger.info(`Controller: GET /DonVis/${id}`);

    try {
      const DonVi = await DonViService.getDonViByMaSoDV(id);
      res.json(DonVi);
    } catch (err) {
      logger.error(`Controller Error: getById failed (${id})`, err);
      res.status(404).json({ message: err.message });
    }
  },


  create: async (req, res) => {
    try {
      logger.info("Controller: POST /DonVis");

      // VALIDATE INPUT
      const validData = validateCreateDonVi(req.body);

      // CREATE DTO
      const dto = new CreateDonViDTO(validData);

      const DonVi = await DonViService.createDonVi(dto);
      res.status(201).json(DonVi);
    } catch (err) {
      logger.error("Controller Error: create failed", err);
      res.status(400).json({ message: err.message });
    }
  },

  update: async (req, res) => {
    const MaSoDV = +req.params.MaSoDV;
    logger.info(`Controller: PUT /DonVis/${MaSoDV}`);

    try {
      // VALIDATE INPUT
      const validData = validateUpdateDonVi(req.body);

      // CREATE DTO
      const dto = new UpdateDonViDTO(validData);

      const DonVi = await DonViService.updateDonVi(MaSoDV, dto);
      res.json(DonVi);
    } catch (err) {
      logger.error(`Controller Error: update failed (${MaSoDV})`, err);
      res.status(400).json({ message: err.message });
    }
  },

  delete: async (req, res) => {
    const MaSoDV = +req.params.MaSoDV;
    logger.info(`Controller: DELETE /DonVis/${MaSoDV}`);

    try {
      const result = await DonViService.deleteDonVi(MaSoDV);
      res.json(result);
    } catch (err) {
      logger.error(`Controller Error: delete failed (${MaSoDV})`, err);
      res.status(404).json({ message: err.message });
    }
  },
};
