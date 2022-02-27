const helperResponse = require("../helpers/HelperResponse");

//redirect user to dashboard if already logged in
exports.redirectIfAuthenticated = (req, res, next) => {
    if (helperResponse.getSession(req, "user")) {
      return res.redirect("/index");
    } else {
      next();
    }
  };

  //check if user is logged in
  exports.checkLogin = async function (req, res, next) {
      if (helperResponse.getSession(req, "user")) {
          next()
      } else {
          return res.redirect("/");
      }
    };


    // Check the user role as per the requirement
// exports.checkUserRigts = async function (req,res,next){
//   for(var i = 0; i < roleJson[helperResponse.getSession(req,"role")].length;i++){
//     var found = false
//     if(roleJson[helperResponse.getSession(req,"role")][i]==req.originalUrl){
//       found = true
//       return next()
//     }
//   }
//   if(!found){
//     return res.redirect("/");
//   }
// }