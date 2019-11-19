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

describe('load', function () {
    it('should load on require', function () {
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
    }) 

    it('should replace values correctly', function() {
        toExcel.setReplace('Item 2', 'value replaced');
        const content = toExcel.exportXLS( headers, data, 'test' );  
        assert.equal(content.includes(expect2), true, 'incorrect export')  
    })
});