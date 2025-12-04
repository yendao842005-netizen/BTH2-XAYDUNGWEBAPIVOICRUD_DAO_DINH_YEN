import { CreateHangHoaDTO } from "../dtos/hanghoas/create-hanghoa.dto.js";
import { UpdateHangHoaDTO } from "../dtos/hanghoas/update-hanghoa.dto.js";
import { HangHoaService } from "../services/hanghoa.service.js";

import { validateCreateHangHoa } from "../validators/hanghoa/create-hanghoa.validator.js";
import { validateUpdateHangHoa } from "../validators/hanghoa/update-hanghoa.validator.js";

import { logger } from "../config/logger.js";

export const HangHoaController = {
  getAll: async (req, res) => {
    try {
      logger.info("Controller: GET /HangHoas");
      const HangHoas = await HangHoaService.getAllHangHoas();
      res.json(HangHoas);
    } catch (err) {
      logger.error("Controller Error: getAll failed", err);
      res.status(500).json({ message: err.message });
    }
  },

  getById: async (req, res) => {
    const id = +req.params.id;
    logger.info(`Controller: GET /HangHoas/${id}`);

    try {
      const HangHoa = await HangHoaService.getHangHoaByMahang(id);
      res.json(HangHoa);
    } catch (err) {
      logger.error(`Controller Error: getById failed (${id})`, err);
      res.status(404).json({ message: err.message });
    }
  },
  
  getByMaloai: async (req, res) => {
    const id = +req.params.id;
    logger.info(`Controller: GET /HangHoas/${id}`);

    try {
      const HangHoa = await HangHoaService.getHangHoaByMaloai(id);
      res.json(HangHoa);
    } catch (err) {
      logger.error(`Controller Error: getById failed (${id})`, err);
      res.status(404).json({ message: err.message });
    }
  },
  //Get cac hang hoa theo ten loai
  getByTenloai: async (req, res) => {
    const Tenloai = req.params.Tenloai;
    logger.info(`Controller: GET /HangHoas/tenloai${Tenloai}`);
    try {
      const HangHoa = await HangHoaService.getByTenloai(Tenloai);
      res.json(HangHoa);
    }
    catch (err) {
      logger.error(`Controller Error: getByTenloai failed (${Tenloai})`, err);
      res.status(404).json({ message: err.message });
    }
  },

  //get cac hang hoa sap het so luong
  getSapHetHang: async (req, res) => {
    logger.info(`Controller: GET /HangHoas/saphethang`);
    try {
      const HangHoa = await HangHoaService.getSapHetHang();
      res.json(HangHoa);
    }
    catch (err) {
      logger.error(`Controller Error: getSapHetHang failed`, err);
      res.status(404).json({ message: err.message });
    }
  },

  //get thong tin GiaBan cua HangHoa co maHang vao thoi diem hien tai
  getGiaBanByMaHang: async (req, res) => {
    const MaHang = +req.params.MaHang;
    logger.info(`Controller: GET /HangHoas/giaBan/${MaHang}`);
    try {
      const GiaBan = await HangHoaService.getGiaBanByMaHang(MaHang);
      res.json(GiaBan);
    }
    catch (err) {
      logger.error(`Controller Error: getGiaBanByMaHang failed (${MaHang})`, err);
      res.status(404).json({ message: err.message });
    }
  },

  // get thong tin cac hang hoa co gia ban trong khoang gban min den gban max
  getGiaBanminmax: async (req, res) => {
    const gbanMin = +req.params.gbanMin;
    const gbanMax = +req.params.gbanMax;
    logger.info(`Controller: GET /HangHoas/giabanminmax/${gbanMin}/${gbanMax}`);
    try {
      const HangHoa = await HangHoaService.getGiaBanminmax(gbanMin, gbanMax);
      res.json(HangHoa);
    }
    catch (err) {
      logger.error(`Controller Error: getGiaBanminmax failed (${gbanMin}, ${gbanMax})`, err);
      res.status(404).json({ message: err.message });
    }
  },

   ////Lay toan bo thong tin gia ban theo ma hang
  getGiaBanByMaHangAll: async (req, res) => {
    const MaHang = +req.params.MaHang;
    logger.info(`Controller: GET /HangHoas/giaBanAll/${MaHang}`);
    try {
      const GiaBan = await HangHoaService.getGiaBanByMaHangAll(MaHang);
      res.json(GiaBan);
    }
    catch (err) {
      logger.error(`Controller Error: getGiaBanByMaHangAll failed (${MaHang})`, err);
      res.status(404).json({ message: err.message });
    }
  },


  create: async (req, res) => {
    try {
      logger.info("Controller: POST /HangHoas");

      // VALIDATE INPUT
      const validData = validateCreateHangHoa(req.body);

      // CREATE DTO
      const dto = new CreateHangHoaDTO(validData);

      const HangHoa = await HangHoaService.createHangHoa(dto);
      res.status(201).json(HangHoa);
    } catch (err) {
      logger.error("Controller Error: create failed", err);
      res.status(400).json({ message: err.message });
    }
  },

  update: async (req, res) => {
    const MaHang = +req.params.MaHang;
    logger.info(`Controller: PUT /HangHoas/${MaHang}`);

    try {
      // VALIDATE INPUT
      const validData = validateUpdateHangHoa(req.body);

      // CREATE DTO
      const dto = new UpdateHangHoaDTO(validData);

      const HangHoa = await HangHoaService.updateHangHoa(MaHang, dto);
      res.json(HangHoa);
    } catch (err) {
      logger.error(`Controller Error: update failed (${MaHang})`, err);
      res.status(400).json({ message: err.message });
    }
  },

  delete: async (req, res) => {
    const MaHang = +req.params.MaHang;
    logger.info(`Controller: DELETE /HangHoas/${MaHang}`);

    try {
      const result = await HangHoaService.deleteHangHoa(MaHang);
      res.json(result);
    } catch (err) {
      logger.error(`Controller Error: delete failed (${MaHang})`, err);
      res.status(404).json({ message: err.message });
    }
  },
};
