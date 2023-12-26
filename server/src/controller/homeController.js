const { MAX } = require("mssql");
const { conn, sql } = require("../connect.js");

const getPlayerNumber = (item) => {
  return item.playerNumber;
};

const handleHome = (req, res) => {
  const name = "Khoi";
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
  var sqlCheck = `SELECT COUNT(*) as cnt FROM DOIBONG WHERE tendoi = @varName`;
  const checkTeam = await pool
    .request()
    .input("varName", sql.NChar(255), data.teamName)
    .query(sqlCheck);

  if (!checkTeam.recordset[0].cnt) {
    console.log(checkTeam.recordset[0].cnt);
    var sqlString = `INSERT INTO DOIBONG(tendoi, sannha)
    VALUES(@varId, @varName)`;
    try {
      const result = await pool
        .request()
        .input("varId", sql.VarChar(255), data.teamName)
        .input("varName", sql.VarChar(255), data.stadium)
        .query(sqlString);
      console.log(result.rowsAffected);
      // if (result.rowsAffected == 1) {
      //   return res.status(200).json({ message: "Thêm thành công" });
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
  var playerNumber = data.players.map(getPlayerNumber).join(",");
  // console.log(playerNumber);
  var sqlCheck =
    "SELECT COUNT(*) as cnt FROM CAUTHU WHERE id in (" + playerNumber + ")";
  const checkPlayer = await pool.request().query(sqlCheck);
  console.log(checkPlayer.recordset[0].cnt);
  if (checkPlayer.recordset[0].cnt) {
    console.log({ message: "da ton tai" });
    return res.status(500).json({ message: "da ton tai" }); // Có -> return lỗi
  }
  // Chạy query thêm vào CSDL
  const table = new sql.Table("CAUTHU");
  table.create = true;
  table.columns.add("id", sql.Int, { nullable: false });
  table.columns.add("hoten", sql.VarChar(MAX), { nullable: true });
  table.columns.add("loai", sql.VarChar(MAX), { nullable: true });
  table.columns.add("ngaysinh", sql.Date, { nullable: true });
  table.columns.add("ghichu", sql.VarChar(MAX), { nullable: true });

  data.players.forEach((data) => {
    table.rows.add(
      parseInt(data.playerNumber),
      data.playerName,
      data.playerType,
      data.birthday,
      data.note
    );
  });
  console.log(table);
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

// const handleUpdate
// Làm tạm
const handleUpdateTeam = async (req, res) => {
  try {
    const data = req.body;
    var pool = await conn;
    var sqlString = `UPDATE CAUTHU
    SET hoten = @varHoTen, loai = @varLoai, ngaysinh = @varNgaySinh, ghichu = @varGhiChu 
    WHERE id = @varId`;
    for (let i = 0; i < data.length; i++) {
      try {
        const result = await pool
          .request()
          .input("varHoTen", sql.VarChar(MAX), data[i].playerName)
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
    var sqlString = `SELECT * FROM DOIBONG`;
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

const handleGetAllInfoPlayer = async (req, res) => {
  try {
    var pool = await conn;
    var sqlString = `SELECT * FROM CAUTHU`;
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
    var sqlString = `SELECT * FROM CAUTHU WHERE hoten = @varName`;
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

module.exports = {
  handleHome,
  handleUserPage,
  handleReg,
  handleGetInfoPlayer,
  handleUpdateTeam,
  handleGetAllInfoPlayer,
  handleGetAllTeam,
};
