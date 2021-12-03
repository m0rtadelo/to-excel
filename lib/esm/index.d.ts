import { IHeader, IOptions } from './interfaces';
/**
 * project: to-excel
 * author: m0rtadelo (ricard.figuls)
 * @license MIT
 * 2019
 */
export declare class toExcel {
    private static replaceItems;
    /**
     * Generates compatible Excel xls file (xml in fact) and returns content and downloads (if set)
     * @param columns This object defines column labels and maps worksheet data.
     * @param data  Sets the data of the worksheet.
     * @param options Options to define behaviour
     * @returns content of file
     */
    static exportXLS(columns: IHeader[], data: any[], options?: IOptions | string): string;
    /**
     * Generates compatible Excel xls file (xml in fact)
     * @param columns This object defines column labels and maps worksheet data.
     * @param data Sets the data of the worksheet.
     * @param filename The filename
     * @returns content of file
     */
    private static generateXML;
    /**
     * Uses browser download mechanism to open the file
     * @param filename The filename
     * @param data The data to be in the file
     * @returns void
     */
    private static download;
    private static getData;
    private static setReplace;
    private static clearReplace;
    private static parseXML;
    private static replaceValue;
}
