import { DEFAULT_AUTHOR, DEFAULT_COMPANY, DEFAULT_EXT, DEFAULT_VERSION, X_CELL_END, X_CELL_START, X_FOOTER, X_HEADER,
  X_PROPS, X_ROW_END, X_ROW_START, X_STYLES } from './constants';
import { IHeader, IOptions } from './interfaces';

/**
 * project: to-excel
 * author: m0rtadelo (ricard.figuls)
 * @license MIT
 * 2019
 */
export class toExcel {
  private static replaceItems:any[] = [];

  /**
   * Generates compatible Excel xls file (xml in fact) and returns content and downloads (if set)
   * @param columns This object defines column labels and maps worksheet data.
   * @param data  Sets the data of the worksheet.
   * @param options Options to define behaviour
   * @returns content of file
   */
  public static exportXLS(columns: IHeader[], data: any[], options?: IOptions|string): string {
    options = options || { filename: undefined };
    if (typeof options === 'string') {
      options = { filename: options };
    }
    options.extension = options.extension || DEFAULT_EXT;

    const xml = toExcel.generateXML(columns, data, options);
    if (options.download !== false) {
      toExcel.download(options.filename + '.' + options.extension, xml);
    }
    return xml;
  }

  /**
   * Generates compatible Excel xls file (xml in fact)
   * @param columns This object defines column labels and maps worksheet data.
   * @param data Sets the data of the worksheet.
   * @param options Options to define behaviour
   * @returns content of file
   */
  private static generateXML(columns: IHeader[], data: any[], options: IOptions): string {
    let xml = '';
    if (columns.length && data) {
      xml = X_HEADER;
      xml += X_PROPS
          .replace('%author', toExcel.parseXML(options.author || DEFAULT_AUTHOR))
          .replace('%lastAuthor', toExcel.parseXML(options.lastAuthor || DEFAULT_AUTHOR))
          .replace('%company', toExcel.parseXML(options.company || DEFAULT_COMPANY))
          .replace('%version', toExcel.parseXML(options.version || DEFAULT_VERSION));
      xml += X_STYLES;
      xml += '<Worksheet ss:Name="' + options.filename + '"><Table>';
      xml += X_ROW_START;
      xml += toExcel.addHeaders(columns);
      xml += X_ROW_END;
      xml += toExcel.addRows(data, columns);
      xml += X_FOOTER;
    }
    return xml;
  }

  /**
   * Returns the XML headers for the columns
   * @param columns The headers info array
   * @returns XML headers
   */
  private static addHeaders(columns: IHeader[]) {
    let xml = '';
    for (const column of columns) {
      xml += X_CELL_START +
        toExcel.parseXML(column.label) +
        X_CELL_END;
    }
    return xml;
  }

  /**
   * Returns XML rows
   * @param data The cells data
   * @param columns The columns data
   * @returns XML rows
   */
  private static addRows(data: any[], columns: IHeader[]) {
    let xml = '';
    for (const item of data) {
      xml += '\n<Row>';
      for (const column of columns) {
        const t = column.type ? column.type : 'String';
        const r = toExcel.parseXML(toExcel.getData(item, column.field));
        xml +=
          '<Cell><Data ss:Type="' + t + '">' +
          (t === 'Number' ? +r : r) +
          '</Data></Cell>';
      }
      xml += X_ROW_END;
    }
    return xml;
  }

  /**
   * Uses browser integrated method to download the generated file
   * @param filename The filename
   * @param data The data to be in the file
   * @returns void
   */
  private static download(filename: string, data: any) {
    try {
      const blob = new Blob([data], { type: 'text/csv' });
      if ((window.navigator as any).msSaveOrOpenBlob) {
        (window.navigator as any).msSaveBlob(blob, filename);
      } else {
        const elem = window.document.createElement('a');
        elem.href = window.URL.createObjectURL(blob);
        elem.download = filename;
        document.body.appendChild(elem);
        elem.click();
        document.body.removeChild(elem);
      }
    } catch (error) {}
  }

  /**
   * Returns the correct data value
   * @param row Data object that contains value
   * @param item The name of the item where data is
   * @returns The value
   */
  private static getData(row: any, item: string) {
    let obj = row;
    try {
      item.toString().split('.').forEach(function(key) {
        obj = obj[key];
      });
    } catch (error) {
      obj = undefined;
    }

    return toExcel.replaceValue(obj);
  }

  /**
   * Replaces value
   * @param value value
   * @param replacementValue replacementValue
   * @returns void
   */
  public static setReplace(value?: any, replacementValue?: any) {
    toExcel.replaceItems.push({ value, replacementValue });
  }

  /**
   * Sanitizes the string to be used in the XML value cell
   * @param input The input string to sanitize
   * @returns Sanitized xml string
   */
  private static parseXML(input: string) {
    let output: string;
    if (input === undefined || input === null) return '';
    output = input.toString().split('&').join('&amp;');
    output = output.split('<').join('&lt;');
    output = output.split('>').join('&gt;');
    output = output.split('"').join('&quot;');
    return output;
  }

  /**
   * Replaces the value
   * @param value The vaue to be replaced
   * @returns The value or replaced value
   */
  private static replaceValue(value: string): string {
    for (const item of toExcel.replaceItems) {
      if (item.value === value) {
        return item.replacementValue;
      }
    }

    return value;
  }
}

