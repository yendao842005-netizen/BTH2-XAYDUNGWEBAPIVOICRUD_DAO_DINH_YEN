import e from "express";
import {sach}  from "../repositories/sach.js";

// Lay toan bo sach
export const getSach = async (req, res) => {
    try {
        const result = await sach.getSach();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: "Error fetching books", error: error.message });
    }
};

// Lay sach theo ma sach
export const getSachById = async (req, res) => {
    const id = req.params.id;
    try {
        const result = await sach.getSachById(id);
        if (result.length === 0) {
            return res.status(404).json({ message: "Book not found" });
        }
        res.status(200).json(result[0]);
    } catch (error) {
        res.status(500).json({ message: "Error fetching book", error: error.message });
    }
};
//lay sach theo ten
export const getSachByNameSach = async (req, res) => {
    const name = req.query.name;
    try {
        const result = await sach.getSachByNameSach(name);
        if (result.length === 0) {
            return res.status(404).json({ message: "No books found with that name" });
        }
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: "Error fetching books by name", error: error.message });
    }
};

// Lay sach theo tac gia
export const getSachByNameTG = async (req, res) => {
    const name = req.query.name;
    try {
        const result = await sach.getSachByNameTG(name);
        if (result.length === 0) {
            return res.status(404).json({ message: "No books found by that author" });
        }
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: "Error fetching books by author", error: error.message });
    }
};
// Lay sach theo NXB
export const getSachByNameNXB = async (req, res) => {
    const name = req.query.name;
    try {
        const result = await sach.getSachByNameNXB(name);
        if (result.length === 0) {
            return res.status(404).json({ message: "No books found by that publisher" });
        }
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: "Error fetching books by publisher", error: error.message });
    }
};

// Lay sach moi nhat trong 5 nam gan day
export const getSachNew = async (req, res) => {
    try {
        const result = await sach.getSachNew();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: "Error fetching new books", error: error.message });
    }
};

// Them sach moi
export const insertSach = async (req, res) => {
    const sachData = req.body;
    try {
        const result = await sach.insertSach(sachData);
        res.status(201).json(result);
    }
    catch (error) {
        res.status(500).json({ message: "Error inserting book", error: error.message });
    }
};
// Cap nhat thong tin sach
export const updateSach = async (req, res) => {
    const id = req.params.id;
    const sachData = req.body;
    try {
        const result = await sach.updateSach(id, sachData);
        res.status(200).json(result);
    }
    catch (error) {
        res.status(500).json({ message: "Error updating book", error: error.message });
    }
};
// Xoa sach
export const deleteSach = async (req, res) => {
    const id = req.params.id;
    try {
        await sach.deleteSach(id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: "Error deleting book", error: error.message });
    }
};


export default {
    getSach,
    getSachById,
    getSachByNameSach,
    getSachByNameTG,
    getSachByNameNXB,
    getSachNew,
    insertSach,
    updateSach,
    deleteSach
};




