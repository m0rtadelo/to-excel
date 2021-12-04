export const X_HEADER = `<?xml version="1.0"?>\n<?mso-application progid="Excel.Sheet"?>
<Workbook\nxmlns="urn:schemas-microsoft-com:office:spreadsheet"\nxmlns:o="urn:schemas-microsoft-com:office:office"
xmlns:x="urn:schemas-microsoft-com:office:excel"\nxmlns:ss="urn:schemas-microsoft-com:office:spreadsheet"
xmlns:html="http://www.w3.org/TR/REC-html40">\n`;
export const X_PROPS = `<DocumentProperties xmlns="urn:schemas-microsoft-com:office:office">
<Author>%author</Author>
<LastAuthor>%lastAuthor</LastAuthor>
<Company>%company</Company>
<Version>%version</Version>
</DocumentProperties>\n`;
export const X_STYLES = `<Styles>
<Style ss:ID="hdr"><Font ss:Color="#ffffff" ss:Bold="1" /><Interior ss:Color="#000000" ss:Pattern="Solid"/></Style>
</Styles>`;
export const X_FOOTER = '\n</Table></Worksheet>\n</Workbook>';
export const X_CELL_START = '\n<Cell ss:StyleID="hdr"><Data ss:Type="String">';
export const X_CELL_END = '</Data></Cell>';
export const DEFAULT_EXT = 'xls';
export const X_ROW_START = '</Row>';
export const X_ROW_END = '\n</Row>';
export const DEFAULT_AUTHOR = 'Ricard Fíguls';
export const DEFAULT_COMPANY = 'RFM Software (Ricard Figuls)';
export const DEFAULT_VERSION = '1';
