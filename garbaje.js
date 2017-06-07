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