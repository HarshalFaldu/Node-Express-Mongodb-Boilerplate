exports.getDatatabledata = async function(req){
    var requestQuery = req.query
    console.log(requestQuery.pagination, requestQuery["pagination[page]"], requestQuery["pagination[perpage]"]);
      var skip = (requestQuery.pagination.page - 1) * requestQuery.pagination.perpage;
      var limit = requestQuery.pagination.perpage;
      var sortField = "", searchField = "", sortDirection = "", searchName = ""
    //   if (typeof(requestQuery.sort.field) !== undefined && requestQuery.sort.field) {
    //       sortField = requestQuery.sort.field;
    //   }

    //   if (requestQuery.query.generalSearch && typeof(requestQuery.query.generalSearch)!== undefined) {
    //       searchField = requestQuery.query.generalSearch; 
    //   }

    //   if (typeof(requestQuery.sort.sort) !== undefined && requestQuery.sort.sort) {
    //       sortDirection = requestQuery.sort.sort
    //   }
      
    //   if (sortDirection == "desc") {
    //       sortDirection = -1;
    //   } else {
    //       sortDirection = 1;
    //   }
     return {
       searchField: searchField,
       sortDirection: sortDirection,
       sortField: sortField,
       skip: skip,
       limit: limit,
       searchName: searchName
     }
  }