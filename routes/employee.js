class IndexRoute {
  constructor() {
    this.router = require("express").Router();
    this.middleware = require("../middleware");
    this.authController = require("../controllers/AuthController");
    this.dashboardController = require("../controllers/DashboardController");
    this.userController = require("../controllers/UserController");
    this.setRoutes();
  }

  setRoutes(){
    
    //Start Employee
    this.router.get(
      "/",
      this.middleware.checkLogin,
      // this.middleware.checkUserRigts,
      this.userController.employees.bind(this.userController)
    )
    
  }

}

const router = new IndexRoute();
module.exports = router.router;
