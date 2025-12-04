import { Router } from "express";
import { userController } from "../controllers/user.controller.js"; 
import { HangHoaController } from "../controllers/hanghoa.controller.js";

import { LoaiHangController } from "../controllers/loaihang.controller.js";
import { GiaBanController } from "../controllers/giaban.controller.js";
import { DonViController } from "../controllers/donvi.controller.js";
const router = Router();

router.get("/users", userController.getAll);
router.get("/users/:id", userController.getById);
router.post("/users", userController.create);
router.put("/users/:id", userController.update);
router.delete("/users/:id", userController.delete);

//csdl bai 1 QLBH
//Bang HangHoa
router.get("/HangHoas", HangHoaController.getAll);
router.get("/HangHoas/:id", HangHoaController.getById);
router.get("/HangHoas/maloai/:id", HangHoaController.getByMaloai);
router.post("/HangHoas", HangHoaController.create);
router.get("/HangHoas/tenloai/:Tenloai", HangHoaController.getByTenloai);
router.get("/HangHoas/saphethang/1", HangHoaController.getSapHetHang);
router.get("/HangHoas/giaban/:MaHang", HangHoaController.getGiaBanByMaHang);
router.get("/HangHoas/giabanminmax/:gbanMin/:gbanMax", HangHoaController.getGiaBanminmax);
router.get("/HangHoas/timkiem/GiaBan/:MaHang", HangHoaController.getGiaBanByMaHangAll);
router.put("/HangHoas/:MaHang", HangHoaController.update);
router.delete("/HangHoas/:MaHang", HangHoaController.delete);   

//Bang loai hang 
router.get("/LoaiHangs", LoaiHangController.getAll);
router.get("/LoaiHangs/:id", LoaiHangController.getByMaloai);
router.post("/LoaiHangs", LoaiHangController.create);
router.put("/LoaiHangs/:MaLoai", LoaiHangController.update);
router.delete("/LoaiHangs/:MaLoai", LoaiHangController.delete);

//Bang GiaBan
router.get("/GiaBans", GiaBanController.getAll);
router.get("/GiaBans/:id", GiaBanController.getByMaGB);
router.post("/GiaBans", GiaBanController.create);
router.put("/GiaBans/:MaGB", GiaBanController.update);
router.delete("/GiaBans/:MaGB", GiaBanController.delete);

//Bai 2. CSDL QLDA

// Bang DonVi
router.get("/DonVis", DonViController.getAll);
router.get("/DonVis/:id", DonViController.getByMaSoDV);
router.post("/DonVis", DonViController.create);
router.put("/DonVis/:MaSoDV", DonViController.update);
router.delete("/DonVis/:MaSoDV", DonViController.delete);

//Bang NhanVien
import { NhanVienController } from "../controllers/nhanvien.controller.js";

router.get("/NhanViens", NhanVienController.getAll);
router.get("/NhanViens/:id", NhanVienController.getByMaSoNV);
router.post("/NhanViens", NhanVienController.create);
router.put("/NhanViens/:MaSoNV", NhanVienController.update);
router.delete("/NhanViens/:MaSoNV", NhanVienController.delete);

//Bang DuAn
import { DuAnController } from "../controllers/duan.controller.js";
router.get("/DuAns", DuAnController.getAll);
router.get("/DuAns/:id", DuAnController.getByMaDA);
router.post("/DuAns", DuAnController.create);
router.put("/DuAns/:MaDA", DuAnController.update);
router.delete("/DuAns/:MaDA", DuAnController.delete);
export default router;
