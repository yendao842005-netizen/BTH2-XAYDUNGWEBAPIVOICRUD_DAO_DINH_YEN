import { Router } from "express";

import { SanPhamController } from "../controllers/sanpham.controller.js"; 
import { DanhMucController } from "../controllers/danhmuc.controller.js"; 
const router = Router();


// Bài 1 : csdl QLSanPham
//san pham
router.get("/SanPham", SanPhamController.getAll);
router.get("/SanPham/THONGKE", SanPhamController.Thongketheodanhmuc);
router.get("/SanPham/:Ma", SanPhamController.getByMa);
router.post("/SanPham",SanPhamController.create);
router.put("/SanPham/:Ma",SanPhamController.update);
router.delete("/SanPham/:Ma",SanPhamController.delete);
router.get("/SanPham/TimkiemTen/:Ten", SanPhamController.getByTen);
router.get("/SanPham/SxSL/sl/:sl/:kieusx/:trang", SanPhamController.getSXDonGia);

//danh muc
router.get("/DanhMuc", DanhMucController.getAll);
router.get("/DanhMuc/:MaDanhMuc", DanhMucController.getByMaDanhMuc);


//Bài 2 : csdl QLSinhVien
import { NhanVienController } from "../controllers/nhanvien.controller.js"; 
import { CongController } from "../controllers/cong.controller.js"; 
import { CongTrinhController } from "../controllers/congtrinh.controller.js"; 
import { PhongBanController } from "../controllers/phongban.controller.js"; 
//Nhan Vien
router.get("/NhanVien", NhanVienController.getAll);
router.get("/NhanVien/:MANV", NhanVienController.getByMANV);
router.post("/NhanVien", NhanVienController.create);
router.put("/NhanVien/:MANV", NhanVienController.update);
router.delete("/NhanVien/:MANV", NhanVienController.delete);



//Cong
router.get("/Cong", CongController.getAll);
router.get("/Cong/:SLNGAYCONG", CongController.getBySLNGAYCONG);
router.post("/Cong", CongController.create);
router.put("/Cong/:SLNGAYCONG", CongController.update);
router.delete("/Cong/:SLNGAYCONG", CongController.delete);
//cong trinh
router.get("/CongTrinh", CongTrinhController.getAll);
router.get("/CongTrinh/:MACT", CongTrinhController.getByMACT);
router.post("/CongTrinh", CongTrinhController.create);
router.put("/CongTrinh/:MACT", CongTrinhController.update);
router.delete("/CongTrinh/:MACT", CongTrinhController.delete);
//phongban 
router.get("/PhongBan", PhongBanController.getAll);
router.get("/PhongBan/:MAPB", PhongBanController.getByMAPB);
router.post("/PhongBan", PhongBanController.create);
router.put("/PhongBan/:MAPB", PhongBanController.update);
router.delete("/PhongBan/:MAPB", PhongBanController.delete);
export default router;
