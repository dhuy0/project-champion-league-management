
USE V_League
SELECT * FROM GIAOVIEN WHERE hoten = 'Nga'
SELECT * FROM CAUTHU
SELECT * FROM DOIBONG
SELECT * FROM TranDau
SELECT * FROM BanThang
select * from QuyDinh

SELECT db.MaDoiBong, db.TenDoiBong,  db.SoTranThang, db.SoTranHoa, db.SoTranThua, db.HieuSo, DENSE_RANK() OVER(ORDER BY HieuSo DESC) Hang
FROM DoiBong db JOIN TranDau td ON db.TenDoiBong = td.TenDoi1 OR db.TenDoiBong = td.TenDoi2
                    
SELECT TenDoi1, TenDoi2 FROM TranDau

INSERT into DoiBong (MaDoiBong, TenDoiBong, SanNha, SoTranThang, SoTranHoa, SoTranThua, HieuSo, Diem, Hang) VALUES (1, N'SLNA', N'Vinh', 9, 2, 1, 1, 29, NULL)

SET IDENTITY_INSERT DoiBong ON
SELECT CT.MaCauThu, CT.TenCauThu, CT.TenDoiBong, CT.LoaiCauThu, Count(*) AS 'Số bàn thắng' FROM CauThu AS CT JOIN BanThang AS BT ON CT.MaCauThu = BT.MaCauThu AND
    CT.TenDoiBong = BT.TenDoiBong JOIN TranDau AS TD ON BT.MaTranDau = TD.MaTranDau
    WHERE Ngay = '12-12-2023'
    GROUP BY CT.MaCauThu, CT.TenCauThu, CT.TenDoiBong, CT.LoaiCauThu

