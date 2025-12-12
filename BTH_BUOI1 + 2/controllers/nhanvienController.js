import {nhanvien}  from "../repositories/nhanvien.js";

//lauy tat ca nhan vien
export const getNhanvien = async (req, res) => {
  try {
    const nv = await nhanvien.getNhanvien();
    res.json(nv);
    } catch (err) { 
    res.status(500).json({ message: err.message });
    }
};

//lay nhan vien theo id
export const getNhanvienById = async (req, res) => {
    const idString = req.params.id;
    const id = parseInt(idString);
    try {
        const nv = await nhanvien.getNhanvienById(idString);
        if (nv.length > 0) {
            res.json(nv[0]);
        } else {
            res.status(404).json({ message: `Không tìm thấy nhân viên với id: ${idString}` });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

//Them nhan vien moi
export const addNhanvien = async (req, res) => {
    const nvData = req.body;
    try {
        const newNv = await nhanvien.insertNhanvien(nvData);
        res.status(201).json(newNv);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

//cap nhat thong tin nhan vien
export const updateNhanvien = async (req, res) => {
    const idString = req.params.id;
    //const id = parseInt(idString);
    const nvData = req.body;
    try {
        const updatedNv = await nhanvien.updateNhanvien(idString, nvData);
        res.json(updatedNv);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};



//xoa nhan vien
export const deleteNhanvien = async (req, res) => {
    const idString = req.params.id;
    //const id = parseInt(idString);
    try {
        await nhanvien.deleteNhanvien(idString);
        res.status(204).end();
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// lay nhan vien theo ten
export const getNhanvienByName = async (req, res) => {
    const name = req.params.name;
    try {
        const nv = await nhanvien.getNhanvienByName(name);
        res.json(nv);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

//lay nhan vien theo ngay sinh tu ngay den ngay
export const getNhanvienByDateRange = async (req, res) => {
    const startDate = req.params.startDate;
    const endDate = req.params.endDate;
    try {
        const nv = await nhanvien.getNhanvienByDateRange(startDate, endDate);
        res.json(nv);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export default { getNhanvien , getNhanvienById, addNhanvien, updateNhanvien, deleteNhanvien, getNhanvienByName, getNhanvienByDateRange };