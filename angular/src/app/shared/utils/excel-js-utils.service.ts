import { Injectable } from '@angular/core';
import { Workbook } from 'exceljs';
import { saveAs } from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class ExcelJsUtilsService {

  constructor(
  ) {

  }

  public async exportExcel(fileName: string, workbook: Workbook): Promise<any> {
    return workbook.xlsx.writeBuffer()
      .then(buffer => saveAs(new Blob([buffer]), `${fileName}.xlsx`));
  }

}
