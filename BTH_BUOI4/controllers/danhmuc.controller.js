import { CreateDanhMucDTO } from "../dtos/danhmuc/create-danhmuc.dto.js";
import { UpdateDanhMucDTO } from "../dtos/danhmuc/update-danhmuc.dto.js";
import { DanhMucService } from "../services/danhmuc.service.js";

import { validateCreateDanhMuc } from "../validators/danhmuc/create-danhmuc.validator.js";
import { validateUpdateDanhMuc } from "../validators/danhmuc/update-danhmuc.validator.js";

import { logger } from "../config/logger.js";

export const DanhMucController = {
  getAll: async (req, res) => {
    try {
      logger.info("Controller: GET /DanhMucs");
      const DanhMucs = await DanhMucService.getAllDanhMucs();
      res.json(DanhMucs);
    } catch (err) {
      logger.error("Controller Error: getAll failed", err);
      res.status(500).json({ message: err.message });
    }
  },

  getByMaDanhMuc: async (req, res) => {
    const MaDanhMuc = +req.params.MaDanhMuc;
    logger.info(`Controller: GET /DanhMucs/${MaDanhMuc}`);

    try {
      const DanhMuc = await DanhMucService.getByMaDanhMuc(MaDanhMuc);
      res.json(DanhMuc);
    } catch (err) {
      logger.error(`Controller Error: getByMaDanhMuc failed (${MaDanhMuc})`, err);
      res.status(404).json({ message: err.message });
    }
  },

  create: async (req, res) => {
    try {
      logger.info("Controller: POST /DanhMucs");

      // VALMaDanhMucATE INPUT
      const valMaDanhMucData = validateCreateDanhMuc(req.body);

      // CREATE DTO
      const dto = new CreateDanhMucDTO(valMaDanhMucData);

      const DanhMuc = await DanhMucService.createDanhMuc(dto);
      res.status(201).json(DanhMuc);
    } catch (err) {
      logger.error("Controller Error: create failed", err);
      res.status(400).json({ message: err.message });
    }
  },

  update: async (req, res) => {
    const MaDanhMuc = +req.params.MaDanhMuc;
    logger.info(`Controller: PUT /DanhMucs/${MaDanhMuc}`);

    try {
      // VALMaDanhMucATE INPUT
      const valMaDanhMucData = validateUpdateDanhMuc(req.body);

      // CREATE DTO
      const dto = new UpdateDanhMucDTO(valMaDanhMucData);

      const DanhMuc = await DanhMucService.updateDanhMuc(MaDanhMuc, dto);
      res.json(DanhMuc);
    } catch (err) {
      logger.error(`Controller Error: update failed (${MaDanhMuc})`, err);
      res.status(400).json({ message: err.message });
    }
  },

  delete: async (req, res) => {
    const MaDanhMuc = +req.params.MaDanhMuc;
    logger.info(`Controller: DELETE /DanhMucs/${MaDanhMuc}`);

    try {
      const result = await DanhMucService.deleteDanhMuc(MaDanhMuc);
      res.json(result);
    } catch (err) {
      logger.error(`Controller Error: delete failed (${MaDanhMuc})`, err);
      res.status(404).json({ message: err.message });
    }
  },
};
