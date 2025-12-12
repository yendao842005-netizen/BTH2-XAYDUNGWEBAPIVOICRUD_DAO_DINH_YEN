import { CreateSanPhamDTO } from "../dtos/sanpham/create-sanpham.dto.js";
import { UpdateSanPhamDTO } from "../dtos/sanpham/update-sanpham.dto.js";
import { SanPhamService } from "../services/sanpham.service.js";

import { validateCreateSanPham } from "../validators/sanpham/create-sanpham.validator.js";
import { validateUpdateSanPham } from "../validators/sanpham/update-sanpham.validator.js";

import { logger } from "../config/logger.js";

export const SanPhamController = {
  getAll: async (req, res) => {
    try {
      logger.info("Controller: GET /SanPhams");
      const SanPhams = await SanPhamService.getAllSanPhams();
      res.json(SanPhams);
    } catch (err) {
      logger.error("Controller Error: getAll failed", err);
      res.status(500).json({ message: err.message });
    }
  },

  getByMa: async (req, res) => {
    const Ma = +req.params.Ma;
    logger.info(`Controller: GET /SanPhams/${Ma}`);

    try {
      const SanPham = await SanPhamService.getSanPhamByMa(Ma);
      res.json(SanPham);
    } catch (err) {
      logger.error(`Controller Error: getByMa failed (${Ma})`, err);
      res.status(404).json({ message: err.message });
    }
  },

    getByTen: async (req, res) => {
    const Ten = req.params.Ten;
    logger.info(`Controller: GET /SanPhams/${Ten}`);

    try {
      const SanPham = await SanPhamService.getByTen(Ten);
      res.json(SanPham);
    } catch (err) {
      logger.error(`Controller Error: getByTen failed (${Ten})`, err);
      res.status(404).json({ message: err.message });
    }
  },

   getSXDonGia: async (req, res) => {
    const sl = +req.params.sl;
    const kieusx = req.params.kieusx;
    const trang = +req.params.trang;
    logger.info(`Controller: GET /SanPhams/${sl,kieusx,trang}`);

    try {
      const SanPham = await SanPhamService.getSXDonGia(sl,kieusx,trang);
      res.json(SanPham);
    } catch (err) {
      logger.error(`Controller Error: getByTen failed (${sl,kieusx,trang})`, err);
      res.status(404).json({ message: err.message });
    }
  },
  
  Thongketheodanhmuc: async (req, res) => {
    try {
      logger.info("Controller: GET /SanPhams");
      const SanPhams = await SanPhamService.Thongketheodanhmuc();
      res.json(SanPhams);
    } catch (err) {
      logger.error("Controller Error: getAll failed", err);
      res.status(500).json({ message: err.message });
    }
  },

  create: async (req, res) => {
    try {
      logger.info("Controller: POST /SanPhams");

      // VALMaATE INPUT
      const valMaData = validateCreateSanPham(req.body);

      // CREATE DTO
      const dto = new CreateSanPhamDTO(valMaData);

      const SanPham = await SanPhamService.createSanPham(dto);
      res.status(201).json(SanPham);
    } catch (err) {
      logger.error("Controller Error: create failed", err);
      res.status(400).json({ message: err.message });
    }
  },

  update: async (req, res) => {
    const Ma = +req.params.Ma;
    logger.info(`Controller: PUT /SanPhams/${Ma}`);

    try {
      // VALMaATE INPUT
      const valMaData = validateUpdateSanPham(req.body);

      // CREATE DTO
      const dto = new UpdateSanPhamDTO(valMaData);

      const SanPham = await SanPhamService.updateSanPham(Ma, dto);
      res.json(SanPham);
    } catch (err) {
      logger.error(`Controller Error: update failed (${Ma})`, err);
      res.status(400).json({ message: err.message });
    }
  },

  delete: async (req, res) => {
    const Ma = +req.params.Ma;
    logger.info(`Controller: DELETE /SanPhams/${Ma}`);

    try {
      const result = await SanPhamService.deleteSanPham(Ma);
      res.json(result);
    } catch (err) {
      logger.error(`Controller Error: delete failed (${Ma})`, err);
      res.status(404).json({ message: err.message });
    }
  },
};
