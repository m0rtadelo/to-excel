const te = require('../index').toExcel;
const fs = require('fs');

var data = "function toExcel() {}";
data += "\ntoExcel.download = " + te.download.toString();
data += "\ntoExcel.exportXLS = " + te.exportXLS.toString();
data += "\ntoExcel.generateXML = " + te.generateXML.toString();
data += "\ntoExcel.getData = " + te.getData.toString();
data += "\ntoExcel.parseXML = " + te.parseXML.toString();

fs.writeFileSync('../docs/to-excel.js', data);
// console.log(data);