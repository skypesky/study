import { Component, OnInit } from '@angular/core';
import { Workbook } from 'exceljs';
import { ExcelJsUtilsService } from '../../utils/excel-js-utils.service';

@Component({
  selector: 'app-discussions2004',
  templateUrl: './discussions2004.component.html',
  styleUrls: ['./discussions2004.component.less']
})
export class Discussions2004Component implements OnInit {

  title: string = 'Discussions2004';

  constructor(
    private excelJsUtilsService: ExcelJsUtilsService,
  ) { }

  ngOnInit() {
  }

  public async download(): Promise<void> {
    const workbook = new Workbook(),
      worksheet = workbook.addWorksheet('test');

    // A1 -> F1
    new Array(6).fill(null).map((value, index) => {
      worksheet.getCell(1, index + 1).style.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: {
          argb: 'FFFF0000'
        }
      }
    });

    await this.excelJsUtilsService.exportExcel(this.title, workbook);
  }

}
