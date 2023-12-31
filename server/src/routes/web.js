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
  // Trang Chỉnh sửa hồ sơ đội bóng
  router.get("/get-all-team", homeController.handleGetAllTeam); // Xuất các đội bóng có trong CSDL --Xong
  router.put("/update-player-team", homeController.handleUpdateTeam); // Thay đổi hồ sơ đội bóng --Xong
  router.post("/add-player-to-team", homeController.handleUpdateTeam); // Thêm thành viên vô đội bóng
  router.delete("/delete-player-team", homeController.handleUpdateTeam); // Xóa thành viên ra đội bóng

  // Trang tra cứu thông tin cầu thủ
  router.get("/get-all-player", homeController.handleGetAllInfoPlayer);
  router.get(
    "/get-player-by-name/:name",
    homeController.handleGetInfoPlayerByName
  );
  router.get(
    "/get-player-by-team/:team",
    homeController.handleGetInfoPlayerByTeam
  );
  // router.get("/get-by-name/:name", homeController.handleGetInfoPlayerByName);
  router.get(
    "/get-player-by-date/:date",
    homeController.handleGetInfoPlayerByDate
  );
  router.get(
    "/get-scorer-by-date/:date",
    homeController.handleGetScorerInfoPlayerByDate
  );
  router.post("/add-scorer", homeController.handleAddScorer);

  // Trang ghi nhận kết quả
  router.get("/get-round-from-game", homeController.handleGetRoundFromGame);
  router.get(
    "/get-round-from-game/:id",
    homeController.handleGetRoundFromGameId
  );
  router.get("/get-name-team", homeController.handleGetTeamName);
  router.get(
    "/get-name-team/:round",
    homeController.handleGetTeamNameFromRound
  );
  router.get("/get-info-game", homeController.handleGetInfoGame);
  router.get("/get-info-game/:round", homeController.handleGetInfoGameByRound);
  router.get(
    "/get-info-game/:id/:round",
    homeController.handleGetInfoGameByRoundAndId
  );
  router.post("/add-schedule", homeController.handleAddSchedule);

  router.put("/update-schedule", homeController.handleUpdateSchedule);
  router.put("/update-record", homeController.handleUpdateRecord);

  router.post("/submit/goal", homeController.handleGoal);

  router.post("/change-rule", homeController.handleUpdateRule);

  router.get(
    "/get-id-game-from-round/:round",
    homeController.handleGetIdGameFromRound
  );
  //router.get("/player", homeController.handlePlayer);

  return app.use("/", router);
};

export default initWebRoutes;
