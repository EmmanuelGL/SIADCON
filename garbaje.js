 doc = new pdf
        doc.pipe(fs.createWriteStream('./views/users/print'));
       
 
         doc.image('.././login/public/images/log2.png', {
            fit: [250, 300],
            align: 'center',
            valign: 'center'
            });
    
        ------------------------------------------------
        ,
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