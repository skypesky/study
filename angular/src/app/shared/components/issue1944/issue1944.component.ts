import { Component, OnInit } from '@angular/core';
import { Cell, FillPatterns, Workbook } from 'exceljs';
import { ExcelJsUtilsService } from '../../utils/excel-js-utils.service';

@Component({
  selector: 'app-issue1944',
  templateUrl: './issue1944.component.html',
  styleUrls: ['./issue1944.component.less']
})
export class Issue1944Component implements OnInit {

  title = "issue1944";

  constructor(
    private excelJsUtilsService: ExcelJsUtilsService,
  ) { }

  ngOnInit() {
  }

  public async download(): Promise<void> {
    try {

      const workbook: Workbook = new Workbook();
      const worksheet = workbook.addWorksheet('test_sheet');
      const patterns: FillPatterns[] = ['darkGrid', 'darkTrellis', 'darkHorizontal', 'darkGray', 'lightDown', 'lightGray', 'solid', 'lightGrid', 'gray125', 'lightHorizontal', 'lightTrellis', 'darkDown', 'mediumGray', 'gray0625', 'darkUp', 'darkVertical', 'lightVertical', 'lightUp'];

      for (let i = 0; i < patterns.length; ++i) {
        worksheet.getCell(i + 1, 1).fill = {
          type: 'pattern',
          pattern: patterns[i],
          fgColor: { argb: 'FFFF0000' }
        };
        worksheet.getCell(i + 1, 2).value = patterns[i];
      }

      // export excel
      this.excelJsUtilsService.exportExcel('1944.xlsx', workbook);

    } catch (error) {
      console.error(error);
    }

  }

}
