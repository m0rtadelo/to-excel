/* eslint-disable require-jsdoc */
import { toExcel } from '../src/index';
import fs from 'fs';
// set data
const data = [
  { id: 1, value: 'Item 1 <br>', status: { item: '가지마' } },
  { value: 'Item 2', status: { item: 'благодарю вас' } },
  { value: 'Item 3 \'quotes\'', id: 3, status: { item: 'Enabled' } },
  { id: 4, value: 'Item 4 "quotes"', extra: 'ignored field' },
  { id: 5, value: true },
  { id: 6, value: false },
  { id: 7, value: undefined },
];
const data2 = [{ id: 1, value: 50 }, { id: 2, value: 150 }];

// set headers
const headers = [
  { label: 'Identificator', field: 'id' },
  { label: 'Description', field: 'value' },
  { label: 'Status', field: 'status.item' },
];
const headers2 = [
  { label: 'Identificator', field: 'id' },
  { label: 'Description', field: 'value', type: 'Number' },
];

describe('toExcel', () => {
  it('should generate content as expected', () => {
    const response = toExcel.exportXLS(headers, data);
    // fs.writeFileSync('./test/expect/1.xls', response);
    expect(response).toEqual(fs.readFileSync('./test/expect/1.xls', 'utf8'));
  });
  it('should map option to filename if is string', () => {
    const response = toExcel.exportXLS(headers, data, 'testname');
    // fs.writeFileSync('./test/expect/2.xls', response);
    expect(response).toEqual(fs.readFileSync('./test/expect/2.xls', 'utf8'));
  });
  it('should generate valid custom type columns', () => {
    const response = toExcel.exportXLS(headers2, data2, 'testname');
    // fs.writeFileSync('./test/expect/3.xls', response);
    expect(response).toEqual(fs.readFileSync('./test/expect/3.xls', 'utf8'));
  });
  it('should set valid metadata on file', () => {
    const response = toExcel.exportXLS(headers2, data2, {
      filename: 'filename',
      author: 'author',
      lastAuthor: 'lastAuthor',
      company: 'company',
      version: 'version',
      download: false,
    });
    // fs.writeFileSync('./test/expect/4.xls', response);
    expect(response).toEqual(fs.readFileSync('./test/expect/4.xls', 'utf8'));
  });
  it('should replace values as expected', () => {
    toExcel.setReplace('50', '150');
    toExcel.setReplace(150, 200);
    let response = toExcel.exportXLS(headers2, data2, 'testname');
    // fs.writeFileSync('./test/expect/5.xls', response);
    expect(response).toEqual(fs.readFileSync('./test/expect/5.xls', 'utf8'));
    toExcel.setReplace(true, 'true value');
    toExcel.setReplace(false, 'false value');
    response = toExcel.exportXLS(headers, data, 'testname');
    // fs.writeFileSync('./test/expect/7.xls', response);
    expect(response).toEqual(fs.readFileSync('./test/expect/7.xls', 'utf8'));
  });
  it('should download the generated file (method A)', () => {
    (window.navigator as any).msSaveOrOpenBlob = jest.fn(() => true );
    (window.navigator as any).msSaveBlob = jest.fn(() => true );
    toExcel.exportXLS(headers2, data2, { download: true });
    expect((window.navigator as any).msSaveBlob).toHaveBeenCalledTimes(1);
  });
  it('should NOT download the generated file (method A)', () => {
    (window.navigator as any).msSaveOrOpenBlob = jest.fn(() => true );
    (window.navigator as any).msSaveBlob = jest.fn(() => true );
    toExcel.exportXLS(headers2, data2, { download: false });
    expect((window.navigator as any).msSaveBlob).toHaveBeenCalledTimes(0);
  });
  it('should download the generated file (method B)', () => {
    (window.navigator as any).msSaveOrOpenBlob = undefined;
    global.URL.createObjectURL = jest.fn(() => 'details');
    const response = toExcel.exportXLS(headers2, data2, { download: true });
    // fs.writeFileSync('./test/expect/6.xls', response);
    expect(response).toEqual(fs.readFileSync('./test/expect/6.xls', 'utf8'));
    expect(global.URL.createObjectURL).toHaveBeenCalledTimes(1);
  });
  it('should NOT download the generated file (method B)', () => {
    (window.navigator as any).msSaveOrOpenBlob = undefined;
    global.URL.createObjectURL = jest.fn(() => 'details');
    const response = toExcel.exportXLS(headers2, data2, { download: false });
    expect(response).toEqual(fs.readFileSync('./test/expect/6.xls', 'utf8'));
    expect(global.URL.createObjectURL).toHaveBeenCalledTimes(0);
  });
});
