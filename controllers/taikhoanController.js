import {taikhoan}  from "../model/taikhoan.js";

//lay tat ca tai khoan
export const getAlltk = (req, res) => {
    
    res.json(taikhoan);
};

//tim kiem tai khoan theo ten tai khoan
export const gettkById = (req, res) => {
    const taikhoanParam = req.params.taikhoan;
    const taikhoanFound = taikhoan.find(tk => tk.TaiKhoan === taikhoanParam);
    if (taikhoanFound) {
        res.json(taikhoanFound);
    }
    else {
        res.status(404).json({ message: `Khong tim thay tai khoan: ${taikhoanParam}` });
    }
};


//kiem tra tai khoan mat khau co hop le
export const chectkCredentials = (req, res) => {
    const { TaiKhoan, MatKhau } = req.body;
    const taikhoanFound = taikhoan.find( tk => tk.TaiKhoan === TaiKhoan && tk.MatKhau === MatKhau);
    if(taikhoanFound){
        res.json({ message: "Dang nhap thanh cong!"});
    } else {
        res.status(401).json({ message: "Dang nhap that bai! Tai khoan hoac mat khau khong dung."});
    }
};

////lay thong tin cac tai khoan chua noi dung mo ta
export const gettkComota = (req, res) => {
    const taikhoanComota = taikhoan.filter( tk => {
        
        return tk.MoTa && tk.MoTa.length > 0;
    });
    res.json(taikhoanComota);
};

//them tai khoan moi

export const addNewtk = (req, res) => {
    const newTaiKhoan = req.body;
    if(!newTaiKhoan.TaiKhoan || !newTaiKhoan.MatKhau){
        return res.status(400).json({ message: "TaiKhoan va MatKhau la bat buoc."});
    }
    taikhoan.push(newTaiKhoan);
    res.status(201).json(newTaiKhoan);
};



//sua thong tin cua tai khoan
export const puttk = (req, res) => {
    const taikhoanParam = req.params.taikhoan;
    const updatedData = req.body;
    const taikhoanFound = taikhoan.find( tk => tk.TaiKhoan === taikhoanParam);
    if(taikhoanFound){
        taikhoanFound.MatKhau = updatedData.MatKhau || taikhoanFound.MatKhau;
        taikhoanFound.MoTa = updatedData.MoTa || taikhoanFound.MoTa;
        res.json(taikhoanFound);
    } else {
        res.status(404).json({ message: `Khong tim thay tai khoan: ${taikhoanParam}` });
    }
};


//xoa tai khoan
export const deletetk = (req, res) => {
    const taikhoanParam = req.params.TaiKhoan;
    const index = taikhoan.findIndex( tk => tk.TaiKhoan === taikhoanParam);
    if (index !== -1) {
        taikhoan.splice(index, 1);
        res.json({ message: `Da xoa tai khoan: ${taikhoanParam}` });
    }
    else {
        res.status(404).json({ message: `Khong tim thay tai khoan: ${taikhoanParam}` });
    }
};


//Thêm thông tin tài khoản với: tham số là 1 tài khoản vào cuối (kiểm tra khóa chính tên TK nếu có có r=> null, còn lại return DS sau khi thêm cuối)
export const addTkToEnd = (req, res) => {
    const newTk = req.body; 

    
    const isExist = taikhoan.some(tk => tk.TaiKhoan === newTk.TaiKhoan);

    if (isExist) {
        
        res.json(null);
    } else {
        
        taikhoan.push(newTk);
        
        res.json(taikhoan);
    }
};

/// Thêm tài khoản tại Index (Check index, Check PK => null hoặc trả về DS)
export const addTkAtIndex = (req, res) => {
    
    const { index, newTk } = req.body; 

    
    if (index < 0 || index > taikhoan.length) {
        return res.json(null);
    }
   
    const isExist = taikhoan.some(tk => tk.TaiKhoan === newTk.TaiKhoan);

    if (isExist) {
        return res.json(null);
    }

    
    taikhoan.splice(index, 0, newTk);
    
    
    res.json(taikhoan);
};

//// Sửa thông tin tài khoản (TenTK, MatKhau, MoTa => Nếu ko có TenTK => null, còn lại trả về DS)
export const updateTkFullList = (req, res) => {
    const tenTKParam = req.params.taikhoan; 
    const { MatKhau, MoTa } = req.body;     

    const tkFound = taikhoan.find(tk => tk.TaiKhoan === tenTKParam);

    if (!tkFound) {
        
        res.json(null);
    } else {
        
        tkFound.MatKhau = MatKhau || tkFound.MatKhau;
        tkFound.MoTa = MoTa || tkFound.MoTa;

        
        res.json(taikhoan);
    }
};
export default { getAlltk, gettkById ,chectkCredentials,gettkComota,addNewtk,deletetk,puttk , addTkToEnd, addTkAtIndex,updateTkFullList};
