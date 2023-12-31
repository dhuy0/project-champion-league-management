const { MAX } = require("mssql");
const { conn, sql } = require("../connect.js");

const getPlayerNumber = (item) => {
  return item.number;
};

const handleHome = (req, res) => {
  const name = "";
  return res.render("home.ejs", { name });
};

const handleUserPage = async (req, res) => {
  const { id } = req.body;
  var pool = await conn;
  var sqlString = "SELECT * FROM GIAOVIEN WHERE magv = " + id;
  try {
    const result = await pool.request().query(sqlString);
    const patient = result.recordset[0];
    console.log(patient);
    if (patient) {
      res.status(200).json(patient);
    } else {
      res.status(404).json({ message: "Không tìm thấy thông tin bệnh nhân" });
    }
  } catch (error) {
    console.error("Có lỗi xảy ra khi lấy thông tin bệnh nhân:", error);
    res
      .status(500)
      .json({ message: "Có lỗi xảy ra khi lấy thông tin bệnh nhân" });
  }
};

const handleReg = async (req, res) => {
  // Add đội bóng
  const data = req.body;
  console.log(data);
  var pool = await conn;
  // CHECK đã có đội bóng trong CSDL chưa?
  var sqlCheck = `SELECT COUNT(*) as cnt FROM DoiBong WHERE TenDoiBong = @varName`;
  const checkTeam = await pool
    .request()
    .input("varName", sql.NChar(255), data.teamName)
    .query(sqlCheck);

  if (!checkTeam.recordset[0].cnt) {
    console.log(checkTeam.recordset[0].cnt);
    var sqlString = `INSERT INTO DoiBong(TenDoiBong, SanNha)
    VALUES(@varName, @varField)`;
    try {
      const result = await pool
        .request()
        .input("varName", sql.VarChar(255), data.teamName)
        .input("varField", sql.VarChar(255), data.stadium)
        .query(sqlString);
      console.log(result.rowsAffected);
      console.log("Thêm Thành Công");

      // } else {
      //   return res.status(500).json({ message: "Không thành công" });
      // }
    } catch (error) {
      //console.error("Có lỗi xảy ra khi lấy thông tin bệnh nhân:", error);
      console.log(error.message);
      return res.status(500).json({ message: "Có lỗi xảy ra" });
    } // Có return lỗi
  }

  // Add cầu thủ
  // CHECK đã có trong CSDL chưa?

  console.log(">>>>> checking data in CAUTHU");
  console.log(data);
  var playerNumber = data.players.map(getPlayerNumber).join(",");
  var sqlCheck =
    "SET DATEFORMAT dmy SELECT COUNT(*) as cnt FROM CauThu WHERE MaCauThu in (" +
    playerNumber +
    ") AND TenDoiBong = @varTeamName";
  const checkPlayer = await pool
    .request()
    .input("varTeamName", sql.VarChar(MAX), data.teamName)
    .query(sqlCheck);
  console.log(checkPlayer.recordset[0].cnt);
  if (checkPlayer.recordset[0].cnt) {
    console.log({ message: "Đã tồn tại" });
    return res.status(500).json({ message: "Đã tồn tại" }); // Có -> return lỗi
  }
  // Chạy query thêm vào CSDL

  const table = new sql.Table("CauThu");

  table.create = true;
  table.columns.add("MaCauThu", sql.VarChar(MAX), { nullable: false });
  table.columns.add("TenDoiBong", sql.NVarChar(MAX), { nullable: false });
  table.columns.add("TenCauThu", sql.NVarChar(MAX), { nullable: false });
  table.columns.add("LoaiCauThu", sql.NVarChar(MAX), { nullable: false });
  table.columns.add("TongSoBanThang", sql.Int, { nullable: false });
  table.columns.add("NgaySinh", sql.Date, { nullable: false });
  table.columns.add("GhiChu", sql.NVarChar(MAX), { nullable: true });

  console.log(stringToDate(data.players[0].birthday));

  data.players.forEach((data) => {
    table.rows.add(
      data.number,
      req.body.teamName,
      data.name,
      data.type,
      0,
      stringToDate(data.birthday),
      data.note
    );
  });
  console.log(">>>>> updated data in CAUTHU");
  console.log(">>> check table", table);
  try {
    const test = await pool.request();
    const result = await test.bulk(table);
    console.log(result);
    if (result.rowsAffected > 0) {
      console.log("Thêm Thành Công");
      return res.status(200).json({ message: "Thêm thành công" });
    } else {
      console.log(error.message);
      return res.status(500).json({ message: "Không thành công" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Có lỗi xảy ra" });
  }
};

const handleGetAllTeam = async (req, res) => {
  try {
    var pool = await conn;

    var sqlString = `SELECT * FROM DoiBong`;

    const result = await pool.request().query(sqlString);
    console.log(result.recordset);
    if (result.rowsAffected > 0) {
      res.status(200).json(result.recordset);
    } else {
      res.status(404).json({ message: "Không có dữ liệu" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const handleUpdateTeam = async (req, res) => {
  try {
    const data = req.body;
    var pool = await conn;

    // Update cầu thủ
    var sqlString = `UPDATE CauThu
    SET TenCauThu = @varHoTen, TenDoiBong = @varTenDoi, LoaiCauThu = @varLoai, NgaySinh = @varNgaySinh, GhiChu = @varGhiChu 
    WHERE MaCauThu = @varId AND TenDoiBong = @varTenDoi`;
    for (let i = 0; i < data.length; i++) {
      try {
        const result = await pool
          .request()
          .input("varHoTen", sql.VarChar(MAX), data[i].playerName)
          .input("varTenDoi", sql.VarChar(MAX), data[i].teamName) // Client gửi về thêm lần nữa !!!
          .input("varLoai", sql.VarChar(MAX), data[i].type)
          .input("varNgaySinh", sql.Date, data[i].birthDay)
          .input("varGhiChu", sql.VarChar(MAX), data[i].note)
          .input("varId", sql.Int, parseInt(data[i].id))
          .query(sqlString);
        console.log(req.body);
        console.log(result);
        if (result.rowsAffected > 0) {
          console.log({ message: "Update thành công" });
        } else {
          throw new Error();
        }
      } catch (err) {
        return res.status(404).json({ message: "Không tìm thấy" });
      }
    }
    return res.status(200).json({ message: "OK" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const handleAddPlayerToTeam = async (req, res) => {
  try {
    const data = req.body;
    var pool = await conn;

    // Update cầu thủ
    // var sqlString = `INSERT CauThu
    // SET TenCauThu = @varHoTen, TenDoiBong = @varTenDoi, LoaiCauThu = @varLoai, NgaySinh = @varNgaySinh, GhiChu = @varGhiChu
    // WHERE MaCauThu = @varId AND TenDoiBong = @varTenDoi`;

    var sqlCheck = `UPDATE CauThu
    SET TenCauThu = @varHoTen, TenDoiBong = @varTenDoi, LoaiCauThu = @varLoai, NgaySinh = @varNgaySinh, GhiChu = @varGhiChu 
    WHERE MaCauThu = @varId AND TenDoiBong = @varTenDoi`;

    const result = await pool.request().query(sqlCheck);

    for (let i = 0; i < data.length; i++) {
      try {
        const result = await pool
          .request()
          .input("varHoTen", sql.VarChar(MAX), data[i].playerName)
          .input("varTenDoi", sql.VarChar(MAX), data[i].teamName) // Client gửi về thêm lần nữa !!!
          .input("varLoai", sql.VarChar(MAX), data[i].type)
          .input("varNgaySinh", sql.Date, data[i].birthDay)
          .input("varGhiChu", sql.VarChar(MAX), data[i].note)
          .input("varId", sql.Int, parseInt(data[i].id))
          .query(sqlString);
        console.log(req.body);
        console.log(result);
        if (result.rowsAffected > 0) {
          console.log({ message: "Update thành công" });
        } else {
          throw new Error();
        }
      } catch (err) {
        return res.status(404).json({ message: "Không tìm thấy" });
      }
    }
    return res.status(200).json({ message: "OK" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const handleGetAllInfoPlayer = async (req, res) => {
  try {
    var pool = await conn;
    var sqlString = `SELECT * FROM CauThu`;
    const result = await pool.request().query(sqlString);
    console.log(result.recordset);
    if (result.rowsAffected > 0) {
      res.status(200).json(result.recordset);
    } else {
      res.status(404).json({ message: "Không có dữ liệu" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const handleGetInfoPlayerByName = async (req, res) => {
  try {
    const name = req.params.name;
    var pool = await conn;
    var sqlString =
      "SELECT * FROM CauThu WHERE TenCauThu LIKE '%" + name + "%'";
    console.log(sqlString);
    const result = await pool.request().query(sqlString);
    console.log(result);
    if (result.rowsAffected > 0) {
      res.status(200).json(result.recordset);
    } else {
      res.status(404).json({ message: "Không tìm thấy" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

// làm

function convertDateFormat(inputDate) {
  // Sử dụng phương thức split để tách ngày, tháng, năm
  const dateParts = inputDate.split("-");

  // Sắp xếp lại các thành phần theo định dạng mới
  const formattedDate = dateParts.join("/");

  return formattedDate;
}
function stringToDate(inputDate) {
  // Sử dụng phương thức split để tách ngày, tháng, năm
  var doo = new Date(inputDate);
  var formattedDate = new Date(
    doo.getTime() + Math.abs(doo.getTimezoneOffset() * 60000)
  );
  return formattedDate;
}

const handleGetInfoPlayerByDate = async (req, res) => {
  try {
    const date = convertDateFormat(req.params.date);
    console.log(">>>> check date: ", date);
    var pool = await conn;
    var sqlString = `SET DATEFORMAT dmy SELECT * FROM BANGXEPHANG WHERE ngay = '${date}'`;
    const result = await pool.request().query(sqlString);
    console.log(result);
    console.log(">>>> check date: ", date);
    if (result.rowsAffected > 0) {
      res.status(200).json(result.recordset);
    } else {
      res.status(404).json({ message: "Không tìm thấy" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const handleGetScorerInfoPlayerByDate = async (req, res) => {
  try {
    const date = convertDateFormat(req.params.date);
    console.log(">>>> check date: ", date);
    var pool = await conn;
    var sqlString = `SET DATEFORMAT dmy SELECT * FROM DANHSACHGHIBAN WHERE ngay = '${date}'`;
    const result = await pool.request().query(sqlString);
    console.log(result);
    console.log(">>>> check date: ", date);
    if (result.rowsAffected > 0) {
      res.status(200).json(result.recordset);
    } else {
      res.status(500).json({ message: "đã có lỗi xảy ra" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const handleGetRoundFromGame = async (req, res) => {
  try {
    var pool = await conn;
    var sqlString = `SELECT DISTINCT(VongDau) FROM TranDau`;
    const result = await pool
      .request()
      // Chỉnh lại biến theo front end
      .query(sqlString);
    console.log(result.recordset);
    if (result.rowsAffected > 0) {
      res.status(200).json(result.recordset);
    } else {
      res.status(500).json({ message: "đã có lỗi xảy ra" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const handleGetRoundFromGameId = async (req, res) => {
  try {
    const id = req.params.id;
    var pool = await conn;
    var sqlString = `SELECT DISTINCT(VongDau) FROM TranDau WHERE MaTranDau = @varId`;
    const result = await pool
      .request()
      .input("varId", sql.VarChar(MAX), id)
      .query(sqlString);
    console.log(result.recordset);
    if (result.rowsAffected > 0) {
      res.status(200).json(result.recordset);
    } else {
      res.status(500).json({ message: "đã có lỗi xảy ra" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const handleGetTeamNameFromRound = async (req, res) => {
  try {
    const round = req.params.round;
    var pool = await conn;
    var sqlString = `SELECT TenDoi1, TenDoi2 FROM TranDau WHERE VongDau = @varRound`;
    const result = await pool
      .request()
      // Chỉnh lại biến theo front end
      .input("varRound", sql.Int, round)
      .query(sqlString);
    console.log(result.recordset);
    if (result.rowsAffected > 0) {
      res.status(200).json(result.recordset);
    } else {
      res.status(500).json({ message: "đã có lỗi xảy ra" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const handleGetTeamName = async (req, res) => {
  try {
    var pool = await conn;
    var sqlString = `SELECT TenDoiBong FROM DoiBong`;
    const result = await pool
      .request()
      // Chỉnh lại biến theo front end
      .query(sqlString);
    console.log(result.recordset);
    if (result.rowsAffected > 0) {
      res.status(200).json(result.recordset);
    } else {
      res.status(500).json({ message: "đã có lỗi xảy ra" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const handleGetInfoGame = async (req, res) => {
  try {
    // console.log(round);
    var pool = await conn;
    var sqlString = `SELECT DISTINCT(MaTranDau) FROM TranDau`;
    const result = await pool.request().query(sqlString);
    console.log(result.recordset);
    if (result.rowsAffected > 0) {
      res.status(200).json(result.recordset);
    } else {
      res.status(500).json({ message: "đã có lỗi xảy ra" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const handleGetInfoGameByRound = async (req, res) => {
  try {
    const round = req.params.round;
    // console.log(round);
    var pool = await conn;
    var sqlString = `SELECT * FROM TranDau WHERE VongDau = @varRound`;
    const result = await pool
      .request()
      .input("varRound", sql.Int, round)
      // Chỉnh lại biến theo front end
      .query(sqlString);
    console.log(result.recordset);
    if (result.rowsAffected > 0) {
      res.status(200).json(result.recordset);
    } else {
      res.status(500).json({ message: "đã có lỗi xảy ra" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const handleGetInfoGameByRoundAndId = async (req, res) => {
  try {
    const round = req.params.round;
    const id = req.params.id;
    console.log(round, id);
    // console.log(round);
    var pool = await conn;
    var sqlString = `SELECT * FROM TranDau WHERE VongDau = @varRound AND MaTranDau = @varId`;
    const result = await pool
      .request()
      .input("varRound", sql.Int, round)
      .input("varId", sql.VarChar(MAX), id)
      .query(sqlString);
    console.log(result.recordset);
    if (result.rowsAffected > 0) {
      res.status(200).json(result.recordset);
    } else {
      res.status(500).json({ message: "đã có lỗi xảy ra" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const handleAddSchedule = async (req, res) => {
  try {
    const data = req.body;
    console.log(data.date, data.time);
    const date = new Date(data.date + " " + data.time);
    console.log(date);
    // console.log(date.toLocaleDateString(), date.toLocaleTimeString());
    var pool = await conn;
    var sqlString = `INSERT INTO TranDau(MaTranDau, VongDau, TenDoi1, TenDoi2, SanDau, Ngay, Gio)
    VALUES(@varId, @varRound, @varName1, @varName2, @varField, @varDate, @varTime)`;

    const result = await pool
      // Chỉnh lại biến theo front end
      .request()
      .input("varId", sql.VarChar(MAX), data.no)
      .input("varRound", sql.Int, data.round)
      .input("varName1", sql.NVarChar(MAX), data.team1)
      .input("varName2", sql.NVarChar(MAX), data.team2)
      .input("varField", sql.NVarChar(MAX), data.pitch)
      .input("varDate", sql.Date, date)
      .input("varTime", sql.Time(7), date)
      .query(sqlString);
    console.log(result);
    if (result.rowsAffected > 0) {
      res.status(200).json(result.recordset);
    } else {
      res.status(404).json({ message: "Không tìm thấy" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const handleUpdateRecord = async (req, res) => {
  try {
    const data = req.body;
    var pool = await conn;
    var sqlString = `UPDATE TranDau
    SET TySoDoi1 = @varScore1, TySoDoi2 = @varScore2
    WHERE MaTranDau = @VarId`;
    const result = await pool
      .request()
      // Chỉnh lại biến theo front end
      .input("varScore1", sql.Int, data.stadium)
      .input("varScore2", sql.Int, data.stadium)
      .input("varId", sql.VarChar(255), data.teamName)
      .query(sqlString);
    if (result.rowsAffected > 0) {
      res.status(200).json(result);
    } else {
      res.status(500).json({ message: "đã có lỗi xảy ra" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const handleGoal = async (req, res) => {
  try {
    const data = req.body;
    var pool = await conn;
    var sqlString = `INSERT INTO BanThang(CauThu, TenDoiBong, LoaiBanThang, ThoiDiem, MaTranDau, VongDau)
    VALUES(@varPlayer, @varTeamName, @varGoalType, @varTime, @varGameId, @varRound)`;
    const result = await pool
      // Chỉnh lại biến theo front end
      .request()
      .input("varPlayer", sql.VarChar(255), data.teamName)
      .input("varTeamName", sql.Int, data.stadium)
      .input("varGoalType", sql.VarChar(255), data.stadium)
      .input("varTime", sql.VarChar(255), data.stadium)
      .input("varGameId", sql.VarChar(255), data.stadium)
      .input("varRound", sql.Date, data.stadium)
      .query(sqlString);
    if (result.rowsAffected > 0) {
      res.status(200).json(result);
    } else {
      res.status(500).json({ message: "đã có lỗi xảy ra" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const handleUpdateRule = async (req, res) => {
  try {
    const data = req.body;
    var pool = await conn;
    var sqlString = `UPDATE QuyDinh
    SET DoTuoi_Min = @varAgeMin, DoTuoi_Max = @varAgeMax, SoCauThu_Min = @varPlayerMin, SoCauThu_Max = @varPlayerMax, SoCauThuNuocNgoai_Max = @varForeignerMax, ThoiDiemGhiBan_Max = @varTimeMax, DiemSoThang = @varWinScore, DiemSoHoa = @varDrawScore, DiemSoThua = @varLooseScore`;
    const result = await pool
      .request()
      // Chỉnh lại biến theo front end
      .input("varAgeMin", sql.Int, data.minAge)
      .input("varAgeMax", sql.Int, data.maxAge)
      .input("varPlayerMin", sql.VarChar(255), data.minPlayers)
      .input("varPlayerMax", sql.Int, data.maxPlayers)
      .input("varForeignerMax", sql.Int, data.maxForeignPlayers)
      .input("varTimeMax", sql.VarChar(255), data.maxGoalTime)
      .input("varWinScore", sql.VarChar(255), data.winPoints)
      .input("varDrawScore", sql.VarChar(255), data.drawPoints)
      .input("varLooseScore", sql.VarChar(255), data.losePoints)
      .query(sqlString);
    if (result.rowsAffected > 0) {
      res.status(200).json(result);
    } else {
      res.status(500).json({ message: "đã có lỗi xảy ra" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const handleUpdateSchedule = async (req, res) => {
  try {
    const data = req.body;
    console.log(data);
    var pool = await conn;
    var sqlString = `UPDATE TranDau
    SET TenDoi1 = @varTeam1, TenDoi2 = @varTeam2, SanDau = @varField, Ngay = @varDate, Gio = @varTime
    WHERE MaTranDau = @varId AND VongDau = @varRound`;
    const result = await pool
      .request()
      // Chỉnh lại biến theo front end
      .input("varTeam1", sql.NVarChar(MAX), data.TenDoi1)
      .input("varTeam2", sql.NVarChar(MAX), data.TenDoi2)
      .input("varField", sql.NVarChar(MAX), data.SanDau)
      .input("varDate", sql.Date, data.Ngay)
      .input("varTime", sql.Time, data.Gio)
      .input("varId", sql.VarChar(MAX), data.no)
      .input("varRound", sql.Int, data.VongDau)
      .query(sqlString);
    console.log(result);
    if (result.rowsAffected > 0) {
      res.status(200).json(result.recordset);
    } else {
      res.status(500).json({ message: "đã có lỗi xảy ra" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const handleGetIdGameFromRound = async (req, res) => {
  try {
    const round = req.params.round;
    var pool = await conn;
    var sqlString = `SELECT MaTranDau FROM TranDau WHERE VongDau = @varRound`;
    const result = await pool
      .request()
      .input("varRound", sql.VarChar(MAX), round)
      .query(sqlString);
    if (result.rowsAffected > 0) {
      console.log(result.recordset);
      res.status(200).json(result.recordset);
    } else {
      res.status(500).json({ message: "đã có lỗi xảy ra" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  handleHome,
  handleUserPage,
  handleReg,
  handleGetInfoPlayerByName,
  handleUpdateTeam,
  handleGetAllInfoPlayer,

  // handleGetInfoPlayerByName,
  handleGetInfoPlayerByDate,
  handleGetScorerInfoPlayerByDate,
  handleGetInfoGameByRound,
  handleGetAllTeam,
  handleAddSchedule,
  handleUpdateSchedule,
  handleGetRoundFromGame,
  handleGoal,
  handleUpdateRule,
  handleGetTeamNameFromRound,
  handleGetTeamName,
  handleGetIdGameFromRound,
  handleUpdateRecord,
  handleGetInfoGame,
  handleGetRoundFromGameId,
  handleGetInfoGameByRoundAndId,
};
