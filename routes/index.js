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
    // POST methods
    this.router.post(
      "/api/login_user",
      this.authController.login_user.bind(this.authController)
    )
   
    this.router.get(
      "/employeePage",
      this.middleware.checkLogin,
      // this.middleware.checkUserRigts,
      this.dashboardController.employee.bind(this.dashboardController)
    )

    /* GET home page. */
    this.router.get(
      "/",
      this.middleware.redirectIfAuthenticated,
      this.authController.login.bind(this.authController)
    )
    
    this.router.get(
      "/logout",
      this.authController.logout.bind(this.authController)
    )

    this.router.get(
      "/index",
      this.middleware.checkLogin,
      this.dashboardController.home.bind(this.dashboardController)
    )
    
    this.router.get(
      "/error",
      this.dashboardController.error.bind(this.dashboardController)
    )

    this.router.get(
      '*',
      this.dashboardController.errorNotFound.bind(this.dashboardController)
    );
  }

}

const router = new IndexRoute();
module.exports = router.router;
