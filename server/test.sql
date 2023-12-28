USE QLLopHoc
SELECT * FROM GIAOVIEN WHERE hoten = 'Nga'
SELECT * FROM CAUTHU
SELECT * FROM DOIBONG

CREATE TABLE DOIBONG(
  tendoi varchar(255),
  sannha varchar(255),
  PRIMARY KEY(tendoi)
)

Create TABLE BANGXEPHANG (
  STT INT,
  DOI VARCHAR (255),
  THANG INT,
  THUA INT,
  HOA INT,
  HIEUSO INT,
  HANG INT,
  NGAY DATE

  PRIMARY KEY(STT)
)

SET DATEFORMAT dmy

insert into BANGXEPHANG(stt, doi, thang, thua, hoa, hieuso, hang, ngay)
values (6, 'dna2', 3, 3, 2, 3, 2, '02/04/2023')



CREATE TABLE DANHSACHGHIBAN (
  STT INT,
  DOI VARCHAR (255),
  LOAICAUTHU VARCHAR (255),
  SOBANTHANG INT,
  NGAY DATE,

  PRIMARY KEY(STT)
)

insert into DANHSACHGHIBAN(STT, DOI, LOAICAUTHU, SOBANTHANG, NGAY)
values (6, 'dna1', 'Trong Nuoc', 2, '31/01/2000')

select * from DANHSACHGHIBAN where NGAY

SELECT * FROM BANGXEPHANG WHERE ngay = '04/02/2023'

CREATE TABLE CAUTHU(
  id int,
  hoten VARCHAR (255),
  loai VARCHAR (255),
  ngaysinh DATE,
  ghichu varchar (255),
  PRIMARY KEY(id)
)

