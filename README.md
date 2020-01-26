[![Build Status](https://travis-ci.org/m0rtadelo/to-excel.svg?branch=master)](https://travis-ci.org/m0rtadelo/to-excel)
[![Coverage Status](https://coveralls.io/repos/github/m0rtadelo/to-excel/badge.svg?branch=master)](https://coveralls.io/github/m0rtadelo/to-excel?branch=master)
[![Known Vulnerabilities](https://snyk.io//test/github/m0rtadelo/to-excel/badge.svg?targetFile=package.json)](https://snyk.io//test/github/m0rtadelo/to-excel?targetFile=package.json)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/2ef49526659748808e26722c7f31ca62)](https://www.codacy.com/app/m0rtadelo/to-excel?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=m0rtadelo/to-excel&amp;utm_campaign=Badge_Grade)
![GitHub top language](https://img.shields.io/github/languages/top/m0rtadelo/to-excel.svg)
[![npm version](https://badge.fury.io/js/to-excel.svg)](https://badge.fury.io/js/to-excel)

# toExcel

Util to generate compatible Excel xls file (xml in fact). Works with node and browser. CommonJS and ES6 module compatible. No dependencies.

Works with your favorite frameworks and libraries (Angular, React, Electron, Webpack...) and in the browser using the script tag. 

Compatible with all browsers (IE9+ included).

## Install

```npm install --save to-excel```

## Usage

```javascript
// include library (only one of the above methods)
<script src="https://m0rtadelo.github.io/to-excel/to-excel.js"></script> // HTML
var toExcel = require('to-excel').toExcel;                               // CommonJS 
import { toExcel } from 'to-excel';                                      // ES6 

// set data
var data = [
    { id: 1, value: 'Item 1 <br>', status: { item: '가지마' } },
    { value: 'Item 2', status: { item: 'благодарю вас' } },
    { value: 'Item 3 \'quotes\'', id: 3, status: { item: 'Enabled' } },
    { id: 4, value: 'Item 4 "quotes"', extra: 'ignored field' }
];

// set headers
var headers = [
    { label: 'Identificator', field: 'id' },
    { label: 'Description', field: 'value' },
    { label: 'Status', field: 'status.item' }
]

// set replacement values (optional)
toExcel.setReplace('Item 1 <br>', 'Item 1')
// generate excel file (will download 'filename.xls' from browser)
var content = toExcel.exportXLS( headers, data, 'filename' );
// in node you must open or save the content
require('fs').writeFileSync('filename.xls', content);
```

Demo: <https://m0rtadelo.github.io/to-excel/>

## Parameters

The entry function `exportXLS(headers, data, options)` will allow the next parameters:
* **headers (Object)** : Sets the headers of the worksheet. *Required*
* **data (Object)** : Sets the data of the worksheet. *Required*
* **options (Object)** : Options to define behaviour. *Optional*

### headers

This object defines column labels and maps worksheet data.

* **label (string)** : Sets the column label. *Required*
* **field (string)** : Sets the data field identificator. *Required*

### Options

The next options can be passed to `exportXLS` function to change defaut behaviors:
* **filename (string)** : Sets the filename (without extension, the extension will be added by default). *Default: undefined*
* **extension (string)** : Sets the extension of the filename. *Default: xls*
* **download (boolean)** : Sets the browser download action. *Default: true*

> this option keys must be passed into an object but, if string is detected `filename` will be used to store it.