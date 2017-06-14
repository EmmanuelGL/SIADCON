var config = {
   "url": process.env.DB || "mongodb://User:1234@ds149207.mlab.com:49207/siadcon"
   // "url": process.env.DB || "mongodb://carlos:crispin@ds131511.mlab.com:31511/condominio" 
   // "url": process.env.DB || "mongodb://127.0.0.1:27017/Condominio"  
};

module.exports = config
