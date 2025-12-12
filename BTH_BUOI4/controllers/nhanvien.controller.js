import { CreateNhanVienDTO } from "../dtos/nhanvien/create-nhanvien.dto.js";
import { UpdateNhanVienDTO } from "../dtos/nhanvien/update-nhanvien.dto.js";
import { NhanVienService } from "../services/nhanvien.service.js";

import { validateCreateNhanVien } from "../validators/nhanvien/create-nhanvien.validator.js";
import { validateUpdateNhanVien } from "../validators/nhanvien/update-nhanvien.validator.js";

import { logger } from "../config/logger.js";

export const NhanVienController = {
  getAll: async (req, res) => {
    try {
      logger.info("Controller: GET /NhanViens");
      const NhanViens = await NhanVienService.getAllNhanViens();
      res.json(NhanViens);
    } catch (err) {
      logger.error("Controller Error: getAll failed", err);
      res.status(500).json({ message: err.message });
    }
  },

  getByMANV: async (req, res) => {
    const MANV = +req.params.MANV;
    logger.info(`Controller: GET /NhanViens/${MANV}`);

    try {
      const NhanVien = await NhanVienService.getNhanVienByMANV(MANV);
      res.json(NhanVien);
    } catch (err) {
      logger.error(`Controller Error: getByMANV failed (${MANV})`, err);
      res.status(404).json({ message: err.message });
    }
  },


  create: async (req, res) => {
    try {
      logger.info("Controller: POST /NhanViens");

      // VALMANVATE INPUT
      const valMANVData = validateCreateNhanVien(req.body);

      // CREATE DTO
      const dto = new CreateNhanVienDTO(valMANVData);

      const NhanVien = await NhanVienService.createNhanVien(dto);
      res.status(201).json(NhanVien);
    } catch (err) {
      logger.error("Controller Error: create failed", err);
      res.status(400).json({ message: err.message });
    }
  },

  update: async (req, res) => {
    const MANV = +req.params.MANV;
    logger.info(`Controller: PUT /NhanViens/${MANV}`);

    try {
      // VALMANVATE INPUT
      const valMANVData = validateUpdateNhanVien(req.body);

      // CREATE DTO
      const dto = new UpdateNhanVienDTO(valMANVData);

      const NhanVien = await NhanVienService.updateNhanVien(MANV, dto);
      res.json(NhanVien);
    } catch (err) {
      logger.error(`Controller Error: update failed (${MANV})`, err);
      res.status(400).json({ message: err.message });
    }
  },

  delete: async (req, res) => {
    const MANV = +req.params.MANV;
    logger.info(`Controller: DELETE /NhanViens/${MANV}`);

    try {
      const result = await NhanVienService.deleteNhanVien(MANV);
      res.json(result);
    } catch (err) {
      logger.error(`Controller Error: delete failed (${MANV})`, err);
      res.status(404).json({ message: err.message });
    }
  },
};
