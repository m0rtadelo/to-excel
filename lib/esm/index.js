import { DEFAULT_EXT, X_CELL_END, X_CELL_START, X_FOOTER, X_HEADER, X_PROPS, X_STYLES } from './constants';
/**
 * project: to-excel
 * author: m0rtadelo (ricard.figuls)
 * @license MIT
 * 2019
 */
export class toExcel {
    /**
     * Generates compatible Excel xls file (xml in fact) and returns content and downloads (if set)
     * @param columns This object defines column labels and maps worksheet data.
     * @param data  Sets the data of the worksheet.
     * @param options Options to define behaviour
     * @returns content of file
     */
    static exportXLS(columns, data, options) {
        options = options || { filename: undefined };
        if (typeof options === 'string') {
            options = { filename: options };
        }
        options.extension = options.extension || DEFAULT_EXT;
        const xml = toExcel.generateXML(columns, data, options.filename);
        if (options.download) {
            toExcel.download(options.filename + '.' + options.extension, xml);
        }
        return xml;
    }
    ;
    /**
     * Generates compatible Excel xls file (xml in fact)
     * @param columns This object defines column labels and maps worksheet data.
     * @param data Sets the data of the worksheet.
     * @param filename The filename
     * @returns content of file
     */
    static generateXML(columns, data, filename) {
        let xml = '';
        if (columns.length && data) {
            xml = X_HEADER;
            xml += X_PROPS;
            xml += X_STYLES;
            xml = xml + '<Worksheet ss:Name="' + filename + '"><Table>';
            xml = xml + '\n<Row>';
            for (const column of columns) {
                xml += X_CELL_START +
                    this.parseXML(column.label) +
                    X_CELL_END;
            }
            xml = xml + '</Row>';
            for (const item of data) {
                xml = xml + '\n<Row>';
                for (const column of columns) {
                    const t = column.type ? column.type : 'String';
                    const r = this.parseXML(this.getData(item, column.field));
                    xml =
                        xml +
                            '<Cell><Data ss:Type="' + t + '">' +
                            (t === 'Number' ? +r : r) +
                            '</Data></Cell>';
                }
                xml = xml + '\n</Row>';
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
    static download(filename, data) {
        try {
            const blob = new Blob([data], { type: 'text/csv' });
            if (window.navigator.msSaveOrOpenBlob) {
                window.navigator.msSaveBlob(blob, filename);
            }
            else {
                const elem = window.document.createElement('a');
                elem.href = window.URL.createObjectURL(blob);
                elem.download = filename;
                document.body.appendChild(elem);
                elem.click();
                document.body.removeChild(elem);
            }
        }
        catch (error) { }
    }
    static getData(row, item) {
        let obj = row;
        try {
            item.toString().split('.').forEach(function (key) {
                obj = obj[key];
            });
        }
        catch (error) {
            obj = undefined;
        }
        return toExcel.replaceValue(obj);
    }
    static setReplace(value, replacementValue) {
        if (value && replacementValue) {
            toExcel.replaceItems.push({ value, replacementValue });
        }
    }
    static clearReplace() {
        toExcel.replaceItems = [];
    }
    static parseXML(input) {
        let output;
        if (!input)
            return '';
        output = input.toString().replace(new RegExp('&', 'g'), '&amp;');
        output = output.replace(/</g, '&lt;');
        output = output.replace(new RegExp('>', 'g'), '&gt;');
        output = output.replace(new RegExp('"', 'g'), '&quot;');
        return output;
    }
    static replaceValue(value) {
        for (let i = 0; i < toExcel.replaceItems.length; i++) {
            const item = toExcel.replaceItems[i];
            if (item.value === value) {
                return item.replacementValue;
            }
        }
        return value;
    }
}
toExcel.replaceItems = [];
