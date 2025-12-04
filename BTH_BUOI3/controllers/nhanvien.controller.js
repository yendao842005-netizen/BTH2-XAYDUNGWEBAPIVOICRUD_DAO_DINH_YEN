import { CreateNhanVienDTO } from "../dtos/nhanvien/create-NhanVien.dto.js";
import { UpdateNhanVienDTO } from "../dtos/nhanvien/update-NhanVien.dto.js";
import { NhanVienService } from "../services/nhanvien.service.js";

import { validateCreateNhanVien } from "../validators/nhanvien/create-NhanVien.validator.js";
import { validateUpdateNhanVien } from "../validators/nhanvien/update-NhanVien.validator.js";

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


  
  getByMaSoNV: async (req, res) => {
    const id = +req.params.id;
    logger.info(`Controller: GET /NhanViens/${id}`);

    try {
      const NhanVien = await NhanVienService.getNhanVienByMaSoNV(id);
      res.json(NhanVien);
    } catch (err) {
      logger.error(`Controller Error: getById failed (${id})`, err);
      res.status(404).json({ message: err.message });
    }
  },


  create: async (req, res) => {
    try {
      logger.info("Controller: POST /NhanViens");

      // VALIDATE INPUT
      const validData = validateCreateNhanVien(req.body);

      // CREATE DTO
      const dto = new CreateNhanVienDTO(validData);

      const NhanVien = await NhanVienService.createNhanVien(dto);
      res.status(201).json(NhanVien);
    } catch (err) {
      logger.error("Controller Error: create failed", err);
      res.status(400).json({ message: err.message });
    }
  },

  update: async (req, res) => {
    const MaSoNV = +req.params.MaSoNV;
    logger.info(`Controller: PUT /NhanViens/${MaSoNV}`);

    try {
      // VALIDATE INPUT
      const validData = validateUpdateNhanVien(req.body);

      // CREATE DTO
      const dto = new UpdateNhanVienDTO(validData);

      const NhanVien = await NhanVienService.updateNhanVien(MaSoNV, dto);
      res.json(NhanVien);
    } catch (err) {
      logger.error(`Controller Error: update failed (${MaSoNV})`, err);
      res.status(400).json({ message: err.message });
    }
  },

  delete: async (req, res) => {
    const MaSoNV = +req.params.MaSoNV;
    logger.info(`Controller: DELETE /NhanViens/${MaSoNV}`);

    try {
      const result = await NhanVienService.deleteNhanVien(MaSoNV);
      res.json(result);
    } catch (err) {
      logger.error(`Controller Error: delete failed (${MaSoNV})`, err);
      res.status(404).json({ message: err.message });
    }
  },
};
