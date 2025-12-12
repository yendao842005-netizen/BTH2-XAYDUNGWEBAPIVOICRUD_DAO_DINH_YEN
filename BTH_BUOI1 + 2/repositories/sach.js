
import { pool } from "../services/mysql.js";


export const sach ={
    //lay toan bo sach
    getSach: async () => {
        const db = await pool;
        const [row] = await db.query("SELECT * FROM SACH");
        return row;
    },

    //lay sach theo ma sach
    getSachById: async (id) => {
        const db = await pool;
        const [row] = await db.query("SELECT * FROM SACH WHERE MASH = ?", [id]);
        return row;
    },

    //lay sach theo ten 
    getSachByNameSach: async (name) => {
        const db = await pool;
        const [row] = await db.query("SELECT * FROM SACH WHERE TENSACH LIKE ?", [`%${name}%`]);
        return row;
    },   

    //Lay sach theo tac gia
    getSachByNameTG: async (name) => {
        const db = await pool;
        const [row] = await db.query("SELECT * FROM SACH WHERE TACGIA LIKE ?", [`%${name}%`]);
        return row;
    },   

    //Lay sach theo NXB 
    getSachByNameNXB: async (name) => {
        const db = await pool;
        const [row] = await db.query("SELECT * FROM SACH WHERE NHAXB LIKE ?", [`%${name}%`]);
        return row;
    },   

    //Lay sach moi nhat trong 5 nam gan day
    getSachNew: async () => {
        const db = await pool;
        const [row] = await db.query("SELECT * FROM SACH WHERE YEAR(NGAYPHATHANH) >= YEAR(CURDATE()) - 5");
        return row;
    },

    //them sach moi
    insertSach: async (sach) => {
        const db = await pool;
        const [result] = await db.query("INSERT INTO SACH SET ?", [sach]);
        return { id: result.insertId, ...sach };
    },
    //cap nhat thong tin sach
    updateSach: async (id, sach) => {
        const db = await pool;
        await db.query("UPDATE SACH SET ? WHERE MASH = ?", [sach, id]);
        return { id: id, ...sach };
    },
    //xoa sach
    deleteSach: async (id) => {
        const db = await pool;
        await db.query("DELETE FROM SACH WHERE MASH = ?", [id]);
        return;
    },
    
}