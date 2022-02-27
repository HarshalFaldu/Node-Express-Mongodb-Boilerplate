class DemoRoute {
  constructor() {
    this.router = require("express").Router();
    this.middleware = require("../middleware");
    this.demoController = require("../controllers/DemoControllerName");
    this.setRoutes();
  }

  setRoutes(){
    
    //Get DemoModuleName
    this.router.get(
      "/",
      this.middleware.checkLogin,
      // this.middleware.checkUserRigts,
      this.demoController.getDemoModuleName.bind(this.demoController)
    )

    //Add DemoModuleName
    this.router.post(
      "/",
      this.middleware.checkLogin,
      // this.middleware.checkUserRigts,
      this.demoController.addDemoModuleName.bind(this.demoController)
    )

    //Get DemoModuleName to Edit with id
    this.router.get(
      "/:id",
      this.middleware.checkLogin,
      // this.middleware.checkUserRigts,
      this.demoController.editDemoModuleName.bind(this.demoController)
    )

    //Update DemoModuleName with id
    this.router.patch(
      "/:id",
      this.middleware.checkLogin,
      // this.middleware.checkUserRigts,
      this.demoController.updateDemoModuleName.bind(this.demoController)
    )

    //Delete selected DemoModuleName
    this.router.delete(
      "/:id",
      this.middleware.checkLogin,
      // this.middleware.checkUserRigts,
      this.demoController.deleteDemoModuleName.bind(this.demoController)
    )
    
  }

}

const router = new DemoRoute();
module.exports = router.router;
