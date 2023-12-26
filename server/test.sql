USE QLLopHoc
SELECT * FROM GIAOVIEN WHERE hoten = 'Nga'
SELECT * FROM CAUTHU

CREATE TABLE DOIBONG(
  tendoi varchar(255),
  sannha varchar(255),
  PRIMARY KEY(tendoi)
)

CREATE TABLE CAUTHU(
  id int,
  hoten VARCHAR (255),
  loai VARCHAR (255),
  ngaysinh DATE,
  ghichu varchar (255),
  PRIMARY KEY(id)
)

