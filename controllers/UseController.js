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
        var _id = req.body._id;
        mongo.connect(url, function (err, db) {
            if (err) throw err
            var collection = db.collection('Users')
            collection.find({
                _id: _id
            }).toArray(function (err, documents, fields) {
                if (err)
                    collection.insert(user, function (err, data) {
                        if (err) console.log("se duplica el departamento")
                        console.log(JSON.stringify(user))
                        db.close()
                    })
                console.log(documents + "<------------------------si imprime");
                if (documents.length > 0) {
                    //
                    req.flash('messageErr', 'ERROR. El departamento esta duplicado verifica');
                    console.log(documents + "<---------------------ya existe");
                } else {
                   req.flash('info', 'Se ha registrado correctamente, ya puede iniciar sesion ');
                    console.log(documents + "<------------------------es nuevo");
                }
                
                return res.redirect('/auth/signin');
            });
        });
    },
    getSignIn: function (req, res, next) {
        return res.render('users/signin', { message: req.flash('info'), authmessage: req.flash('authmessage'),
         messageErr: req.flash('messageErr')});
    },
    logout: function (req, res, next) {
        req.logout();
        res.redirect('/auth/signin');
    },
    getUserPanel: function (req, res, next) {
        res.render('users/panel', {
            isAuthenticated: req.isAuthenticated(),
            user: req.user

        });
    },
    getAdmLista: function (req, res, next) {
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

                console.log('lo que envia de items');
                //) console.log (`${items}`);
                db.close();
                res.render('users/balance', {
                    isAuthenticated: req.isAuthenticated(),
                    user: req.user,
                    items: documents
                });
            });
        });

    },
    getItem: function (req, res, next) {
        return res.render('users/item', {
            isAuthenticated: req.isAuthenticated(),
            user: req.user,
            message: req.flash('infor')

        });
    },
    postItem: function (req, res, next) {
        var pago = {
            seguridad: req.body.seguridad,
            basura: req.body.basura,
            limpieza: req.body.limpieza,
            luz: req.body.luz,
            tinacos: req.body.tinacos,
            pago: req.body.pago,
            mes: req.body.mes,
            total: `${parseInt(req.body.pago) + parseInt(req.body.tinacos)
            + parseInt(req.body.luz) + parseInt(req.body.limpieza)
            + parseInt(req.body.basura) + parseInt(req.body.seguridad)}`

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

        req.flash('infor', 'Se ha registrado correctamente el nuevo pago');

        return res.redirect('/users/item');
    },
    getAdmUsers: function (req, res, next) {
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

                console.log('lo que envia de items');
                //) console.log (`${items}`);
                db.close();
                res.render('users/shUser', {
                    isAuthenticated: req.isAuthenticated(),
                    user: req.user,
                    items: documents,
                    message: req.flash('infor'),
                    messageRep: req.flash('messageRep')
                });
            });
        });
    },
    getUser: function (req, res, next) {
        //pasamos la configuracion de la base de datos
        var nombre = req.user.nombre;
        var config = require('.././database/config');
        //creamos la coneccion a la base de datos 
        var url = config.url;
        console.log(`> BD: ${url}`);
        mongo.connect(url, function (err, db) {
            if (err) throw err
            var collection = db.collection('Users')
            collection.find({
                nombre: nombre
            }).toArray(function (err, documents, fields) {
                if (err) throw err;
                //se imprimen los documentos encontrados 
                console.log(`------- datos${documents}`);
                console.log(JSON.stringify(documents));
                //se cierra la conexion a la base de datos

                console.log('lo que envia de items');
                //) console.log (`${items}`);
                db.close();
                res.render('users/myBalance', {
                    isAuthenticated: req.isAuthenticated(),
                    user: req.user,
                    items: documents
                });
            });
        });
    },
    getPagos: function (req, res, next) {
        res.render('users/upPago', {
            isAuthenticated: req.isAuthenticated(),
            user: req.user

        });
    },
    postPagos: function (req, res, next) {
        var _id = req.body.numDepto,
            Seguridad = req.body.Seguridad,
            RecoleccionBasura = req.body.RecoleccionBasura,
            LimpiezaComunes = req.body.LimpiezaComunes,
            AlumbradoComunes = req.body.AlumbradoComunes,
            Limpiezatinacos = req.body.Limpiezatinacos,
            PagoAdministrador = req.body.PagoAdministrador;
        total = parseInt(req.body.PagoAdministrador) + parseInt(req.body.Limpiezatinacos)
            + parseInt(req.body.AlumbradoComunes) + parseInt(req.body.LimpiezaComunes)
            + parseInt(req.body.RecoleccionBasura) + parseInt(req.body.Seguridad);

        console.log(total);
        //pasamos la configuracion de la base de datos
        var config = require('.././database/config');
        //creamos la coneccion a la base de datos 
        var url = config.url;
        console.log(`> BD: ${url}`);
        //insertamos los datos 
        mongo.connect(url, function (err, db) {
            if (err) return console.error(err)

            var users = db.collection('Users')
            // update
            users.find({
                _id: _id
            }).toArray(function (err, documents, fields) {
                if (err)
                    console.log('-----------losdoc')
                console.log(documents);
                users.update({
                    _id: _id
                }, {
                        $set: {
                            Seguridad, RecoleccionBasura, LimpiezaComunes,
                            AlumbradoComunes, Limpiezatinacos, PagoAdministrador, total

                        }
                    })
                db.close()
                // console.log(documents+"<------------------------si imprime") ;
                console.log(documents + "<------------------------si imprime");
                if (documents.length > 0) {
                    req.flash('infor', 'Se ha realizo correctamente la actualizacion del Pago');
                } else {
                    req.flash('messageRep', 'ERROR. el deparatemnto no esta registrado')
                }

                return res.redirect('/users/shUser');
            });

        });
        //  console.log(documents+"<------------------------si imprime") ;  
    },
    getPrint: function(req, res , next){
       
       fs.createReadStream('./views/users/print.jade')
  .pipe(jadepdf())
  .pipe(fs.createWriteStream('./pdf/test.pdf'));
  fs.createReadStream('views/form.jade').pipe(jadepdf()).pipe(fs.createWriteStream('form.pdf'));
  
 

        res.render('users/print', {
            isAuthenticated: req.isAuthenticated(),
            user: req.user,

        });
        console.log(doc);
        //console.log("------->"+doc.pipe(fs.createWriteStream('.././Documents')));
    }
};
