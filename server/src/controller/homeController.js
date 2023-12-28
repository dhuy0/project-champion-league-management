const { MAX } = require("mssql");
const { conn, sql } = require("../connect.js");

const getPlayerNumber = (item) => {
  return item.playerNumber;
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
  const data = req.body.registrationData;
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
  var playerNumber = data.players.map(getPlayerNumber).join(",");

  // console.log(playerNumber);
  var sqlCheck =
    "SELECT COUNT(*) as cnt FROM CauThu WHERE MaCauThu in (" +
    playerNumber +
    ")";
  const checkPlayer = await pool.request().query(sqlCheck);
  console.log(checkPlayer.recordset[0].cnt);
  if (checkPlayer.recordset[0].cnt) {
    console.log({ message: "da ton tai" });
    return res.status(500).json({ message: "da ton tai" }); // Có -> return lỗi
  }
  // Chạy query thêm vào CSDL

  const table = new sql.Table("CauThu");

  table.create = true;
  table.columns.add("MaCauThu", sql.Int, { nullable: false });
  table.columns.add("TenDoiBong", sql.VarChar(MAX), { nullable: true });
  table.columns.add("TenCauThu", sql.VarChar(MAX), { nullable: true });
  table.columns.add("LoaiCauThu", sql.VarChar(MAX), { nullable: true });
  table.columns.add("NgaySinh", sql.Date, { nullable: true });
  table.columns.add("GhiChu", sql.VarChar(MAX), { nullable: true });

  data.players.forEach((data) => {
    table.rows.add(
      parseInt(data.playerNumber),
      req.body.registrationData.teamName,
      data.playerName,
      data.playerType,
      data.birthday,
      data.note
    );
  });
  console.log(">>>>> updated data in CAUTHU");
  console.log(">>> check table", table);
  // var sqlString = `INSERT INTO CAUTHU(id, hoten, loai, ngaysinh, ghichu)
  // VALUES(@varId, @varHoten, @varLoai, @varNgaySinh, @varGhiChu)`;
  // var text;
  // for (i = 0; i < playerNumber.length(); i++) {
  //   text += '(' + data.players[i].playerNumber + ',';
  //   text += data.players[i].playerType + ',';
  //   text += data.players[i].playerName + ',';
  //   text += data.players[i].birthday + ',';
  //   text += data.players[i].note + ')';
  // }
  try {
    const test = await pool.request();
    const result = await test.bulk(table);
    console.log(result);
    console.log(table);
    // if (test.rowsAffected == 1) {
    //   res.status(200).json({ message: "Thêm thành công" });
    // } else {
    //   res.status(500).json({ message: "Không thành công" });
    //   console.log(error.message);
    // }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Có lỗi xảy ra" });
  }
};

// Làm tạm
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

const handleGetInfoPlayer = async (req, res) => {
  try {
    const name = req.params.id;
    var pool = await conn;
    var sqlString = `SELECT * FROM CauThu WHERE TenCauThu = @varName`;
    const result = await pool
      .request()
      .input("varName", sql.NChar(10), name)
      .query(sqlString);
    if (result.rowsAffected > 0) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "Không tìm thấy" });
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

// const handle

// làm
const handleAddSchedule = async (req, res) => {
  try {
/*
    const idFind = req.params.id;
    var pool = await conn;
    var sqlString = `SELECT * FROM CAUTHU WHERE id = @varName`;
    const result = await pool
      .request()
      .input("varName", sql.NChar(10), idFind)
      .query(sqlString);
    if (result.rowsAffected > 0) {
      res.status(200).json(result.recordset);
    } else {
      res.status(404).json({ message: "Không tìm thấy" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const handleGetInfoPlayerByName = async (req, res) => {
  try {
    const name = req.params.name;
    var pool = await conn;
    var sqlString = `SELECT * FROM CAUTHU WHERE hoten = @varName`;
*/
    const data = req.body;
    var pool = await conn;
    var sqlString = `INSERT INTO TranDau(MaTranDau, VongDau, TenDoi1, TenDoi2, SanDau, Ngay, Gio)
    VALUES(@varId, @varRound, @varName1, @varName2, @varField, @varDate, @varTime)`;

    const result = await pool
      // Chỉnh lại biến theo front end
      .request()
      .input("varId", sql.VarChar(255), data.teamName)
      .input("varRound", sql.Int, data.stadium)
      .input("varName1", sql.VarChar(255), data.stadium)
      .input("varName2", sql.VarChar(255), data.stadium)
      .input("varField", sql.VarChar(255), data.stadium)
      .input("varDate", sql.Date, data.stadium)
      .input("varTime", sql.Time, data.stadium)
      .query(sqlString);
    if (result.rowsAffected > 0) {
      res.status(200).json(result.recordset);
    } else {
      res.status(404).json({ message: "Không tìm thấy" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

function convertDateFormat(inputDate) {
  // Sử dụng phương thức split để tách ngày, tháng, năm
  const dateParts = inputDate.split('-');
  
  // Sắp xếp lại các thành phần theo định dạng mới
  const formattedDate = dateParts.join('/');
  
  return formattedDate;
}

const handleGetInfoPlayerByDate = async (req, res) => {
  try {
    const date = convertDateFormat(req.params.date);
    console.log(">>>> check date: ", date)
    var pool = await conn;
    var sqlString = `SET DATEFORMAT dmy SELECT * FROM BANGXEPHANG WHERE ngay = '${date}'`;
    const result = await pool
      .request()
      .query(sqlString);
      console.log(result)
      console.log(">>>> check date: ", date)
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
    console.log(">>>> check date: ", date)
    var pool = await conn;
    var sqlString = `SET DATEFORMAT dmy SELECT * FROM DANHSACHGHIBAN WHERE ngay = '${date}'`;
    const result = await pool
      .request()
      .query(sqlString);
      console.log(result)
      console.log(">>>> check date: ", date)
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
    var pool = await conn;
    var sqlString = `SELECT * FROM TranDau`;
    const result = await pool
      .request()
      // Chỉnh lại biến theo front end
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

module.exports = {
  handleHome,
  handleUserPage,
  handleReg,
  handleGetInfoPlayer,
  handleUpdateTeam,
  handleGetAllInfoPlayer,

  handleGetInfoPlayerByName,
  handleGetInfoPlayerByDate,
  handleGetScorerInfoPlayerByDate,

  handleGetAllTeam,
  handleAddSchedule,
  handleUpdateSchedule,
  handleGetInfoGame,
  handleGoal,

};
