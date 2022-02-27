const BaseController = require("./BaseController")
const config = require("../config/Config");

class DemoControllerName extends BaseController {
    constructor() {
        super()
        this.demoService = require("../services/DemoService");
        this.validation = require("../validations/demoModelNameForServiceValidations")
        this.es6BindAll = require("es6bindall");
        this.es6BindAll(this, []);
    }


    /**
   *
   * Get All DemoModuleName
   *
   * @param  {object}   request
   * @param  {object}   response
   * @return {json}
   */

    async getDemoModuleName(req,res){
        if(process.env.STAGE != "production"){
            this.logger.logCall(req.path, req.method, req.body)
          }
        var newData = this.commonFunction.getDatatabledata(req)
        var sortObj = {};
        if (newData.sortField == "name") {
            sortObj = { name: newData.sortDirection };
        }  else {
            sortObj = { status: newData.sortDirection };
        }
        var data = await this.demoService.getDemoModuleName(
            req,newData.skip,newData.limit,newData.searchField,sortObj,1
        )
        if(data && data.length > 0){
            res.status(200).json({
                status: true,
                data: data
            })
        }else{
            res.status(400).json({
                status:false,
                message: "No data available"
            })
        }
    }

    /**
   *
   * Create New DemoModuleName
   *
   * @param  {object}   request
   * @param  {object}   response
   * @return {json}
   */

     async addDemoModuleName(req,res){
        var validationRes = this.validation.DemoModuleName.validate(req.body);
        if (validationRes.error) {
            res.status(400).send({
                message: validationRes.error.details[0].message,
                type: "ValidationError",
            });
        } else {
            var data = await this.demoService.addDemoModuleName(
                res,
                req.body
            )
            if(data._id){
                res.send({status: true,message:config.messages.USER_CREATED.replace("__value__","Created Successfully")})
            }else if(data.message){
                res.send({status : false, message: data.message})
            }else{ 
                res.send({status: false})
            }
        }
    }


    /**
   *
   * Get DemoModuleName with id
   *
   * @param  {object}   request
   * @param  {object}   response
   * @return {json}
   */

     async editDemoModuleName(req,res){
        var data = await this.demoService.editDemoModuleName(req.params.id)
        if(data.name){
            res.send({status: true, data: data})
        } else {
            res.send({status: false})
        }
    
    }
    
    
    /**
   *
   * Update DemoModuleName
   *
   * @param  {object}   request
   * @param  {object}   response
   * @return {json}
   */

    async updateDemoModuleName(req,res){
        if (validationRes.error) {
            res.status(400).send({
                message: validationRes.error.details[0].message,
                type: "ValidationError",
            });
        } else {
            var data = await this.demoService.updateDemoModuleName(req.params.id, req.body)
            if(data.name){
                res.send({status: true,message:config.messages.USER_CREATED.replace("__value__","Updated Successfully")})
              } else {
                res.send({status: false})
              }
        }
    }

     /**
    *
    * Delete DemoModuleName  
    *
    * @param  {object}   request
    * @param  {object}   response
    * @return {json}
    */
      async deleteDemoModuleName(req, res) {
        var data = await this.demoService.deleteDemoModuleName(req.params.id)
        if(data){
          res.redirect("/DemoModuleName")
        } else {
          res.status(401).send({
            status: false,
          });
        }
      }
}

module.exports = new DemoControllerName();