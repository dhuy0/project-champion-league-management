
USE V_League
SELECT * FROM GIAOVIEN WHERE hoten = 'Nga'
SELECT * FROM CAUTHU
SELECT * FROM DOIBONG
SELECT * FROM TranDau
SELECT * FROM BanThang



SELECT CT.MaCauThu, CT.TenCauThu, CT.TenDoiBong, CT.LoaiCauThu, Count(*) AS 'Số bàn thắng' FROM CauThu AS CT JOIN BanThang AS BT ON CT.MaCauThu = BT.MaCauThu AND
    CT.TenDoiBong = BT.TenDoiBong JOIN TranDau AS TD ON BT.MaTranDau = TD.MaTranDau
    WHERE Ngay = '12-12-2023'
    GROUP BY CT.MaCauThu, CT.TenCauThu, CT.TenDoiBong, CT.LoaiCauThu

