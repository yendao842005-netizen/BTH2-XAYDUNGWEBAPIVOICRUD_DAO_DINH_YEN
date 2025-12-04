-- bai 1 CSDL QLBanHang
use qlbanhang;

CREATE TABLE LoaiHang (
    MaLoai INT PRIMARY KEY,
    TenLoai VARCHAR(50),
    MoTa VARCHAR(100)
);

-- Bảng HangHoa
CREATE TABLE HangHoa (
    MaHang INT PRIMARY KEY,
    MaLoai INT,
    TenHang VARCHAR(100),
    SoLuong INT,
    SoLuongCon INT,
    FOREIGN KEY (MaLoai) REFERENCES LoaiHang(MaLoai)
);

-- Bảng GiaBan
CREATE TABLE GiaBan (
    MaGB INT PRIMARY KEY,
    MaHang INT,
    Gia DECIMAL(12,2),
    DVTinh VARCHAR(20),
    NgayBD DATE,
    NgayKT DATE,
    FOREIGN KEY (MaHang) REFERENCES HangHoa(MaHang)
);

INSERT INTO LoaiHang VALUES
(1, 'Đồ uống', 'Các loại nước giải khát'),
(2, 'Bánh kẹo', 'Bánh snack, kẹo ngọt'),
(3, 'Gia vị', 'Các loại gia vị nấu ăn'),
(4, 'Mỹ phẩm', 'Sản phẩm chăm sóc cá nhân'),
(5, 'Dụng cụ học tập', 'Dụng cụ dùng trong học tập');

INSERT INTO HangHoa VALUES
(101, 1, 'Coca Cola lon', 200, 150),
(102, 2, 'Snack khoai tây', 120, 100),
(103, 3, 'Nước mắm 500ml', 80, 60),
(104, 4, 'Sữa rửa mặt', 60, 40),
(105, 5, 'Bút bi Thiên Long', 500, 480);
INSERT INTO HangHoa VALUES
(107, 1, '7UP', 200, 150);
INSERT INTO GiaBan VALUES
(1, 101, 10000, 'Lon', '2025-01-01', '2025-12-31'),
(2, 102, 15000, 'Gói', '2025-01-01', '2025-06-30'),
(3, 103, 30000, 'Chai', '2025-02-01', '2025-12-31'),
(4, 104, 55000, 'Tuýp', '2025-03-01', '2025-12-31'),
(5, 105, 5000, 'Cây', '2025-01-15', '2025-12-30');


select * from loaihang;
select * from HangHoa;
select * from GiaBan;

select * from HangHoa inner join loaihang on HangHoa.MaLoai = loaihang.MaLoai where TenLoai = N'Đồ uống';

select * from HangHoa inner join GiaBan on HangHoa.MaHang = GiaBan.MaHang where HangHoa.MaHang = 101;
select * from HangHoa inner join GiaBan on HangHoa.MaHang = GiaBan.MaHang where GiaBan.Gia between 0 and 15000.00;
select * from GiaBan inner join HangHoa on GiaBan.MaHang = HangHoa.MaHang where HangHoa.MaHang = 101;


-- CSDL BAI 2
-- 2.1 CSDL QLSinhVien
CREATE TABLE SinhVien (
    MASV VARCHAR(10) PRIMARY KEY,
    HOTEN VARCHAR(50)
);

INSERT INTO SinhVien VALUES
('SV01','Nguyen Van A'),
('SV02','Tran Thi B'),
('SV03','Le Van C'),
('SV04','Pham Thi D'),
('SV05','Hoang Van E');

CREATE TABLE LopHoc (
    KYHIEU VARCHAR(10) PRIMARY KEY,
    TENMONHOC VARCHAR(50),
    THOIGIAN VARCHAR(20)
);

INSERT INTO LopHoc VALUES
('L01','Cơ sở dữ liệu','Mon-Wed'),
('L02','Mạng máy tính','Tue-Thu'),
('L03','Lập trình C','Mon-Fri'),
('L04','Giải tích','Sat'),
('L05','Java nâng cao','Sun');

CREATE TABLE GiaoVien (
    MAGV VARCHAR(10) PRIMARY KEY,
    TENGV VARCHAR(50)
);

INSERT INTO GiaoVien VALUES
('GV01','Thầy Nam'),
('GV02','Cô Hương'),
('GV03','Thầy Hải'),
('GV04','Cô Trang'),
('GV05','Thầy Bình');


-- 2.2 CSDL QLSinhVien
CREATE TABLE SinhVien (
    MaSV VARCHAR(10) PRIMARY KEY,
    Ten_SV VARCHAR(50),
    Gioi_tinh VARCHAR(10),
    Dia_chi VARCHAR(100),
    Ngay_sinh DATE
);

INSERT INTO SinhVien VALUES
('SV01','Nguyen Van A','Nam','Ha Noi','2002-01-01'),
('SV02','Tran Thi B','Nu','Hai Phong','2002-03-12'),
('SV03','Le Van C','Nam','Nam Dinh','2001-07-22'),
('SV04','Pham Thi D','Nu','Ha Nam','2003-05-11'),
('SV05','Hoang Van E','Nam','Thai Binh','2002-12-02');

CREATE TABLE MonHoc (
    MaMH VARCHAR(10) PRIMARY KEY,
    Ten_mon VARCHAR(50),
    Chuyen_nganh VARCHAR(50),
    So_hoc_trinh INT
);

INSERT INTO MonHoc VALUES
('MH01','CSDL','CNTT',3),
('MH02','Java','CNTT',4),
('MH03','Toan cao cap','Toan',3),
('MH04','Triet hoc','KHXH',2),
('MH05','Kinh tế vĩ mô','Kinh tế',3);

CREATE TABLE BangDiem (
    MaSV VARCHAR(10),
    Ma_mon VARCHAR(10),
    Diem FLOAT,
    PRIMARY KEY (MaSV, Ma_mon),
    FOREIGN KEY (MaSV) REFERENCES SinhVien(MaSV),
    FOREIGN KEY (Ma_mon) REFERENCES MonHoc(MaMH)
);

INSERT INTO BangDiem VALUES
('SV01','MH01',8.5),
('SV02','MH02',7.0),
('SV03','MH03',6.5),
('SV04','MH04',9.0),
('SV05','MH05',8.0);

CREATE TABLE GiaoVien (
    MaGV VARCHAR(10) PRIMARY KEY,
    Ten_GV VARCHAR(50),
    Chuyen_nganh VARCHAR(50),
    Dia_chi VARCHAR(100),
    Dien_thoai VARCHAR(20)
);

INSERT INTO GiaoVien VALUES
('GV01','Thay Nam','CNTT','Ha Noi','0912345678'),
('GV02','Co Lan','CNTT','Hai Duong','0923456789'),
('GV03','Thay Son','Toan','Ha Noi','0934567891'),
('GV04','Co Mai','KHXH','Ha Nam','0945678912'),
('GV05','Co Huong','Kinh te','Ha Noi','0956789123');

CREATE TABLE GV_DAY (
    MaGV VARCHAR(10),
    MaMH VARCHAR(10),
    PRIMARY KEY (MaGV, MaMH),
    FOREIGN KEY (MaGV) REFERENCES GiaoVien(MaGV),
    FOREIGN KEY (MaMH) REFERENCES MonHoc(MaMH)
);

INSERT INTO GV_DAY VALUES
('GV01','MH01'),
('GV01','MH02'),
('GV03','MH03'),
('GV04','MH04'),
('GV05','MH05');

-- 2.3 CSDL QLNhanVien
CREATE TABLE Phongban (
    MAPB VARCHAR(10) PRIMARY KEY,
    TENPB VARCHAR(50)
);

INSERT INTO Phongban VALUES
('PB01','Hanh chinh'),
('PB02','Ke toan'),
('PB03','Kinh doanh'),
('PB04','Nhan su'),
('PB05','IT');
CREATE TABLE Nhanvien (
    MANV VARCHAR(10) PRIMARY KEY,
    HOTEN VARCHAR(50),
    NGAYSINH DATE,
    PHAI VARCHAR(5),
    DIACHI VARCHAR(100),
    MAPB VARCHAR(10),
    FOREIGN KEY (MAPB) REFERENCES Phongban(MAPB)
);

INSERT INTO Nhanvien VALUES
('NV01','Nguyen Van A','1990-01-01','Nam','Hanoi','PB01'),
('NV02','Le Thi B','1992-05-12','Nu','Haiphong','PB02'),
('NV03','Tran Van C','1995-07-23','Nam','Namdinh','PB03'),
('NV04','Pham Thi D','1998-03-14','Nu','Hanoi','PB04'),
('NV05','Hoang Van E','1993-09-19','Nam','Haiphong','PB05');
CREATE TABLE Congtrinh (
    MACT VARCHAR(10) PRIMARY KEY,
    TENCT VARCHAR(50),
    DIADIEM VARCHAR(100),
    NGAYCAPGP DATE,
    NGAYKC DATE
);

INSERT INTO Congtrinh VALUES
('CT01','Xay cau A','Ha Noi','2020-01-01','2020-03-01'),
('CT02','Nha van hoa B','Hai Phong','2021-02-15','2021-05-01'),
('CT03','Truong hoc C','Nam Dinh','2019-04-20','2019-06-10'),
('CT04','Benh vien D','Ha Nam','2022-08-12','2022-10-05'),
('CT05','Khu do thi E','Hai Duong','2023-01-19','2023-04-02');

CREATE TABLE Cong (
    MACT VARCHAR(10),
    MANV VARCHAR(10),
    SLNGAYCONG INT,
    PRIMARY KEY (MACT, MANV),
    FOREIGN KEY (MACT) REFERENCES Congtrinh(MACT),
    FOREIGN KEY (MANV) REFERENCES Nhanvien(MANV)
);

INSERT INTO Cong VALUES
('CT01','NV01',20),
('CT02','NV02',18),
('CT03','NV03',22),
('CT04','NV04',25),
('CT05','NV05',15);


-- 2.4 CSDL QLThuVien
CREATE TABLE Docgia (
    MADG VARCHAR(10) PRIMARY KEY,
    HOTEN VARCHAR(50),
    NGAYSINH DATE,
    DIACHI VARCHAR(100),
    NGHENGHIEP VARCHAR(50)
);

INSERT INTO Docgia VALUES
('DG01','Nguyen An','2000-02-14','Ha Noi','Sinh vien'),
('DG02','Tran Binh','1998-05-20','Hai Duong','Giao vien'),
('DG03','Le Chi','1995-07-11','Hai Phong','Ky su'),
('DG04','Pham Dung','2001-08-02','Nam Dinh','Sinh vien'),
('DG05','Hoang Giang','1999-10-25','Ha Nam','Nhan vien');
CREATE TABLE Sach (
    MASH VARCHAR(10) PRIMARY KEY,
    TENSACH VARCHAR(100),
    TACGIA VARCHAR(50),
    NHAXB VARCHAR(50),
    NAMXB INT
);

INSERT INTO Sach VALUES
('S01','Lập trình C','Nguyen Tuan','Giao duc',2019),
('S02','Cấu trúc dữ liệu','Pham Long','Giao duc',2020),
('S03','Mạng máy tính','Tran Linh','Tre',2018),
('S04','Java cơ bản','Le Hoa','Tuoi Tre',2021),
('S05','SQL nâng cao','Hoang Nam','Giao Thong',2022);
CREATE TABLE Dausach (
    MADAUSACH VARCHAR(10) PRIMARY KEY,
    BAN INT,
    TAP INT,
    MASH VARCHAR(10),
    FOREIGN KEY (MASH) REFERENCES Sach(MASH)
);

INSERT INTO Dausach VALUES
('DS01',1,1,'S01'),
('DS02',1,2,'S02'),
('DS03',1,1,'S03'),
('DS04',1,1,'S04'),
('DS05',1,3,'S05');
CREATE TABLE Phieumuon (
    SOPM VARCHAR(10) PRIMARY KEY,
    NGAYMUON DATE,
    MADG VARCHAR(10),
    FOREIGN KEY (MADG) REFERENCES Docgia(MADG)
);

INSERT INTO Phieumuon VALUES
('PM01','2024-03-01','DG01'),
('PM02','2024-03-05','DG02'),
('PM03','2024-03-10','DG03'),
('PM04','2024-03-12','DG04'),
('PM05','2024-03-15','DG05');
CREATE TABLE Chitietmuon (
    SOPM VARCHAR(10),
    MADAUSACH VARCHAR(10),
    NGAYTRA DATE,
    PRIMARY KEY (SOPM, MADAUSACH),
    FOREIGN KEY (SOPM) REFERENCES Phieumuon(SOPM),
    FOREIGN KEY (MADAUSACH) REFERENCES Dausach(MADAUSACH)
);

INSERT INTO Chitietmuon VALUES
('PM01','DS01','2024-03-20'),
('PM02','DS02','2024-03-25'),
('PM03','DS03','2024-03-29'),
('PM04','DS04','2024-04-02'),
('PM05','DS05','2024-04-05');

-- 2.5 CSDL QLDuAn


CREATE TABLE DONVI (
    MaSoDV INT PRIMARY KEY,
    TenDV VARCHAR(100),
    MaSoNQL INT,
    NgayBatDau DATE
);

INSERT INTO DONVI VALUES
(1, 'Phòng Kế Toán', 100, '2020-01-10'),
(2, 'Phòng Nhân Sự', 101, '2019-06-01'),
(3, 'Phòng Kỹ Thuật', 102, '2018-03-05'),
(4, 'Phòng Dự Án', 103, '2021-09-15'),
(5, 'Phòng CNTT', 104, '2022-02-20');


CREATE TABLE NHANVIEN (
    MaSoNV INT PRIMARY KEY,
    HoDem VARCHAR(50),
    Ten VARCHAR(50),
    NgaySinh DATE,
    DiaChi VARCHAR(200),
    Luong DECIMAL(15,2),
    GioiTinh VARCHAR(10),
    MaSoNGS INT,
    MaSoDV INT,
    FOREIGN KEY (MaSoDV) REFERENCES DONVI(MaSoDV)
);

INSERT INTO NHANVIEN VALUES
(10, 'Nguyen Van', 'A', '1990-01-01', 'Hà Nội', 15000000, 'Nam', NULL, 1),
(11, 'Tran Thi',  'B', '1992-03-12', 'Hải Phòng', 12000000, 'Nữ', NULL, 2),
(12, 'Le Van',    'C', '1988-07-21', 'Đà Nẵng', 18000000, 'Nam', NULL, 3),
(13, 'Pham Thi',  'D', '1995-09-09', 'HCM', 11000000, 'Nữ', NULL, 4),
(14, 'Hoang Van', 'E', '1985-11-30', 'Cần Thơ', 20000000, 'Nam', NULL, 5);


CREATE TABLE DUAN (
    MaDA INT PRIMARY KEY,
    TenDA VARCHAR(200),
    DiaDiemDA VARCHAR(200),
    MaSoDV INT,
    FOREIGN KEY (MaSoDV) REFERENCES DONVI(MaSoDV)
);

INSERT INTO DUAN VALUES
(101, 'Xây dựng phần mềm quản lý', 'Hà Nội', 5),
(102, 'Dự án ERP', 'HCM', 4),
(103, 'Hệ thống mạng nội bộ', 'Đà Nẵng', 3),
(104, 'Phần mềm kế toán', 'Hà Nội', 1),
(105, 'Cải tiến nhân sự', 'Hải Phòng', 2);


CREATE TABLE NHANVIEN_DUAN (
    MaSoNV INT,
    MaSoDA INT,
    SoGio INT,
    PRIMARY KEY (MaSoNV, MaSoDA),
    FOREIGN KEY (MaSoNV) REFERENCES NHANVIEN(MaSoNV),
    FOREIGN KEY (MaSoDA) REFERENCES DUAN(MaDA)
);

INSERT INTO NHANVIEN_DUAN VALUES
(10, 101, 120),
(11, 105, 80),
(12, 103, 150),
(13, 102, 60),
(14, 104, 200);


CREATE TABLE PHUTHUOC (
    MaSoNV INT,
    TenCon VARCHAR(100),
    GioiTinh VARCHAR(10),
    NgaySinh DATE,
    PRIMARY KEY (MaSoNV, TenCon),
    FOREIGN KEY (MaSoNV) REFERENCES NHANVIEN(MaSoNV)
);

INSERT INTO PHUTHUOC VALUES
(10, 'Nguyen B', 'Nam', '2015-05-10'),
(11, 'Tran C', 'Nữ', '2016-07-20'),
(12, 'Le D', 'Nam', '2013-11-01'),
(13, 'Pham E', 'Nữ', '2018-01-15'),
(14, 'Hoang F', 'Nam', '2014-09-25');


CREATE TABLE DONVI_DIADIEM (
    MaSoDV INT,
    DiaDiemDV VARCHAR(200),
    PRIMARY KEY (MaSoDV, DiaDiemDV),
    FOREIGN KEY (MaSoDV) REFERENCES DONVI(MaSoDV)
);

INSERT INTO DONVI_DIADIEM VALUES
(1, 'Hà Nội'),
(2, 'Hải Phòng'),
(3, 'Đà Nẵng'),
(4, 'HCM'),
(5, 'Cần Thơ');

