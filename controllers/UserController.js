const BaseController = require("./BaseController")
const config = require("../config/Config");

class UserController extends BaseController {
    constructor() {
        super()
        this.userService = require("../services/UserService");
        this.es6BindAll = require("es6bindall");
        this.es6BindAll(this, ["employees"]);

        /*
        
        Validations for example. You can use it as per your project structure
        1. EmployeeValidation ==> It validate the employee details when admin can add new employee
        2. updateEmployeeValidation ==> It can validate the employee details when admin is updating employee details
        3. updateSelfValidation ==> It can validate the employee details when employee is updating own details

        */

        // this.EmployeeValidation = this.Joi.object(this.getValidationFields("add"));
        // this.updateEmployeeValidation = this.Joi.object(this.getValidationFields("update"))
        // this.updateSelfValidation = this.Joi.object({
        //     name: this.Joi.string().required(),
        //     phone: this.Joi.string().length(10).required(),
        //     dob: this.Joi.date().required(),
        //     gender: this.Joi.string().required(),
        //     id: this.Joi.string().required()
        // })
    }
   
    // getValidationFields(flag){
    //     var fields = {
    //         name: this.Joi.string().required(),
    //         phone: this.Joi.string().length(10).required(),
    //         dob: this.Joi.date().required(),
    //         gender: this.Joi.string().required(),
    //         employee_id: this.Joi.string().length(7).required(),
    //         category: this.Joi.string().required(),
	// 		designation: this.Joi.string().required(),
    //         hourly_salary: this.Joi.number().required(),
    //         password: this.Joi.string().required(),
    //         status:this.Joi.number().required(),
    //         role:this.Joi.string().length(1).required()
    //     }
    //     if(flag == "add"){
    //         return fields
    //     } else if(flag =="update"){
    //         fields["id"] = this.Joi.string().required()
    //         return fields
    //     }
    // }


    /**
   *
   * Get All employees
   *
   * @param  {object}   request
   * @param  {object}   response
   * @return {view}
   */

    async employees(req,res){
        if(process.env.STAGE != "production"){
            this.logger.logCall(req.path, req.method, req.body)
          }
        var newData = await this.commonFunction.getDatatabledata(req)
        console.log(newData);
        var sortObj = {};
        if (newData.sortField == "name") {
            sortObj = { name: newData.sortDirection };
        }  else {
            sortObj = { status: newData.sortDirection };
        }
        var data = await this.userService.getAllEmployees(
            req,newData.skip,newData.limit,newData.searchField,sortObj,1
        )
        if(data && data.length > 0 && !data.status){
            // res.send({status: true,data:data})
            res.status(200).json({
                status: true,
                data: data
            })
        }else{
            res.status(400).json({
                status:false,
                message: data.message
            })
        }
    }
   
}

module.exports = new UserController();