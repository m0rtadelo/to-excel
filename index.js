/**
 * project: to-excel
 * author: m0rtadelo (ricard.figuls)
 * @license MIT
 * 2019
 */
"use strict";
exports.__esModule = true;
var toExcel = /** @class */ (function () {
  function toExcel() {
  }
  toExcel.replaceItems = new Array;
  toExcel.setReplace = function (value, replacementValue) {
    if(value !== undefined && replacementValue !== undefined) {
      this.replaceItems.push({value, replacementValue})
    }
  }
  toExcel.clearReplace = function() {
    this.replaceItems = [];
  }
  /**
   * exports the data to a XLS file (as XML)
   */
  toExcel.exportXLS = function (columns, data, options) {
    if (typeof options === 'string') {
      options = { filename: options }
    }
    if(!options) {
      options = { filename: undefined }
    }
    if(!options.extension) {
      options.extension = "xls";
    }
    
    var xml = this.generateXML(columns, data, options.filename);
    if (options.download !== false) {
      this.download(options.filename + "." + options.extension, xml);
    }
    return xml;
  };
  toExcel.download = function (filename, data) {
    try {
        var blob = new Blob([data], { type: "text/csv" });
        if (window.navigator.msSaveOrOpenBlob) {
          window.navigator.msSaveBlob(blob, filename);
        } else {
          var elem = window.document.createElement("a");
          elem.href = window.URL.createObjectURL(blob);
          elem.download = filename;
          document.body.appendChild(elem);
          elem.click();
          document.body.removeChild(elem);
        }          
    } catch (error) {
        
    }
  }
  toExcel.parseXML = function (input) {
    var output;
    if (!input) return "";
    output = input.toString().replace(new RegExp("&", "g"), "&amp;");
    output = output.replace(/</g, "&lt;");
    output = output.replace(new RegExp(">", "g"), "&gt;");
    output = output.replace(new RegExp('"', "g"), "&quot;");
    return output;
  }

  toExcel.generateXML = function (columns, data, filename) {
    var xml = "";
    if (columns && data) {
      xml =
        '<?xml version="1.0"?>\n<?mso-application progid="Excel.Sheet"?>\n<Workbook\nxmlns="urn:schemas-microsoft-com:office:spreadsheet"\nxmlns:o="urn:schemas-microsoft-com:office:office"\nxmlns:x="urn:schemas-microsoft-com:office:excel"\nxmlns:ss="urn:schemas-microsoft-com:office:spreadsheet"\nxmlns:html="http://www.w3.org/TR/REC-html40">\n';
      xml =
        xml +
        '<DocumentProperties xmlns="urn:schemas-microsoft-com:office:office">\n<Author>Ricard Fíguls</Author>\n<LastAuthor>Ricard Fíguls</LastAuthor>\n<Company>RFM Software (Ricard Figuls)</Company>\n<Version>1</Version>\n</DocumentProperties>\n';
      xml =
        xml +
        '<Styles><Style ss:ID="hdr"><Font ss:Color="#ffffff" ss:Bold="1" /><Interior ss:Color="#000000" ss:Pattern="Solid"/></Style></Styles>';
      xml = xml + '<Worksheet ss:Name="' + filename + '"><Table>';
      xml = xml + "\n<Row>";
      for (var i = 0; i < columns.length; i++) {
        xml =
          xml +
          '\n<Cell ss:StyleID="hdr"><Data ss:Type="String">' +
          this.parseXML(columns[i].label) +
          "</Data></Cell>";
      }
      xml = xml + "</Row>";
      for (var i = 0; i < data.length; i++) {
        // NOSONAR
        xml = xml + "\n<Row>";
        for (var l = 0; l < columns.length; l++) {
          const t = columns[l].type ? columns[l].type : "String"
          const r = this.parseXML(this.getData(data[i], [columns[l].field]))
          xml =
            xml +
            '<Cell><Data ss:Type="' + t+ '">' +
            (t === 'Number' ? +r : r) +
            "</Data></Cell>";
        }
        xml = xml + "\n</Row>";
      }
      xml = xml + "\n</Table></Worksheet>\n</Workbook>";
    }
    return xml;
  }

  toExcel.getData = function (row, item) {
    var obj = row;
    try {
      item.toString().split('.').forEach(function(key) { obj = obj[key] });        
    } catch (error) {
      obj = undefined;
    }

    return replaceValue(obj);
  }

  function replaceValue(value) {
    for(var i = 0; i < toExcel.replaceItems.length ; i++) {
      const item = toExcel.replaceItems[i];
      if (item.value === value) {
        return item.replacementValue;
      }
    }
  
    return value;
  }
  return toExcel;
}());
exports.toExcel = toExcel;