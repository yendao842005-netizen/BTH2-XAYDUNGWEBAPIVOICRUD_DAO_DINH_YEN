



import { pool } from "../services/mysql.js";

export const userRepo = {
    getUsers: async () => {
        const db = await pool;
        const [row] = await db.query("SELECT * FROM Users");
        return row;
    }


};
export const nhanvien ={
    getNhanvien: async () => {
        const db = await pool;
        const [row] = await db.query("SELECT * FROM NhanVien");
        return row;
    },

    //lay thong tin nhan vien theo id
    getNhanvienById: async (id) => {
        const db = await pool;
        const [row] = await db.query("SELECT * FROM NhanVien WHERE maNV = ?", [id]);
        return row;
    },

    //them nhan vien moi
    insertNhanvien: async (nv) => {
        const db = await pool;
        const [result] = await db.query("INSERT INTO NhanVien SET ?", [nv]);
        return { id: result.insertId, ...nv };
    },

    //cap nhat thong tin nhan vien
    updateNhanvien: async (id, nv) => {
        const db = await pool;
        await db.query("UPDATE NhanVien SET ? WHERE maNV = ?", [nv, id]);
        return { id: id, ...nv };
    },
    //xoa nhan vien
    deleteNhanvien: async (id) => {
        const db = await pool;
        await db.query("DELETE FROM NhanVien WHERE maNV = ?", [id]);
        return;
    },

    //lay nhan vien trong ten co ky tu
    getNhanvienByName: async (name) => {
        const db = await pool;
        const [row] = await db.query("SELECT * FROM NhanVien WHERE tenNV LIKE ?", [`%${name}%`]);
        return row;
    },   

    //lay nhan vien theo ngay sinh tu ngay den ngay
    getNhanvienByDateRange: async (startDate, endDate) => {
        const db = await pool;
        const [row] = await db.query("SELECT * FROM NhanVien WHERE ngaySinh BETWEEN ? AND ?", [startDate, endDate]);
        return row;
    },

    
}


