import { Component, OnInit } from '@angular/core';
import { Cell, Workbook, Worksheet } from 'exceljs';
import { ExcelJsUtilsService } from 'src/app/shared/utils/excel-js-utils.service';

@Component({
  selector: 'app-issue1521',
  templateUrl: './issue1521.component.html',
  styleUrls: ['./issue1521.component.less']
})
export class Issue1521Component implements OnInit {

  constructor(
    private excelJsUtilsService: ExcelJsUtilsService,
  ) { }

  ngOnInit() {
  }


  public async download(): Promise<void> {
    try {

      const workbook: Workbook = new Workbook();
      workbook.addWorksheet('sheet1');
      workbook.addWorksheet('sheet2');
      workbook.addWorksheet('sheet3');

      const _worksheets: any[] = (workbook as any)._worksheets;

      // In particular, the _worksheets[0] element is not available and index access should start at 1
      console.log(_worksheets); // look at me

      // Modification order
      _worksheets[3].orderNo = 1;
      _worksheets[1].orderNo = 2;
      _worksheets[2].orderNo = 3;

      // export excel
      this.excelJsUtilsService.exportExcel('1521.xlsx', workbook);

    } catch (error) {
      console.error(error);
    }

  }
}
