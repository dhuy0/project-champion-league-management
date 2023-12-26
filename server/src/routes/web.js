import express from "express";
import homeController from "../controller/homeController";
const router = express.Router();

/**
 *
 * @param {*} app : express app
 */

const initWebRoutes = (app) => {
  router.get("/", homeController.handleHome);
  router.get("/user", homeController.handleUserPage);

  // Đăng ký đội bóng
  router.post("/reg", homeController.handleReg);

  // Lấy thông tin cầu thủ
  router.get("/get", homeController.handleGetAllInfoPlayer);
  router.get("/get/:name", homeController.handleGetInfoPlayer);

  // Update đội bóng
  router.get("/update", homeController.handleGetAllTeam); // Xuất các đội bóng có trong CSDL --Xong
  router.put("/update", homeController.handleUpdateTeam); // Thay đổi hồ sơ đội bóng --Xong

  router.post("/update", homeController.handleUpdateTeam); // Thêm thành viên vô đội bóng
  router.delete("/update", homeController.handleUpdateTeam); // Xóa thành viên ra đội bóng

  //router.get("/player", homeController.handlePlayer);

  return app.use("/", router);
};

export default initWebRoutes;
