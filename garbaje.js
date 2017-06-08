 doc = new pdf
        doc.pipe(fs.createWriteStream('./views/users/print'));
       
 
         doc.image('.././login/public/images/log2.png', {
            fit: [250, 300],
            align: 'center',
            valign: 'center'
            });
    
           