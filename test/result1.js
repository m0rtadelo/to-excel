const result1 = `<?xml version="1.0"?>
<?mso-application progid="Excel.Sheet"?>
<Workbook
xmlns="urn:schemas-microsoft-com:office:spreadsheet"
xmlns:o="urn:schemas-microsoft-com:office:office"
xmlns:x="urn:schemas-microsoft-com:office:excel"
xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet"
xmlns:html="http://www.w3.org/TR/REC-html40">
<DocumentProperties xmlns="urn:schemas-microsoft-com:office:office">
<Author>Ricard Fíguls</Author>
<LastAuthor>Ricard Fíguls</LastAuthor>
<Company>RFM Software (Ricard Figuls)</Company>
<Version>1</Version>
</DocumentProperties>
<Styles><Style ss:ID="hdr"><Font ss:Color="#ffffff" ss:Bold="1" /><Interior ss:Color="#000000" ss:Pattern="Solid"/></Style></Styles><Worksheet ss:Name="test"><Table>
<Row>
<Cell ss:StyleID="hdr"><Data ss:Type="String">Identifi\cator</Data></Cell>
<Cell ss:StyleID="hdr"><Data ss:Type="String">Description&lt;&lt;br&gt;</Data></Cell>
<Cell ss:StyleID="hdr"><Data ss:Type="String">Sta&lt;br&gt;tus</Data></Cell></Row>
<Row><Cell><Data ss:Type="String">1</Data></Cell><Cell><Data ss:Type="String">It&lt;br&gt;em 1</Data></Cell><Cell><Data ss:Type="String">가지마</Data></Cell>
</Row>
<Row><Cell><Data ss:Type="String">2</Data></Cell><Cell><Data ss:Type="String">Item 2</Data></Cell><Cell><Data ss:Type="String">Disabled</Data></Cell>
</Row>
<Row><Cell><Data ss:Type="String">3</Data></Cell><Cell><Data ss:Type="String">It&quot;em 3</Data></Cell><Cell><Data ss:Type="String">Dis'abled</Data></Cell>
</Row>
</Table></Worksheet>
</Workbook>`;