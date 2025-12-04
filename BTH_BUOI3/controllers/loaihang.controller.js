import { CreateLoaiHangDTO } from "../dtos/loaihang/create-loaihang.dto.js";
import { UpdateLoaiHangDTO } from "../dtos/loaihang/update-loaihang.dto.js";
import { LoaiHangService } from "../services/loaihang.service.js";

import { validateCreateLoaiHang } from "../validators/loaihang/create-loaihang.validator.js";
import { validateUpdateLoaiHang } from "../validators/loaihang/update-loaihang.validator.js";

import { logger } from "../config/logger.js";

export const LoaiHangController = {
  getAll: async (req, res) => {
    try {
      logger.info("Controller: GET /LoaiHangs");
      const LoaiHangs = await LoaiHangService.getAllLoaiHangs();
      res.json(LoaiHangs);
    } catch (err) {
      logger.error("Controller Error: getAll failed", err);
      res.status(500).json({ message: err.message });
    }
  },


  
  getByMaloai: async (req, res) => {
    const id = +req.params.id;
    logger.info(`Controller: GET /LoaiHangs/${id}`);

    try {
      const LoaiHang = await LoaiHangService.getLoaiHangByMaloai(id);
      res.json(LoaiHang);
    } catch (err) {
      logger.error(`Controller Error: getById failed (${id})`, err);
      res.status(404).json({ message: err.message });
    }
  },


  create: async (req, res) => {
    try {
      logger.info("Controller: POST /LoaiHangs");

      // VALIDATE INPUT
      const validData = validateCreateLoaiHang(req.body);

      // CREATE DTO
      const dto = new CreateLoaiHangDTO(validData);

      const LoaiHang = await LoaiHangService.createLoaiHang(dto);
      res.status(201).json(LoaiHang);
    } catch (err) {
      logger.error("Controller Error: create failed", err);
      res.status(400).json({ message: err.message });
    }
  },

  update: async (req, res) => {
    const MaLoai = +req.params.MaLoai;
    logger.info(`Controller: PUT /LoaiHangs/${MaLoai}`);

    try {
      // VALIDATE INPUT
      const validData = validateUpdateLoaiHang(req.body);

      // CREATE DTO
      const dto = new UpdateLoaiHangDTO(validData);

      const LoaiHang = await LoaiHangService.updateLoaiHang(MaLoai, dto);
      res.json(LoaiHang);
    } catch (err) {
      logger.error(`Controller Error: update failed (${MaLoai})`, err);
      res.status(400).json({ message: err.message });
    }
  },

  delete: async (req, res) => {
    const MaLoai = +req.params.MaLoai;
    logger.info(`Controller: DELETE /LoaiHangs/${MaLoai}`);

    try {
      const result = await LoaiHangService.deleteLoaiHang(MaLoai);
      res.json(result);
    } catch (err) {
      logger.error(`Controller Error: delete failed (${MaLoai})`, err);
      res.status(404).json({ message: err.message });
    }
  },
};
