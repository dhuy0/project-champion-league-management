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
  router.post("/reg", homeController.handleReg);

  router.get("/get", homeController.handleGetAllInfoPlayer);
  router.get("/get-by-id/:id", homeController.handleGetInfoPlayer);
  router.get("/get-by-name/:name", homeController.handleGetInfoPlayerByName);
  router.get("/get-by-date/:date", homeController.handleGetInfoPlayerByDate);
  router.get("/get-scorer-by-date/:date", homeController.handleGetScorerInfoPlayerByDate);

  router.put("/update", homeController.handleUpdateTeam); // Thay đổi hồ sơ đội bóng
  router.post("/update", homeController.handleUpdateTeam); // Thêm thành viên vô đội bóng
  router.delete("/update", homeController.handleUpdateTeam); // Xóa thành viên ra đội bóng

  //router.get("/player", homeController.handlePlayer);

  return app.use("/", router);
};

export default initWebRoutes;
