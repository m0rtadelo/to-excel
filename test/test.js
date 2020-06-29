var assert = require('assert');
const toExcel = require('../index').toExcel;
const expect1 = `<Row><Cell><Data ss:Type="String">1</Data></Cell><Cell><Data ss:Type="String">Item 1 &lt;br&gt;</Data></Cell><Cell><Data ss:Type="String">가지마</Data></Cell>
</Row>
<Row><Cell><Data ss:Type="String"></Data></Cell><Cell><Data ss:Type="String">Item 2</Data></Cell><Cell><Data ss:Type="String">благодарю вас</Data></Cell>
</Row>
<Row><Cell><Data ss:Type="String">3</Data></Cell><Cell><Data ss:Type="String">Item 3 'quotes'</Data></Cell><Cell><Data ss:Type="String">Enabled</Data></Cell>
</Row>
<Row><Cell><Data ss:Type="String">4</Data></Cell><Cell><Data ss:Type="String">Item 4 &quot;quotes&quot;</Data></Cell><Cell><Data ss:Type="String"></Data></Cell>
</Row>`;
const expect2 = `<Row><Cell><Data ss:Type="String">1</Data></Cell><Cell><Data ss:Type="String">Item 1 &lt;br&gt;</Data></Cell><Cell><Data ss:Type="String">가지마</Data></Cell>
</Row>
<Row><Cell><Data ss:Type="String"></Data></Cell><Cell><Data ss:Type="String">value replaced</Data></Cell><Cell><Data ss:Type="String">благодарю вас</Data></Cell>
</Row>
<Row><Cell><Data ss:Type="String">3</Data></Cell><Cell><Data ss:Type="String">Item 3 'quotes'</Data></Cell><Cell><Data ss:Type="String">Enabled</Data></Cell>
</Row>
<Row><Cell><Data ss:Type="String">4</Data></Cell><Cell><Data ss:Type="String">Item 4 &quot;quotes&quot;</Data></Cell><Cell><Data ss:Type="String"></Data></Cell>
</Row>`;
const expect3 = `<Row><Cell><Data ss:Type="String">1</Data></Cell><Cell><Data ss:Type="Number">1</Data></Cell><Cell><Data ss:Type="String">가지마</Data></Cell>
</Row>
<Row><Cell><Data ss:Type="String"></Data></Cell><Cell><Data ss:Type="Number">2</Data></Cell><Cell><Data ss:Type="String">благодарю вас</Data></Cell>
</Row>
<Row><Cell><Data ss:Type="String">3</Data></Cell><Cell><Data ss:Type="Number">3.5</Data></Cell><Cell><Data ss:Type="String">Enabled</Data></Cell>
</Row>
<Row><Cell><Data ss:Type="String">4</Data></Cell><Cell><Data ss:Type="Number">2.54</Data></Cell><Cell><Data ss:Type="String"></Data></Cell>
</Row>`;
const expect4 = `<Cell ss:StyleID="hdr"><Data ss:Type="String">Identificator</Data></Cell>
<Cell ss:StyleID="hdr"><Data ss:Type="String">Description</Data></Cell>
<Cell ss:StyleID="hdr"><Data ss:Type="String">Status</Data></Cell></Row>
<Row><Cell><Data ss:Type="String">1</Data></Cell><Cell><Data ss:Type="Number">0</Data></Cell><Cell><Data ss:Type="String">가지마</Data></Cell>
</Row>
<Row><Cell><Data ss:Type="String"></Data></Cell><Cell><Data ss:Type="Number">2</Data></Cell><Cell><Data ss:Type="String">благодарю вас</Data></Cell>
</Row>
<Row><Cell><Data ss:Type="String">3</Data></Cell><Cell><Data ss:Type="Number">3.5</Data></Cell><Cell><Data ss:Type="String">Enabled</Data></Cell>
</Row>
<Row><Cell><Data ss:Type="String">4</Data></Cell><Cell><Data ss:Type="Number">2.54</Data></Cell><Cell><Data ss:Type="String"></Data></Cell>`
// set data
const data = [
    { id: 1, value: 'Item 1 <br>', status: { item: '가지마' } },
    { value: 'Item 2', status: { item: 'благодарю вас' } },
    { value: 'Item 3 \'quotes\'', id: 3, status: { item: 'Enabled' } },
    { id: 4, value: 'Item 4 "quotes"', extra: 'ignored field' }
];

// set headers
const headers = [
    { label: 'Identificator', field: 'id' },
    { label: 'Description', field: 'value' },
    { label: 'Status', field: 'status.item' }
]

const data2 = [
    { id: 1, value: '1', status: { item: '가지마' } },
    { value: '2', status: { item: 'благодарю вас' } },
    { value: '3.5', id: 3, status: { item: 'Enabled' } },
    { id: 4, value: '2.54', extra: 'ignored field' }
];

// set headers
const headers2 = [
    { label: 'Identificator', field: 'id' },
    { label: 'Description', field: 'value', type: 'Number' },
    { label: 'Status', field: 'status.item' }
]

const data3 = [
    { id: 1, value: 0, status: { item: '가지마' } },
    { value: '2', status: { item: 'благодарю вас' } },
    { value: '3.5', id: 3, status: { item: 'Enabled' } },
    { id: 4, value: '2.54', extra: 'ignored field' }
];

// fake browser objects
function Blob() {}
global.Blob = Blob

describe('load', function () {
    it('should load on require', function () {
        toExcel()
        assert.notEqual(toExcel, undefined, 'module not loaded')
    });
});

describe('usage', function () { 
    it('should return "" if data or headers are void', function() {
        const content = toExcel.exportXLS(undefined, undefined, 'test');
        const content1 = toExcel.exportXLS(headers, undefined, 'test');
        const content2 = toExcel.exportXLS(undefined, data, 'test');
        assert.equal(content, "", 'incorrect response')
        assert.equal(content1, "", 'incorrect response')
        assert.equal(content2, "", 'incorrect response')
    });
    it('should export data as expected', function() {    
        // generate excel file
        const content = toExcel.exportXLS( headers, data, 'test' );        
        assert.equal(content.includes(expect1), true, 'incorrect export')
        const content2 = toExcel.exportXLS( headers, data, 'test', {extension: 'xls'} ); 
        assert.equal(content2.includes(expect1), true, 'incorrect export')
    }) 

    it('should replace values correctly', function() {
        toExcel.setReplace(undefined, undefined)
        assert.equal(toExcel.replaceItems.length, 0)
        toExcel.setReplace('Item 2', 'value replaced');
        const content = toExcel.exportXLS( headers, data, 'test' );  
        assert.equal(content.includes(expect2), true, 'incorrect replace')  
        
    })
    it('should clear items correctly', () => {
        toExcel.replaceItems.push('item')
        toExcel.clearReplace()
        assert.equal(toExcel.replaceItems.length, 0, 'error clearing items')
    })
    it('should download if possible by default (method 1)', () => {
        download = false
        window = {
            navigator: { 
                msSaveOrOpenBlob: true ,
                msSaveBlob: (blob, filename) => {
                    download = true
                    assert.equal(filename, 'test.xls')
                    assert.equal(blob.includes(expect2), true)
                }
            }
        }
        const result = toExcel.exportXLS( headers, data, 'test' );
        assert.equal(download, true);
    })

    it('should download if possible by default (method 2)', () => {
        let valid = false
        download = false
        window = {
            navigator: { 
                msSaveOrOpenBlob: false,
            },
            document: {
                createElement: elem => {return {click: () => {
                    valid = true
                }, elem }},
            },
            URL: {
                createObjectURL: elem => elem
            }
        }
        document = {
            body: {
                appendChild: elem => elem,
                removeChild: elem => {
                    download = true
                    assert.equal(elem.download, 'test.xls')
                    assert.equal(valid, true)
                }
            }
        }
        const result = toExcel.exportXLS( headers, data, 'test' );
        assert.equal(download, true);
    })

    it('should work without options', () => {
        const result = toExcel.exportXLS( headers, data);
        assert.equal(result.includes(expect1), true, 'incorrect export')
    })

    it('should set extension if defined in options', () => {
        let download = false
        window = {
            navigator: { 
                msSaveOrOpenBlob: true ,
                msSaveBlob: (blob, filename) => {
                    download = true
                    assert.equal(filename, 'test.pdf')
                    assert.equal(blob.includes(expect2), true)
                }
            }
        }
        const result = toExcel.exportXLS( headers, data, { filename: 'test', extension: 'pdf' });
        assert.equal(download, true);
    })   
    it('should disable download if defined in options', () => {
        result = true
        window = {
            navigator: { 
                msSaveOrOpenBlob: true ,
                msSaveBlob: (blob, filename) => {
                    result = false
                }
            }
        }
        toExcel.exportXLS( headers, data, { download: false });
        assert.equal(result, true)
    })        
    it('should set type to Number if defined in headers', () => {
        const result = toExcel.exportXLS(headers2, data2)
        assert.equal(result.includes(expect3), true, 'incorrect type')
    })
    it('should not remove zero Number if defined in headers', () => {
        const result = toExcel.exportXLS(headers2, data3)
        assert.equal(result.includes(expect4), true, 'incorrect result')
    })

});