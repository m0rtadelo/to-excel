# toExcel

Util to generate compatible Excel xls file (xml in fact). Works with node and browser. CommonJS and ES6 module compatible. No dependencies.

Works with your favorite frameworks and libraries (Angular, React, Electron, Webpack...)

## Install

```npm install --save to-excel```

## Usage

```javascript
// include library (only one of the above methods)
const toExcel = require('to-excel').ToExcel;    // CommonJS 
import { ToExcel } from 'to-excel';             // ES6 

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

// generate excel file (will download 'filename.xls' from browser)
const content = toExcel.exportXLS( headers, data, 'filename' );
// in node you must open or save the content
require('fs').writeFileSync('filename.xls', content);
```
