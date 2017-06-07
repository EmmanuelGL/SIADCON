tbody(bgcolor="cyan" )
    each item, i in items
        tr
             td= Enero
             td= '$'+item.seguridad
             td= item.limpieza
             td= item.luz
             td= item.tinacos
             td= item.pago
             td= item.mes
----------------------------------
                           
                            table(class="table table-striped"
            aling = 'center')
                thead(bgcolor="darkcyan")
                        tr 
                           th pruebA
                           tbody(bgcolor="cyan" )
                            each item, i in items
                            
                                td= 'mez'+item.mes 
                     
                   
                        each item, i in items
                             tbody(bgcolor="cyan" )
                                td= '$'+item.seguridad
                                td= item.limpieza
                                td= item.luz
                                td= item.tinacos
                                td= item.pago
                                td= item.mes

----------------------------------------
 table(border='1')
                    thead
                        each item, i in items
                                th= item.seguridad+"<---"
                                th Code
                                th Name
                                th Description
                                     tr
                       
                    tbody
                        
                        ----------------------------

                        getUser : function(req, res, next){
        //pasamos la configuracion de la base de datos
        //var _id = passport._id_
       console.log(`este es el ide ${req.body._id}`)
        var config = require('.././database/config');
        //creamos la coneccion a la base de datos 
        var url = config.url;
        console.log(`> BD: ${url}`);
         mongo.connect(url, function (err, db) {
            if (err) throw err
            var collection = db.collection('Users')
            collection.find({}).toArray(function (err, documents, fields) {
                 if (err) throw err;
                //se imprimen los documentos encontrados 
                console.log(`------- datos${documents}`);
               
                 console.log(`-------´´´´´´´´´´´´´´´´´´´´´´`);
                 console.log(`${req.body.nombre}`);
                console.log(JSON.stringify(documents));
                //se cierra la conexion a la base de datos
                console.log(user.nombre);
                console.log(documents.nombre);
                documents.forEach(function(element) {
                    console.log(element.nombre);
                });
        
                console.log ('lo que envia de items');
               //) console.log (`${items}`);
                db.close();
                  res.render('users/myBalance',{
                       isAuthenticated : req.isAuthenticated(),
                        user : req.user, 
                        items :[{
                            nombre :`${documents}`
                        }]
                    });
            });
        });
    }


    ----------------------------
    div(class="col-md-4 col-md-offset-4")
        h2='Lista de Usuarios Registrados'
        if items.lenght <0
            table(class="table table-striped"
                aling = 'center')
                thead(bgcolor="darkcyan")
                    tr
                        th # Depto
                        th Nombre
                        th Email
                tbody(bgcolor="cyan" )
                    each item, i in items
                        tr
                            td= item._id
                            td= item.nombre
                            td= item.email
            div(class="col-md-4 col-md-offset-4")
                table(class="table table-striped"
                        aling = 'center')
                    thead()
                        tr
                            th
                                button(type="button" onclick="location.href='/users/panel'"  class="btn btn-primary")="Regresar"









                                 var s =req.user.nombre;
        console.log("s");
        console.log(s);
       res.render('users/myBalance',{
            isAuthenticated : req.isAuthenticated(),
            user : req.user
        });

---------------------------------------------------------------------------------------------
jade shuser

extends ../templates/default
include ../templates/nav
block content
    div(class="col-md-6 col-md-offset-0")
        div(class="col-md-4 col-md-offset-5")='Lista de Pagos Registrados'
            table(class="table table-striped"
                aling = 'center')
                thead(bgcolor="darkcyan")
                    tr
                        td #Depto
                        td Nombre
                        td Email
                        td Seguridad
                        td Basura
                        td Limpieza de A.C.
                        td Luz de A.C.
                        td Limpieza de tinacos
                        td Pago Administrador
                        td Total
                tbody(bgcolor="cyan" )
                    each item, i in items
                        tr
                            td= item._id
                            td= item.nombre
                            td= item.email
                            td= item.Seguridad
                            td= item.RecoleccionBasura
                            td= item.LimpiezaComunes
                            td= item.AlumbradoComunes
                            td= item.Limpiezatinacos
                            td= item.PagoAdministrador
                            td= item.total
                            
            
    
     div(class='row')
              div(class='col-md-6 col-md-offset-3')
                div(class='panel panel-default')
                  div(class='panel-heading')='Actualizacion'
                    div(clas= 'panel-body')
                      form(action='users/shUser' method='post' autocomplete='off')
                        div(class='form-group')
                            label(for="numDepto")='N° Depto'
                            input(required type='number' name='numDepto' id='numDepto' placeholder='N° Depto' class='form-control')
                        div(class='form-group')
                            label(for="Seguridad")='Seguridad'
                            input(required type='number' name='Seguridad' id='Seguridad' placeholder='Seguridad' class='form-control')
                        div(class='form-group')
                            label(for="Recolección de Basura")='Recolección de Basura'
                            input(required type='number' name='RecoleccionBasura' id='RecoleccionBasura' placeholder='Recolección de Basura' class='form-control')
                        div(class='form-group')
                            label(for="LimpiezaComunes")='Limpieza de Areas Comunes'
                            input(required type='number' name='LimpiezaComunes' id='LimpiezaComunes' placeholder='Limpieza de Areas Comunes' class='form-control')
                        div(class='form-group')
                            label(for="AlumbradoComunes")='Alumbrado de Areas Comunes'
                            input(required type='number' name='AlumbradoComunes' id='AlumbradoComunes' placeholder='Alumbrado de Areas Comunes' class='form-control')
                        div(class='form-group')
                            label(for="Limpiezatinacos")='Limpieza de tinacos'
                            input(required type='number' name='Limpiezatinacos' id='Limpiezatinacos' placeholder='Limpieza de tinacos' class='form-control')
                        div(class='form-group')
                            label(for="PagoAdministrador")='Pago Administrador'
                            input(required type='number' name='PagoAdministrador' id='PagoAdministrador' placeholder='Pago Administrador' class='form-control')
                    div(class="col-md-4 col-md-offset-4")
                table(class="table table-striped"
                        aling = 'center')
                    thead()
                        tr
                            th
                                button(type="button" onclick="location.href='/users/panel'"  class="btn btn-primary")="Regresar"
                            th
                                 button(type="submit" class="btn btn-primary")='Actualizar pagos' 
