const toExcel = require('../index').ToExcel;
const result1 = require('./result1');
// set data
const data = [
    { id: 1, value: 'It<br>em 1', status: { item: '가지마' } },
    { value: 'Item 2', id: 2, status: { item: 'Disabled' } },
    { id: 3, value: 'It"em 3', status: { item: 'Dis\'abled' }, extra: 'ignored field' }
];

// set headers
const headers = [
    { label: 'Identifi\\cator', field: 'id' },
    { label: 'Description<<br>', field: 'value' },
    { label: 'Sta<br>tus', field: 'status.item' }
]

// generate excel file
const content = toExcel.exportXLS( headers, data, 'test' );        
if (content == result1) {
    console.log('OK');
} else {
    console.log('KO');
}
require('fs').writeFileSync('filename.xls', content);
