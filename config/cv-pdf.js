module.exports = {
  // Export options
  "directory": "/public/public-cv",       // The directory the file gets written into if not using .toFile(filename, callback). 

  // Papersize Options: http://phantomjs.org/api/webpage/property/paper-size.html
  
  "orientation": "portrait", // portrait or landscape

  // Page options
  "border": "0",             // default is 0, units: mm, cm, in, px
  "width": "1240px",
  "height": "1758px",

  "footer": {
    "height": "15mm",
    "contents": '<div style="text-align: center;">Team <b>GAIS</b> - Nodejs 2</div>'
    },

  // Rendering options
  // Base path that's used to load files (images, css, js) when they aren't referenced using a host
  // File options
  "type": "pdf",             // allowed file types: png, jpeg, pdf
  //"quality": "75",           only used for types png & jpeg

  // Script options
   // PhantomJS binary which should get downloaded automatically
  "timeout": 30000           // Timeout that will cancel phantomjs, in milliseconds

  //"httpHeaders": {
  //  "Authorization": "Bearer ACEFAD8C-4B4D-4042-AB30-6C735F5BAC8B"
  //}
};