import { Component, OnInit } from '@angular/core';
import { Workbook } from 'exceljs';
import { ExcelJsUtilsService } from 'src/app/shared/utils/excel-js-utils.service';

@Component({
  selector: 'app-issue1501',
  templateUrl: './issue1501.component.html',
  styleUrls: ['./issue1501.component.less']
})
export class Issue1501Component implements OnInit {

  constructor(
    private excelJsUtilsService: ExcelJsUtilsService,
  ) { }

  ngOnInit(): void {
  }

  public async download(): Promise<void> {
    try {
      const workbook = new Workbook();
      const worksheet = workbook.addWorksheet('test_sheet');
      worksheet.getCell('D1:D1').value = 1.2;
      worksheet.getCell('D2:D2').value = 2.3;
      worksheet.getCell('D3:D3').value = 5.6;
      workbook.addWorksheet('test2_sheet');
      const merges = (workbook.getWorksheet(2) as any)._merges;
      console.log(merges, workbook, workbook.getWorksheet(2));
      this.excelJsUtilsService.exportExcel('1501', workbook);
    } catch (error) {
      console.error(error);
    }

  }
}
