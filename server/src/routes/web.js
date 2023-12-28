import express from "express";
import homeController from "../controller/homeController";
const router = express.Router();

/**
 *
 * @param {*} app : express app
 */

const initWebRoutes = (app) => {
  //router.get("/", homeController.handleHome);
  //router.get("/user", homeController.handleUserPage);
  // Trang Đăng ký đội bóng
  router.post("/reg", homeController.handleReg);

  //Đang làm
  // Trang tra cứu thông tin cầu thủ
  router.get("/get", homeController.handleGetAllInfoPlayer);
  router.get("/get-by-id/:id", homeController.handleGetInfoPlayer);
  router.get("/get-by-name/:name", homeController.handleGetInfoPlayerByName);
  router.get("/get-by-date/:date", homeController.handleGetInfoPlayerByDate);
  router.get("/get-scorer-by-date/:date", homeController.handleGetScorerInfoPlayerByDate);

  // Trang Update đội bóng
  router.get("/update", homeController.handleGetAllTeam); // Xuất các đội bóng có trong CSDL --Xong
  router.put("/update", homeController.handleUpdateTeam); // Thay đổi hồ sơ đội bóng --Xong

  router.post("/update", homeController.handleUpdateTeam); // Thêm thành viên vô đội bóng
  router.delete("/update", homeController.handleUpdateTeam); // Xóa thành viên ra đội bóng

  // Trang ghi nhận kết quả
  router.get("/submit", homeController.handleGetInfoGame);
  router.post("/submit", homeController.handleUpdateSchedule);

  router.post("/submit/goal", homeController.handleGoal);
  //router.get("/player", homeController.handlePlayer);

  return app.use("/", router);
};

export default initWebRoutes;
