/* eslint-disable require-jsdoc */
import { WebContainer } from '../src/web';
import fs from 'fs';

const data2 = [{ id: 1, value: 50 }, { id: 2, value: 150 }];
const headers2 = [
  { label: 'Identificator', field: 'id' },
  { label: 'Description', field: 'value', type: 'Number' },
];

describe('WebContainer', () => {
  it('should generate content as expected and publish toExcel as global', () => {
    const response = WebContainer.exportXLS(headers2, data2, 'testname');
    expect(response).toEqual(fs.readFileSync('./test/expect/3.xls', 'utf8'));
    expect((global as any).toExcel).toBeDefined();
  });
});
