import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ImageRange, Row, Workbook, Image, Cell, ValueType } from 'exceljs';
import { writeFileSync } from 'fs';

@Component({
  selector: 'app-issue1962',
  templateUrl: './issue1962.component.html',
  styleUrls: ['./issue1962.component.less']
})
export class Issue1962Component implements OnInit {

  constructor(
    public http: HttpClient,
  ) { }

  ngOnInit(): void {
  }

  extract() {
    this.http.get('assets/1962.xlsx', {
      responseType: 'arraybuffer'
    }).toPromise().then(async (res) => {
      const workbook = new Workbook();
      await workbook.xlsx.load(res);
      const [worksheet] = workbook.worksheets;

      const images: Array<{
        type: 'image',
        imageId: string;
        range: ImageRange;
      }> = worksheet.getImages();

      for (const image of images) {
        // @see https://github.com/exceljs/exceljs/issues/551
        console.log('processing image row', image.range.tl.nativeRow, 'col', image.range.tl.nativeCol, 'imageId', image.imageId);
        const i: any = workbook.model.media.find(m => (m as any).index === image.imageId);
        // buffer
        console.info(i.buffer);
      }

    });
  }

}
