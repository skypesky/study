import { Component, OnInit } from '@angular/core';
import { Workbook } from 'exceljs';
import { ExcelJsUtilsService } from 'src/app/shared/utils/excel-js-utils.service';

@Component({
  selector: 'app-issue1491',
  templateUrl: './issue1491.component.html',
  styleUrls: ['./issue1491.component.less']
})
export class Issue1491Component implements OnInit {

  constructor(
    private excelJsUtilsService: ExcelJsUtilsService,
  ) {
  }

  ngOnInit() {

  }

  public async download(): Promise<void> {
    try {
      const workbook = new Workbook();
      const worksheet = workbook.addWorksheet('test_sheet');
      worksheet.getCell('D1:D1').value = 1.2;
      worksheet.getCell('D2:D2').value = 2.3;
      worksheet.getCell('D3:D3').value = 5.6;
      worksheet.getCell('D4:D4').value = {
        formula: "SUM(ROUND(D1:D3, 0))",
        result: 0,
        date1904: false,
      };
      this.excelJsUtilsService.exportExcel('1491', workbook);
    } catch (error) {
      console.error(error);
    }

  }

}
