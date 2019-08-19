const toExcel = require('../index').ToExcel;
const result1 = require('./result1');
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

// generate excel file
const content = toExcel.exportXLS( headers, data, 'test' );        
if (content == result1) {
    console.log('OK');
} else {
    console.log('KO');
}
require('fs').writeFileSync('filename.xls', content);
