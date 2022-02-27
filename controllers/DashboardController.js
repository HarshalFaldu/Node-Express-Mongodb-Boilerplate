const BaseController = require("./BaseController");
const config = require("../config/Config");
class DashboardController extends BaseController {
    constructor() {
        super();
        this.es6BindAll = require("es6bindall");
        this.userService = require("../services/UserService");
        this.es6BindAll(this, []);
    }

    /**
    *
    * home page
    *
    * @param  {object}   request
    * @param  {object}   response
    * @return {view}
    */
    home(req, res) {
        console.log("Role, ",req.session.role);
        res.render("pages/dashboard", {
            layout: "layout/layout",
            title: "dashboard",
            role: req.session.role
        });
    }

    /**
      *
      * Employee page
      *
      * @param  {object}   request
      * @param  {object}   response
      * @return {view}
      */
    employee(req, res) {
        res.render("pages/employee", {
            layout: "layout/layout",
            title: "employee",
            role: req.session.role
        });
    }

    /**
      *
      * Add Employee page
      *
      * @param  {object}   request
      * @param  {object}   response
      * @return {view}
      */
     addemployee(req, res) {
        res.render("pages/addEmployee", {
            layout: "layout/layout",
            title: "employee",
            operation: "add",
            button: "Submit",
            data: {},
            role: req.session.role
        });
    }

    /**
      *
      * Edit Employee
      *
      * @param  {object}   request
      * @param  {object}   response
      * @return {view}
      */
     async findEmployee(req, res) {
        var data = await this.userService.findEmployee(req.params.id)
        if (data) {
            res.render("pages/addEmployee", {
                layout: "layout/layout",
                operation: "edit",
                button: "Update",
                title: "employee",
                role: req.session.role,
                data: JSON.stringify(data)
            })
        } else {
            res.status(401).send({
                status: false,
                message: data.message,
            });
        }
    }

    /**
    *
    * Error page
    *
    * @param  {object}   request
    * @param  {object}   response
    * @return {view}
    */
    error(req, res) {
        res.render("pages/error", {
            message: "Not Authorized",
            role: req.session.role,
            title: "none",
            status: 401
        });
    }

    /**
          *
          * Error page
          *
          * @param  {object}   request
          * @param  {object}   response
          * @return {view}
          */
    errorNotFound(req, res) {
        res.render("pages/error", {
            message: "Page Not Found",
            role: req.session.role,
            title: "none",
            status: 404
        });
    }


}

module.exports = new DashboardController()