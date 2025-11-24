import express from 'express';


import {getUsers , getUserById}  from "../controllers/userController.js";

import {getAlltk, gettkById ,chectkCredentials,gettkComota,addNewtk,deletetk,puttk,addTkToEnd, addTkAtIndex,updateTkFullList }  from "../controllers/taikhoanController.js";

import {getNhanvien, getNhanvienById, updateNhanvien, addNhanvien,deleteNhanvien, getNhanvienByName, getNhanvienByDateRange}  from "../controllers/nhanvienController.js";

const router = express.Router();

//const {getAllUsers, getUserById } = require('../controller/userController');
/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express1' });
// });


router.get('/user', getUsers);

router.get('/user/:id', getUserById);

//chay tai khoan
router.get('/taikhoan', getAlltk);
router.get('/taikhoan/:taikhoan', gettkById );
router.post('/taikhoan/kiemtra', chectkCredentials);
router.get('/taikhoan/taikhoancomota', gettkComota);

router.post('/taikhoan1', addNewtk);
router.put('/taikhoan/:taikhoan', puttk);
router.delete('/taikhoan/:TaiKhoan', deletetk);

router.post('/taikhoan/themcuoicung', addTkToEnd);
router.post('/taikhoan/themtaiindex', addTkAtIndex);
router.put('/taikhoan/suatkfull/:taikhoan', updateTkFullList);



//nhan vien 
router.get('/nhanvien', getNhanvien);
router.get('/nhanvien/:id', getNhanvienById);
router.post('/nhanvien', addNhanvien);
router.put('/nhanvien/:id', updateNhanvien);
router.delete('/nhanvien/:id', deleteNhanvien);
router.get('/nhanvien/timkiem/:name', getNhanvienByName);
router.get('/nhanvien/:startDate/:endDate', getNhanvienByDateRange);


// Sach
import { getSach, getSachById, getSachByNameSach, getSachByNameTG, getSachByNameNXB, getSachNew, insertSach, updateSach, deleteSach } from "../controllers/sachController.js";

router.get('/sach', getSach);
router.get('/sach/:id', getSachById);
router.get('/sach/tensach/:name', getSachByNameSach);
router.get('/sach/tacgia/:name', getSachByNameTG);
router.get('/sach/nxb/:name', getSachByNameNXB);
router.get('/sach/moinhat', getSachNew);
router.post('/sach', insertSach);
router.put('/sach/:id', updateSach);
router.delete('/sach/:id', deleteSach);


//sinh vien
import {getSinhvien, getSinhvienById, addSinhvien, updateSinhvien, deleteSinhvien, getSinhvienByName, getSinhvienByDateRange, getSinhvienOlderThan20}  from "../controllers/sinhvienController.js";

router.get('/sinhvien', getSinhvien);
router.get('/sinhvien/:id', getSinhvienById);
router.post('/sinhvien', addSinhvien);
router.put('/sinhvien/:id', updateSinhvien);
router.delete('/sinhvien/:id', deleteSinhvien);

router.get('/sinhvien/timkiemngaysinh/:startDate/:endDate', getSinhvienByDateRange);
router.get('/sinhvien/tuoi/20', getSinhvienOlderThan20);
router.get('/sinhvien/timkiemten/:name', getSinhvienByName);

export default router;


