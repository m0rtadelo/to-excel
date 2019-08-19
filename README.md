[![Build Status](https://travis-ci.org/m0rtadelo/to-excel.svg?branch=master)](https://travis-ci.org/m0rtadelo/to-excel)
[![Coverage Status](https://coveralls.io/repos/github/m0rtadelo/to-excel/badge.svg?branch=master)](https://coveralls.io/github/m0rtadelo/to-excel?branch=master)
[![Known Vulnerabilities](https://snyk.io//test/github/m0rtadelo/to-excel/badge.svg?targetFile=package.json)](https://snyk.io//test/github/m0rtadelo/to-excel?targetFile=package.json)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/2ef49526659748808e26722c7f31ca62)](https://www.codacy.com/app/m0rtadelo/to-excel?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=m0rtadelo/to-excel&amp;utm_campaign=Badge_Grade)
![GitHub top language](https://img.shields.io/github/languages/top/m0rtadelo/to-excel.svg)
[![npm version](https://badge.fury.io/js/to-excel.svg)](https://badge.fury.io/js/to-excel)

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

// generate excel file (will download 'filename.xls' from browser)
const content = toExcel.exportXLS( headers, data, 'filename' );
// in node you must open or save the content
require('fs').writeFileSync('filename.xls', content);
```

Demo: https://m0rtadelo.github.io/to-excel/