import { Component, OnInit } from '@angular/core';
import { Workbook } from 'exceljs';
import { ExcelJsUtilsService } from '../../utils/excel-js-utils.service';

@Component({
  selector: 'app-issue2017',
  templateUrl: './issue2017.component.html',
  styleUrls: ['./issue2017.component.less']
})
export class Issue2017Component implements OnInit {

  constructor(
    private excelJsUtilsService: ExcelJsUtilsService,
  ) { }

  ngOnInit(): void {
  }

  public async download(): Promise<void> {
    const workbook = new Workbook(),
      worksheet = workbook.addWorksheet('test');

    worksheet.getCell('A1').value = '141290793970081850807282';

    await this.excelJsUtilsService.exportExcel('issue2017', workbook);

  }

}
