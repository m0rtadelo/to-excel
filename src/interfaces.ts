/**
 * Options to set to-excel behaviours
 */
export interface IOptions {

    /** Sets the filename (without extension, the extension will be added by default). Default: undefined */
    filename?: string,

    /** Sets the extension of the filename. Default: xls */
    extension?: string,

    /** Sets the browser download action. Default: true */
    download?: boolean,

    /** Sets the author of the generated file */
    author?: string,

    /** Sets the lastAuthor of the generated file */
    lastAuthor?: string,

    /** Sets the company of the generated file */
    company?: string,

    /** Sets the version of the generated file */
    version?: string,

    /** Sets the sheet name (filename will be used if undefined) */
    sheetname?: string,
}

export interface IHeader {

    /** Sets the column label. Required */
    label: string,

    /** Sets the data field identificator. Required */
    field: string,

    /** Sets the type data of the column (String, Number, etc.). Optional */
    type?: string,
}
