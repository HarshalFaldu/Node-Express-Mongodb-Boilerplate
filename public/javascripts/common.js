common = {
  alert: (type = "success", title = "", text = "success", button = "okay") => {
    new swal({
      title: title,
      text: text,
      icon: type,
      confirmButtonText: button,
      confirmButtonColor: "#3dbea2"
    }).then(() => {
      switch (type) {
        case "success":
          location.reload();
          break;
        case "error":
          break;
      }
    });
  },

  // Type = success/fail
  toast: (type,msg) => {
    toastr.options = {
      closeButton: true,
      debug: false,
      newestOnTop: false,
      progressBar: false,
      positionClass: "toast-top-right",
      preventDuplicates: false,
      onclick: null,
      showDuration: "155500",
      hideDuration: "1000",
      timeOut: "5000",
      extendedTimeOut: "1000",
      showEasing: "swing",
      hideEasing: "linear",
      showMethod: "fadeIn",
      hideMethod: "fadeOut",
    };
    if(type == "success"){
      toastr.success(msg);
    } else {
      toastr.error(msg);
    }
  },

  /**
     * get values of form given as argument in JSON format
     * @param  {[type]} formObject [description]
     * @return {[type]}            [description]
     */
   getFormValues: function (formObject) {
    var values = {};
    formObject.find("input,select,textarea").each(function () {
        var inputObject = $(this);
        var fieldName = inputObject.attr("name");
        var fieldValue = $.trim(inputObject.val());
        if (inputObject.attr("type") == "checkbox") {
            // auto set data type for checkbox
            if (!inputObject.attr("data-type")) {
                // single checkbox with that name means dataType="BOOL" else it is "ARRAY"
                if (formObject.find("input[name='" + fieldName + "']").length == 1) {
                    dataType = "BOOL";
                } else {
                    dataType = "ARRAY";
                }
            }
            if (dataType == "BOOL") fieldValue = inputObject.is(":checked");
            if (dataType == "ARRAY") fieldValue = inputObject.is(":checked") ? fieldValue : "";
            if (dataType == "ARRAY") {
                if ($.isArray(values[fieldName]) && values[fieldName].length != 0) {
                    if (fieldValue != "") {
                        values[fieldName].push(fieldValue)
                    }
                } else {
                    values[fieldName] = [];
                    if (fieldValue != "") {
                        values[fieldName].push(fieldValue)
                    }
                }
            } else {
                values[fieldName] = fieldValue;
            }
        } else if (inputObject.attr("type") == "radio") {
            if (inputObject.is(":checked")) {
                values[fieldName] = $.trim(fieldValue);
            }
        } else {
            values[fieldName] = $.trim(fieldValue);
        }
    });

    return values;
  },

  /**
     * this function fill values in form's components using values given as argument
     * @param  {[type]} formObject [description]
     * @param  {[type]} objData    [description]
     * @return {[type]}            [description]
     */
   fillFormValues: function (formObject, objData) {
    var values = {};
    formObject.find("input,select,textarea").each(function () {
        var inputObject = $(this);
        var fieldName = inputObject.attr("name");
        if (inputObject.attr("type") == "checkbox" || inputObject.attr("type") == "radio") {
            if (inputObject.attr("type") == "checkbox") {
                $("input[name=" + fieldName + "]").prop("checked", true);
            } else {
                $("input[name=" + fieldName + "]").val([objData[fieldName]]);
            }
        } else if (inputObject.attr("type") == "hidden") {
            $("input[name='" + fieldName + "']").val(objData[fieldName]);
        }
        else if (inputObject.attr("type") == "text") {
            $("input[name='" + fieldName + "']").val(objData[fieldName]);
            $("input[name='" + fieldName + "']").closest('div').addClass('pmd-textfield-floating-label-completed');
        } else if (inputObject.attr("type") == "number") {
            $("input[name='" + fieldName + "']").val(objData[fieldName]);
            $("input[name='" + fieldName + "']").closest('div').addClass('pmd-textfield-floating-label-completed');
        }
        else if (inputObject.is("textarea")) {
            $("textarea[name$='" + fieldName + "']").val(objData[fieldName]);
        } else if (inputObject.is("select")) {
            // if ($("select[name='" + fieldName + "']").hasClass("select-tags")) {
            //     if (objData[fieldName] != null) {
            //         $("select[name='" + fieldName + "']").val(objData[fieldName]).trigger('change');
            //     } else {
            //         $("select[name='" + fieldName + "']").val('').trigger('change');
            //     }
            // } else {
            if (objData[fieldName] != '') {
              $("select[name='" + fieldName + "']").val(objData[fieldName]);
            } else {
              $("select[name='" + fieldName + "']").val('');
            }
            // }
        }
    });
    return;
  },
};
