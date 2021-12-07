[![CI Build](https://github.com/m0rtadelo/to-excel/actions/workflows/ci.build.yaml/badge.svg)](https://github.com/m0rtadelo/to-excel/actions/workflows/ci.build.yaml)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=m0rtadelo_to-excel&metric=coverage)](https://sonarcloud.io/summary/new_code?id=m0rtadelo_to-excel)
[![Known Vulnerabilities](https://snyk.io//test/github/m0rtadelo/to-excel/badge.svg?targetFile=package.json)](https://snyk.io//test/github/m0rtadelo/to-excel?targetFile=package.json)
[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=m0rtadelo_to-excel&metric=security_rating)](https://sonarcloud.io/summary/new_code?id=m0rtadelo_to-excel)
![GitHub top language](https://img.shields.io/github/languages/top/m0rtadelo/to-excel.svg)
[![npm version](https://badge.fury.io/js/to-excel.svg)](https://badge.fury.io/js/to-excel)

# toExcel

Util to generate compatible Excel/OpenOffice/... XLS file (xml in fact). Works with node (typescript and javascript) and browser (using a html script tag). CommonJS and ES6 module compatible. No dependencies.

Works with your favorite frameworks and libraries (Angular, React, Electron, Webpack...) and in the browser using the script tag. 

Compatible with all browsers (IE9+ included).

## Install

This util comes as npm package to be imported/required in your project or as standalone javascript file to be used directly in the HTML file (runs directly on the browser).

**To install the module:**

```npm install --save to-excel```

or

```yarn install --save to-excel```

**To install the script:**

The script is published as a [Release](https://github.com/m0rtadelo/to-excel/releases) in Github. You can download and include in your project or use it directly from github as CDN.

CDN (using latest version):

>https://github.com/m0rtadelo/to-excel/releases/latest/download/to-excel.js

CDN (using 2.2.4 version):

>https://github.com/m0rtadelo/to-excel/releases/download/2.2.4/to-excel.js
## Usage

```javascript
// include library (only one of the above methods)
<script src="https://github.com/m0rtadelo/to-excel/releases/latest/download/to-excel.js"></script> // HTML
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

Demo available at: <https://m0rtadelo.github.io/to-excel/demo/>

## Parameters

The entry function `exportXLS(headers, data, options)` will allow the next parameters:
*  **headers (Object)** : Sets the headers of the worksheet. *Required*
*  **data (Object)** : Sets the data of the worksheet. *Required*
*  **options (Object)** : Options to define behaviour. *Optional*

### headers

This object defines column labels and maps worksheet data.

*  **label (string)** : Sets the column label. *Required*
*  **field (string)** : Sets the data field identificator. *Required*
*  **type (string)** : Sets the type data of the column (String, Number, etc.). *Optional*

### Options

The next optional settings can be passed to `exportXLS` function to change defaut behaviors:
*  **filename (string)** : Sets the filename (without extension, the extension will be added by default). *Default: undefined*
*  **extension (string)** : Sets the extension of the filename. *Default: xls*
*  **download (boolean)** : Sets the browser download action. *Default: true*
*  **author (string)** : Sets the author metadata of the generated file.
*  **lastAuthor (sting)** : Sets the lastAuthor metadata of the generated file.
*  **company (string)** : Sets the company metadata of the generated file.
*  **version (string)** : Sets the version metadata of the generated file.

> this option keys must be passed into an object but, if string is detected `filename` will be used to store it.

Full documentation available at: <https://m0rtadelo.github.io/to-excel/>