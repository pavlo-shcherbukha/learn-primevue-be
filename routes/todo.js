var express = require('express');
var fs=require('fs');
var path=require('path');
var apperror=require("../utils/appError");
//var Math = require("Math")



module.exports = function (app) {
    var router = express.Router();
    var logger = app.get('logger');
    router.get('/', function(req, res, next) {
        var b = req.body;
        log = logger.child({ label: 'http-get-todo' });

        try{
          var todos=app.get("todo").data;
          if( typeof todos === "undefined"){
            throw new apperror.ApplicationError("Data is not an array",  code="WrongStructure",  target="GET-TODO-1", status_code=422, payload={})
          } else if (todos.length===0){
            throw new apperror.ApplicationError("Array has length 0",  code="NoDataFound",  target="GET-TODO-2", status_code=422, payload={})
          }
          return res.status(200).json(todos)                                              
        }
        catch( err){
            let res_status_code=422
            if( err instanceof apperror.ValidationError){
                res_status_code=err.status_code
                res_err=apperror.ErrorHandler(err)
            } else if(err instanceof apperror.ApplicationError){
                res_status_code=err.status_code
                res_err=apperror.ErrorHandler(err)
            } else if(err instanceof apperror.ServerError){
                res_status_code=err.status_code 
                res_err=apperror.ErrorHandler(err)
            } else if( err instanceof apperror.AxiosError){
                res_status_code=err.status
                res_err=apperror.ErrorHandler(err)
            } else {
              res_err= apperror.ErrorHandler(err)
              res_err.Error.code="InternalError"
              res_err.Error.target="GET-TODO"
            }  
            res.status(res_status_code).json( res_err );
        }    


    });

    router.delete('/:idtodo', function(req, res, next) {
      var todoid = parseInt(req.params["idtodo"]);
      log = logger.child({ label: 'http-get-todo-by-idtodo' });

      try{
        var todos=app.get("todo").data;
        if( typeof todos === "undefined"){
          throw new apperror.ApplicationError("Data is not an array",  code="WrongStructure",  target="GET-TODO-1", status_code=422, payload={})
        } else if (todos.length===0){
          throw new apperror.ApplicationError("Array has length 0",  code="NoDataFound",  target="GET-TODO-2", status_code=422, payload={})
        }
        const indx = todos.findIndex(todo => todo.id === todoid);
        todos.splice(indx, indx >= 0 ? 1 : 0);
        return res.status(200).json({ok: true, id: todoid })                                              
      }
      catch( err){
          let res_status_code=422
          if( err instanceof apperror.ValidationError){
              res_status_code=err.status_code
              res_err=apperror.ErrorHandler(err)
          } else if(err instanceof apperror.ApplicationError){
              res_status_code=err.status_code
              res_err=apperror.ErrorHandler(err)
          } else if(err instanceof apperror.ServerError){
              res_status_code=err.status_code 
              res_err=apperror.ErrorHandler(err)
          } else if( err instanceof apperror.AxiosError){
              res_status_code=err.status
              res_err=apperror.ErrorHandler(err)
          } else {
            res_err= apperror.ErrorHandler(err)
            res_err.Error.code="InternalError"
            res_err.Error.target="GET-TODO"
          }  
          res.status(res_status_code).json( res_err );
      }    


  });

  router.put('/', function(req, res, next) {

    log = logger.child({ label: 'http-put-todo-new' });

    try{
      var todos=app.get("todo").data;
      var todo=req.body
      if( typeof todos === "undefined"){
        throw new apperror.ApplicationError("Data is not an array",  code="WrongStructure",  target="put-TODO-1", status_code=422, payload={})
      } else if (todos.length===0){
        throw new apperror.ApplicationError("Array has length 0",  code="NoDataFound",  target="put-TODO-2", status_code=422, payload={})
      } else if(!todo.hasOwnProperty("user_id")){
        throw new apperror.ValodationError("Missing key [user_id]",  code="ValidationRequest",  target="put-TODO-2", status_code=422, payload=todo)
      } else if(!todo.hasOwnProperty("title")){
        throw new apperror.ValodationError("Missing key [title]",  code="ValidationRequest",  target="put-TODO-2", status_code=422, payload=todo)
      } else if(!todo.hasOwnProperty("due_on")){
        throw new apperror.ValodationError("Missing key [due_on]",  code="ValidationRequest",  target="put-TODO-2", status_code=422, payload=todo)
      } else if(!todo.hasOwnProperty("status")){
        throw new apperror.ValodationError("Missing key [status]",  code="ValidationRequest",  target="put-TODO-2", status_code=422, payload=todo)
      } else {
        let idMax = Math.max.apply(null, todos.map(function(o) { return o.id; }));
        todo.id = idMax + 1;
        app.get("todo").data.push( todo ); 
      }

      return res.status(200).json({ok: true, id: todo.id});                                              
    }
    catch( err){
        let res_status_code=422
        if( err instanceof apperror.ValidationError){
            res_status_code=err.status_code
            res_err=apperror.ErrorHandler(err)
        } else if(err instanceof apperror.ApplicationError){
            res_status_code=err.status_code
            res_err=apperror.ErrorHandler(err)
        } else if(err instanceof apperror.ServerError){
            res_status_code=err.status_code 
            res_err=apperror.ErrorHandler(err)
        } else if( err instanceof apperror.AxiosError){
            res_status_code=err.status
            res_err=apperror.ErrorHandler(err)
        } else {
          res_err= apperror.ErrorHandler(err)
          res_err.Error.code="InternalError"
          res_err.Error.target="PUT-TODO-3"
        }  
        res.status(res_status_code).json( res_err );
    }    
});

router.post('/', function(req, res, next) {

  log = logger.child({ label: 'http-post-todo-edit' });

  try{
    var todos=app.get("todo").data;
    var todo=req.body
    if( typeof todos === "undefined"){
      throw new apperror.ApplicationError("Data is not an array",  code="WrongStructure",  target="put-TODO-1", status_code=422, payload={})
    } else if (todos.length===0){
      throw new apperror.ApplicationError("Array has length 0",  code="NoDataFound",  target="put-TODO-2", status_code=422, payload={})
    } else if(!todo.hasOwnProperty("user_id")){
      throw new apperror.ValodationError("Missing key [user_id]",  code="ValidationRequest",  target="put-TODO-2", status_code=422, payload=todo)
    } else if(!todo.hasOwnProperty("title")){
      throw new apperror.ValodationError("Missing key [title]",  code="ValidationRequest",  target="put-TODO-2", status_code=422, payload=todo)
    } else if(!todo.hasOwnProperty("due_on")){
      throw new apperror.ValodationError("Missing key [due_on]",  code="ValidationRequest",  target="put-TODO-2", status_code=422, payload=todo)
    } else if(!todo.hasOwnProperty("status")){
      throw new apperror.ValodationError("Missing key [status]",  code="ValidationRequest",  target="put-TODO-2", status_code=422, payload=todo)
    } else if(!todo.hasOwnProperty("id")){
      throw new apperror.ValodationError("Missing key [id]",  code="ValidationRequest",  target="put-TODO-2", status_code=422, payload=todo)
    } else {
      //let idMax = Math.max.apply(null, todos.map(function(o) { return o.id; }));
      //todo.id = idMax + 1;
      //app.get("todo").data.push( todo );
      let todoid= todo.id
      const indx = todos.findIndex(todo => todo.id === todoid);
      app.get("todo").data[indx]=todo;
    }

    return res.status(200).json({ok: true, id: todo.id});                                              
  }
  catch( err){
      let res_status_code=422
      if( err instanceof apperror.ValidationError){
          res_status_code=err.status_code
          res_err=apperror.ErrorHandler(err)
      } else if(err instanceof apperror.ApplicationError){
          res_status_code=err.status_code
          res_err=apperror.ErrorHandler(err)
      } else if(err instanceof apperror.ServerError){
          res_status_code=err.status_code 
          res_err=apperror.ErrorHandler(err)
      } else if( err instanceof apperror.AxiosError){
          res_status_code=err.status
          res_err=apperror.ErrorHandler(err)
      } else {
        res_err= apperror.ErrorHandler(err)
        res_err.Error.code="InternalError"
        res_err.Error.target="PUT-TODO-3"
      }  
      res.status(res_status_code).json( res_err );
  }    
});





    app.use('/todo', router);
}

