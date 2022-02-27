personalization () {
    FILENAME=$1
    sed -i "s/DemoRoute/$MODULE_ROUTE/g;s/DemoModuleName/$temp_first_upper/g;s/DemoStandardName/$MODULE_VARIABLE/g;s/DemoControllerName/$MODULE_CONTROLLER/g;s/demoController/$MODULE_CONTROLLER_SMALL/g;s/DemoModelName/$MODEL_NAME/g;s/DemoApiName/$API_FOLDER_NAME/g;s/DemoTableName/$TABLE_NAME/g;s/DemoConstantName/$CONSTANT_NAME/g;s/DemoService/$MODULE_SERVICE/g;s/demoService/$MODULE_SERVICE_SMALL/g;s/demoModelNameForService/$temp_small/g;" $FILENAME
}


read -p "Enter Module Name: " MODULE_NAME
if [[ -z "$MODULE_NAME" ]]; then
    echo -e "\e[38;2;255;0;0m No input \e[0m"
    exit 1
else
    # -------------------------------------- Create Related Name ------------------------------
    # --Original Input - DemoModuleName - Demo Example
    #--Convert Name in Lower/Upper case
    temp_small="${MODULE_NAME,,}"
    temp_upper="${MODULE_NAME^^}"
    temp_first_upper="${MODULE_NAME^}"
    #--Replace space and make diffrent name
    # MODULE_VARIABLE - DemoStandardName - DemoExample
    MODULE_VARIABLE="${MODULE_NAME// /}"
    # MODULE_VARIABLE - DemoStandardName - DemoExample For Controller
    MODULE_CONTROLLER="${MODULE_NAME// /}Controller"
    # MODULE_VARIABLE_SMALL - DemoStandardName - DemoExample For Controller object
    MODULE_CONTROLLER_SMALL="${temp_small// /}Controller"
    # MODULE_VARIABLE_SMALL - DemoStandardName - DemoExample For Route ClassName
    MODULE_ROUTE="${temp_small// /}Route"
    # MODEL_NAME - DemoModelName - demo_example
    MODEL_NAME="${temp_small// /_}Schema"
    # API_FOLDER_NAME - DemoApiName - demoexample
    API_FOLDER_NAME="${temp_small// /}"
    # TABLE_NAME - DemoTableName - Demo_Example
    TABLE_NAME="${MODULE_NAME// /_}s"
    # CONSTANT_NAME - DemoConstantName - DEMO_EXAMPLE
    CONSTANT_NAME="${temp_upper// /_}"
    # MODULE_VARIABLE - DemoStandardName - DemoExample For service object in Controller
    MODULE_SERVICE="${MODULE_NAME// /}Service"
    # MODULE_VARIABLE_SMALL - DemoStandardName - DemoExample For service object in Controller object
    MODULE_SERVICE_SMALL="${temp_small// /}Service"
    # MODULE_VARIABLE_SMALL - DemoStandardName - DemoExample For service object in Controller object
    MODULE_VALIDATION="${temp_small// /}Validations"

# -----------------------------------Add new route file for module---------------------------

cp ./shell_script/route/index.js ./routes/${temp_small}.js
personalization ./routes/${temp_small}.js

# -----------------------------------Add new model file for module---------------------------

cp ./shell_script/model/model.js ./models/${temp_small}.js
personalization ./models/${temp_small}.js

# -----------------------------------Add new controller file for module---------------------------

cp ./shell_script/controller/controller.js ./controllers/${MODULE_CONTROLLER}.js
personalization ./controllers/${MODULE_CONTROLLER}.js

# -----------------------------------Add new Service file for module---------------------------

cp ./shell_script/service/service.js ./services/${MODULE_SERVICE}.js
personalization ./services/${MODULE_SERVICE}.js

# -----------------------------------Add new Validations file for module---------------------------

cp ./shell_script/validations/validate.js ./validations/${MODULE_VALIDATION}.js
personalization ./validations/${MODULE_VALIDATION}.js


# -----------------------------------Update app.js file---------------------------
#--Get line number where we have to add router
read app_index <<<$(awk '/IMPORT ROUTE/{ 
    print NR
    exit }' app.js)

sed -i "$app_index i    this.${MODULE_ROUTE} = require('./routes/${temp_small}');" app.js

#--Replace file with userinput module name
personalization app.js
echo -e "\e[38;2;255;0;0m app.js Modified \e[0m"


#--Get line number where we have to add router
read app_index <<<$(awk '/SCRIPT STONE/{ 
    print NR
    exit }' app.js)
# $app_index = $app_index
#--Add app_index to app.js file
# sed -i "$app_index r this.app.use('\/${temp_small}', this.${MODULE_ROUTE})" app.js
sed -i "$app_index i    this.app.use('/${temp_small}', this.${MODULE_ROUTE});" app.js

#--Replace file with userinput module name
personalization app.js
echo -e "\e[38;2;255;0;0m app.js Modified \e[0m"

fi