import { Component, OnInit } from '@angular/core';
import { Cell, Row, Workbook } from 'exceljs';
import { ExcelJsUtilsService } from '../../utils/excel-js-utils.service';

@Component({
  selector: 'app-discussion1967',
  templateUrl: './discussion1967.component.html',
  styleUrls: ['./discussion1967.component.less']
})
export class Discussion1967Component implements OnInit {

  public title = 'discussion1967'

  constructor(
    private excelJsUtilsService: ExcelJsUtilsService,
  ) { }

  ngOnInit(): void {
  }

  public async download(): Promise<void> {
    fetch('assets/discussion1967.xlsx').then(res => res.arrayBuffer()).then((buffer: ArrayBuffer) => {
      const workbook: Workbook = new Workbook();
      return workbook.xlsx.load(buffer);
    }).then((workbook: Workbook) => {
      const [sourceWorksheet, targetWorksheet] = workbook.worksheets;

      const sourceRow: Row = sourceWorksheet.getRow(1);

      // setting row height
      targetWorksheet.getRow(sourceRow.number).height = sourceRow.height;
      sourceRow.eachCell((sourceCell: Cell) => {
        const targetCell: Cell = targetWorksheet.getCell(sourceCell.address);

        // style
        targetCell.style = sourceCell.style;

        // value
        targetCell.value = sourceCell.value;

        // merge cell
        const range: string = `${sourceCell.model.master || sourceCell.address}:${targetCell.address}`;
        targetWorksheet.unMergeCells(range);
        targetWorksheet.mergeCells(range);
      });

      return this.excelJsUtilsService.exportExcel(this.title, workbook);
    });

  }

}
