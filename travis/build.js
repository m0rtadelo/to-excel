const te = require('../index').toExcel;
const fs = require('fs');

var data = "function toExcel() {}";
data += "\ntoExcel.download = " + te.download.toString();
data += "\ntoExcel.exportXLS = " + te.exportXLS.toString();
data += "\ntoExcel.generateXML = " + te.generateXML.toString();
data += "\ntoExcel.getData = " + te.getData.toString();
data += "\ntoExcel.parseXML = " + te.parseXML.toString();
data += "\ntoExcel.setReplace = " + te.setReplace.toString();
data += "\ntoExcel.clearReplace = " + te.clearReplace.toString();
data += "\ntoExcel.replaceItems = new Array;"

fs.writeFileSync('../docs/to-excel.js', data);
// console.log(data);