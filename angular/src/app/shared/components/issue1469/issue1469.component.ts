import { Component, OnInit } from '@angular/core';
import { Workbook, stream } from 'exceljs';
import { ExcelJsUtilsService } from 'src/app/shared/utils/excel-js-utils.service';
import * as dayjs from 'dayjs';
@Component({
  selector: 'app-issue1469',
  templateUrl: './issue1469.component.html',
  styleUrls: ['./issue1469.component.less']
})
export class Issue1469Component implements OnInit {

  public title = '1469'

  constructor(
    private excelJsUtilsService: ExcelJsUtilsService,
  ) { }

  ngOnInit(): void {
  }

  public async download(): Promise<void> {
    try {
      const workbook = new Workbook();
      const taskDetailWorksheet = workbook.addWorksheet('Task detail'),
      formsDetailWorksheet = workbook.addWorksheet('Sheet2');

      taskDetailWorksheet.getCell('A1').value = {
        text: 'Click me',
        hyperlink: 'Sheet2!A1',
      };

      await this.excelJsUtilsService.exportExcel(this.title, workbook);
    } catch (error) {
      console.error(error);
    }

  }

}

