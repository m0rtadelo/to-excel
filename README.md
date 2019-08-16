# toExcel

Util to generate compatible Excel xls file (xml in fact).

## Install

```npm install --save to-excel```

## Usage

```javascript
// include library
const toExcel = require('to-excel');

// set data
const data = [
    { id: 1, value: 'Item 1', status: 'Disabled' },
    { value: 'Item 2', id: 2, status: 'Disabled' },
    { id: 3, value: 'Item 3', status: '가지마', extra: 'ignored field' }
];

// set headers
const headers = [
    { label: 'Identificator', field: 'id' },
    { label: 'Description', field: 'value' },
    { label: 'Status', field: 'status' }
]

// generate excel file
toExcel.exportXLS( headers, data, 'filename' );
```
