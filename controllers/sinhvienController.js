import { sinhvien } from "../repositories/sinhvien.js";

//Lay toan bo sinh vien
export const getSinhvien = async (req, res) => {
    try {
        const result = await sinhvien.getSinhvien();
        res.status(200).json(result);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching students", error: error.message });
    }
};

//Lay thong tin sinh vien theo id
export const getSinhvienById = async (req, res) => {
    const id = req.params.id;
    try {
        const result = await sinhvien.getSinhvienById(id);
        if (result.length === 0) {
            return res.status(404).json({ message: "Student not found" });
        }
        res.status(200).json(result[0]);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching student", error: error.message });
    }
};
//Them sinh vien moi
export const addSinhvien = async (req, res) => {
    const svData = req.body;
    try {
        const newSv = await sinhvien.insertSinhvien(svData);
        res.status(201).json(newSv);
    }
    catch (error) {
        res.status(500).json({ message: "Error adding student", error: error.message });
    }
};
//Cap nhat thong tin sinh vien
export const updateSinhvien = async (req, res) => {
    const id = req.params.id;
    const svData = req.body;
    try {
        const updatedSv = await sinhvien.updateSinhvien(id, svData);
        res.status(200).json(updatedSv);
    }
    catch (error) {
        res.status(500).json({ message: "Error updating student", error: error.message });
    }
};
//Xoa sinh vien
export const deleteSinhvien = async (req, res) => {
    const id = req.params.id;
    try {
        await sinhvien.deleteSinhvien(id);
        res.status(204).send();
    }
    catch (error) {
        res.status(500).json({ message: "Error deleting student", error: error.message });
    }
};
//Lay sinh vien theo ten
export const getSinhvienByName = async (req, res) => {
    const name = req.query.name;
    try {
        const result = await sinhvien.getSinhvienByName(name);
        if (result.length === 0) {
            return res.status(404).json({ message: "No students found with that name" });
        }
        res.status(200).json(result);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching students by name", error: error.message });
    }
};
//Lay sinh vien theo ngay sinh tu ngay den ngay
export const getSinhvienByDateRange = async (req, res) => {
    const { startDate, endDate } = req.query;
    try {
        const result = await sinhvien.getSinhvienByDateRange(startDate, endDate);
        if (result.length === 0) {
            return res.status(404).json({ message: "No students found in that date range" });
        }
        res.status(200).json(result);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching students by date range", error: error.message });
    }
};
//Lay sinh co tuoi > 20
export const getSinhvienOlderThan20 = async (req, res) => {
    try {
        const result = await sinhvien.getSinhvienOlderThan20();
        if (result.length === 0) {
            return res.status(404).json({ message: "No students older than 20 found" });
        }   
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: "Error fetching students older than 20", error: error.message });
    }   
};

export default { getSinhvien, getSinhvienById, addSinhvien, updateSinhvien, deleteSinhvien, getSinhvienByName, getSinhvienByDateRange, getSinhvienOlderThan20 };