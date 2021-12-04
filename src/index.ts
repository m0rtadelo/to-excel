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
          .replace('%author', options.author || DEFAULT_AUTHOR)
          .replace('%lastAuthor', options.lastAuthor || DEFAULT_AUTHOR)
          .replace('%company', options.company || DEFAULT_COMPANY)
          .replace('%version', options.version || DEFAULT_VERSION);
      xml += X_STYLES;
      xml = xml + '<Worksheet ss:Name="' + options.filename + '"><Table>';
      xml = xml + '\n<Row>';
      for (const column of columns) {
        xml += X_CELL_START +
          this.parseXML(column.label) +
          X_CELL_END;
      }
      xml = xml + X_ROW_START;
      for (const item of data) {
        xml = xml + '\n<Row>';
        for (const column of columns) {
          const t = column.type ? column.type : 'String';
          const r = this.parseXML(this.getData(item, column.field));
          xml =
            xml +
            '<Cell><Data ss:Type="' + t+ '">' +
            (t === 'Number' ? +r : r) +
            '</Data></Cell>';
        }
        xml = xml + X_ROW_END;
      }
      xml += X_FOOTER;
    }
    return xml;
  }

  /**
   * Uses browser download mechanism to open the file
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
    } catch (error) {
      console.error(error);
    }
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
    if (value && replacementValue) {
      toExcel.replaceItems.push({ value, replacementValue });
    }
  }

  /**
   * Sanitizes the string to be used in the XML value cell
   * @param input The input string to sanitize
   * @returns Sanitized xml string
   */
  private static parseXML(input: string) {
    let output: string;
    if (input === undefined) return '';
    output = input.toString().replace(new RegExp('&', 'g'), '&amp;');
    output = output.replace(/</g, '&lt;');
    output = output.replace(new RegExp('>', 'g'), '&gt;');
    output = output.replace(new RegExp('"', 'g'), '&quot;');
    return output;
  }

  /**
   * Replaces the value
   * @param value The vaue to be replaced
   * @returns The value or replaced value
   */
  private static replaceValue(value: string): string {
    for (let i = 0; i < toExcel.replaceItems.length; i++) {
      const item = toExcel.replaceItems[i];
      if (item.value === value) {
        return item.replacementValue;
      }
    }

    return value;
  }
}

