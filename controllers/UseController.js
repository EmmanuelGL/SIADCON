var mongo = require('mongodb').MongoClient;
var bcrypt = require('bcryptjs');

module.exports = {
    getSignUp: function (req, res, next) {
        return res.render('users/signup');
    },

    postSignUp: function (req, res, next) {
        //nivel de la encriptacion el numero podemos ponerlo mas elevado dependiendo de la dificultad que le demos 

        var salt = bcrypt.genSaltSync(10)
        //pedimos la propiedad password y le pasamos el objeto salt
        var password = bcrypt.hashSync(req.body.password, salt);
        //objeto json
        var user = {
            email: req.body.email,
            nombre: req.body.nombre,
            //seguridad (password: password) ---> no mandar el password
            //password: req.body.password
            password: password,
            _id: req.body._id
        }
        
        //pasamos la configuracion de la base de datos
        var config = require('.././database/config');
        //creamos la coneccion a la base de datos 
        var url = config.url;
        console.log(`> BD: ${url}`);
        //insertamos los datos 
        mongo.connect(url, function (err, db) {
            if (err) throw err
            var collection = db.collection('Users')
            collection.insert(user, function (err, data) {
                if (err) throw err
                console.log(JSON.stringify(user))
                db.close()
            });
        });
        
        req.flash('info','Se ha registrado correctamente, ya puede iniciar sesion ');
        return res.redirect('/auth/signin');
    },
    getSignIn:function(req,res,next){
        return res.render('users/signin', {message: req.flash('info'), authmessage : req.flash('authmessage') });
    },
    logout : function(req, res, next){
        req.logout();
        res.redirect('/auth/signin');
    },
    getUserPanel : function(req, res, next){
         res.render('users/panel',{
             isAuthenticated : req.isAuthenticated(),
             user : req.user

      });
    }, 
    getAdmLista : function(req, res, next){
        //pasamos la configuracion de la base de datos
        var config = require('.././database/config');
        //creamos la coneccion a la base de datos 
        var url = config.url;
        console.log(`> BD: ${url}`);
         mongo.connect(url, function (err, db) {
            if (err) throw err
            var collection = db.collection('Pagos')
            collection.find().toArray(function (err, documents, fields) {
                 if (err) throw err;
                //se imprimen los documentos encontrados 
                console.log(`------- datos${documents}`);
                console.log(JSON.stringify(documents));
                //se cierra la conexion a la base de datos
        
                console.log ('lo que envia de items');
               //) console.log (`${items}`);
                db.close();
                  res.render('users/balance',{
                       isAuthenticated : req.isAuthenticated(),
                        user : req.user, 
                        items : documents
                    });
            });
        });
    
    },
    getItem: function (req, res, next) {
        return res.render('users/item',{
            isAuthenticated : req.isAuthenticated(),
            user : req.user,
            message: req.flash('infor')
            
        });
    },
    postItem: function(req, res, next){
        var pago = {
            seguridad: req.body.seguridad,
            basura: req.body.basura,
            limpieza: req.body.limpieza,
            luz: req.body.luz,
            tinacos: req.body.tinacos,
            pago: req.body.pago,
            mes: req.body.mes,
            total :`${parseInt(req.body.pago)+parseInt(req.body.tinacos)
                +parseInt(req.body.luz)+parseInt(req.body.limpieza)
                +parseInt(req.body.basura)+parseInt(req.body.seguridad)}`
                   
        }
        console.log(pago.total);
        console.log(pago);
        //pasamos la configuracion de la base de datos
        var config = require('.././database/config');
        //creamos la coneccion a la base de datos 
        var url = config.url;
        console.log(`> BD: ${url}`);
        //insertamos los datos 
        mongo.connect(url, function (err, db) {
            if (err) throw err
            var collection = db.collection('Pagos')
            collection.insert(pago, function (err, data) {
                if (err) throw err
                console.log(JSON.stringify(pago))
                db.close()
            });
        });
        
        req.flash('infor','Se ha registrado correctamente el nuevo pago');
        
        return res.redirect('/users/item');  
    },
    getAdmUsers : function(req, res, next){
        //pasamos la configuracion de la base de datos
        var config = require('.././database/config');
        //creamos la coneccion a la base de datos 
        var url = config.url;
        console.log(`> BD: ${url}`);
         mongo.connect(url, function (err, db) {
            if (err) throw err
            var collection = db.collection('Users')
            collection.find().toArray(function (err, documents, fields) {
                 if (err) throw err;
                //se imprimen los documentos encontrados 
                console.log(`------- datos${documents}`);
                console.log(JSON.stringify(documents));
                //se cierra la conexion a la base de datos
        
                console.log ('lo que envia de items');
               //) console.log (`${items}`);
                db.close();
                  res.render('users/shUser',{
                       isAuthenticated : req.isAuthenticated(),
                        user : req.user, 
                        items : documents
                    });
            });
        });
    },
    getUser : function(req, res, next){
        //pasamos la configuracion de la base de datos
        //var _id = passport._id_
        console.log(_id)
        var config = require('.././database/config');
        //creamos la coneccion a la base de datos 
        var url = config.url;
        console.log(`> BD: ${url}`);
         mongo.connect(url, function (err, db) {
            if (err) throw err
            var collection = db.collection('Users')
            collection.find().toArray(function (err, documents, fields) {
                 if (err) throw err;
                //se imprimen los documentos encontrados 
                console.log(`------- datos${documents}`);
               
                 console.log(`-------´´´´´´´´´´´´´´´´´´´´´´`);
                 console.log(`${documents.nombre}`);
                console.log(JSON.stringify(documents.email));
                //se cierra la conexion a la base de datos
        
                console.log ('lo que envia de items');
               //) console.log (`${items}`);
                db.close();
                  res.render('users/myBalance',{
                       isAuthenticated : req.isAuthenticated(),
                        user : req.user, 
                        items :documents
                    });
            });
        });
    }

};
