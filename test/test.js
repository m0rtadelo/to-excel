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
        window = {
            navigator: { 
                msSaveOrOpenBlob: true ,
                msSaveBlob: (blob, filename) => {
                    assert.equal(filename, 'test.xls')
                    assert.equal(blob.includes(expect2), true)
                }
            }
        }
        const result = toExcel.exportXLS( headers, data, 'test' );
    })

    it('should download if possible by default (method 2)', () => {
        let valid = false
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
                    assert.equal(elem.download, 'test.xls')
                    assert.equal(valid, true)
                }
            }
        }
        const result = toExcel.exportXLS( headers, data, 'test' );
    })

});