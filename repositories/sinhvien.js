import { pool } from "../services/mysql.js";
export const sinhvien = {
    //lay toan bo sinh vien
    getSinhvien: async () => {
        const db = await pool;
        const [row] = await db.query("SELECT * FROM SINHVIEN");
        return row;
    },
    //lay thong tin sinh vien theo id
    getSinhvienById: async (id) => {
        const db = await pool;
        const [row] = await db.query("SELECT * FROM SINHVIEN WHERE maSV = ?", [id]);
        return row;
    },
    //them sinh vien moi
    insertSinhvien: async (sv) => {
        const db = await pool;
        const [result] = await db.query("INSERT INTO SINHVIEN SET ?", [sv]);
        return { id: result.insertId, ...sv };
    },
    //cap nhat thong tin sinh vien
    updateSinhvien: async (id, sv) => {
        const db = await pool;
        await db.query("UPDATE SINHVIEN SET ? WHERE maSV = ?", [sv, id]);
        return { id: id, ...sv };
    },
    //xoa sinh vien
    deleteSinhvien: async (id) => {
        const db = await pool;
        await db.query("DELETE FROM SINHVIEN WHERE maSV = ?", [id]);
        return;
    },
    //lay sinh vien theo ten
    getSinhvienByName: async (name) => {
        const db = await pool;
        const [row] = await db.query("SELECT * FROM SINHVIEN WHERE TenSV LIKE ?", [`%${name}%`]);
        return row;
    },
    //lay sinh vien theo ngay sinh tu ngay den ngay
    getSinhvienByDateRange: async (startDate, endDate) => {
        const db = await pool;
        const [row] = await db.query("SELECT * FROM SINHVIEN WHERE NgaySinh BETWEEN ? AND ?", [startDate, endDate]);
        return row;
    },
    //Lay sinh co tuoi > 20
    getSinhvienOlderThan20: async () => {
        const db = await pool;
        const [row] = await db.query("SELECT * FROM SINHVIEN WHERE YEAR(CURDATE()) - YEAR(NgaySinh) > 20");
        return row;
    }
};